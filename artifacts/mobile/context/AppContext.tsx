import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const STORAGE_KEY = "lumio_app_state_v1";

interface AppState {
  hasOnboarded: boolean;
  isLoading: boolean;
  goals: string[];
  xp: number;
  level: number;
  streak: number;
  lastReadDate: string | null;
  streakDays: string[];
  ideasReadToday: number;
  dailyGoal: number;
  completedBookIds: string[];
  savedBookIds: string[];
  inProgressBookId: string | null;
  inProgressIdeaIndex: number;
  totalIdeasRead: number;
}

interface AppContextType extends AppState {
  completeOnboarding: (goals: string[]) => Promise<void>;
  addXP: (amount: number) => Promise<void>;
  markIdeaRead: () => Promise<void>;
  completeBook: (bookId: string) => Promise<void>;
  toggleSaveBook: (bookId: string) => Promise<void>;
  setInProgress: (bookId: string, ideaIndex: number) => Promise<void>;
  resetProgress: () => Promise<void>;
}

const defaultState: AppState = {
  hasOnboarded: false,
  isLoading: true,
  goals: [],
  xp: 0,
  level: 1,
  streak: 0,
  lastReadDate: null,
  streakDays: [],
  ideasReadToday: 0,
  dailyGoal: 5,
  completedBookIds: [],
  savedBookIds: [],
  inProgressBookId: null,
  inProgressIdeaIndex: 0,
  totalIdeasRead: 0,
};

const AppContext = createContext<AppContextType>({
  ...defaultState,
  completeOnboarding: async () => {},
  addXP: async () => {},
  markIdeaRead: async () => {},
  completeBook: async () => {},
  toggleSaveBook: async () => {},
  setInProgress: async () => {},
  resetProgress: async () => {},
});

function getLevelFromXP(xp: number): number {
  return Math.floor(xp / 100) + 1;
}

function getTodayString(): string {
  return new Date().toISOString().split("T")[0];
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(defaultState);

  useEffect(() => {
    loadState();
  }, []);

  async function loadState() {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<AppState>;
        const today = getTodayString();
        let ideasReadToday = saved.ideasReadToday ?? 0;
        if (saved.lastReadDate !== today) {
          ideasReadToday = 0;
        }
        setState({
          ...defaultState,
          ...saved,
          ideasReadToday,
          isLoading: false,
        });
      } else {
        setState({ ...defaultState, isLoading: false });
      }
    } catch {
      setState({ ...defaultState, isLoading: false });
    }
  }

  async function saveState(newState: AppState) {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    } catch {}
  }

  function updateState(updates: Partial<AppState>) {
    setState((prev) => {
      const next = { ...prev, ...updates };
      saveState(next);
      return next;
    });
  }

  const completeOnboarding = useCallback(async (goals: string[]) => {
    updateState({ hasOnboarded: true, goals });
  }, []);

  const addXP = useCallback(async (amount: number) => {
    setState((prev) => {
      const newXP = prev.xp + amount;
      const next = { ...prev, xp: newXP, level: getLevelFromXP(newXP) };
      saveState(next);
      return next;
    });
  }, []);

  const markIdeaRead = useCallback(async () => {
    setState((prev) => {
      const today = getTodayString();
      const newIdeasReadToday = prev.ideasReadToday + 1;
      const newTotalIdeasRead = prev.totalIdeasRead + 1;

      let newStreak = prev.streak;
      let newStreakDays = [...prev.streakDays];

      if (prev.lastReadDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split("T")[0];

        if (prev.lastReadDate === yesterdayStr || prev.streak === 0) {
          newStreak = prev.streak + 1;
        } else if (prev.lastReadDate !== today) {
          newStreak = 1;
        }

        if (!newStreakDays.includes(today)) {
          newStreakDays = [...newStreakDays, today].slice(-90);
        }
      }

      const next = {
        ...prev,
        ideasReadToday: newIdeasReadToday,
        totalIdeasRead: newTotalIdeasRead,
        lastReadDate: today,
        streak: newStreak,
        streakDays: newStreakDays,
      };
      saveState(next);
      return next;
    });
  }, []);

  const completeBook = useCallback(async (bookId: string) => {
    setState((prev) => {
      if (prev.completedBookIds.includes(bookId)) return prev;
      const next = {
        ...prev,
        completedBookIds: [...prev.completedBookIds, bookId],
        inProgressBookId: prev.inProgressBookId === bookId ? null : prev.inProgressBookId,
        inProgressIdeaIndex: prev.inProgressBookId === bookId ? 0 : prev.inProgressIdeaIndex,
      };
      saveState(next);
      return next;
    });
  }, []);

  const toggleSaveBook = useCallback(async (bookId: string) => {
    setState((prev) => {
      const saved = prev.savedBookIds.includes(bookId)
        ? prev.savedBookIds.filter((id) => id !== bookId)
        : [...prev.savedBookIds, bookId];
      const next = { ...prev, savedBookIds: saved };
      saveState(next);
      return next;
    });
  }, []);

  const setInProgress = useCallback(async (bookId: string, ideaIndex: number) => {
    setState((prev) => {
      const next = { ...prev, inProgressBookId: bookId, inProgressIdeaIndex: ideaIndex };
      saveState(next);
      return next;
    });
  }, []);

  const resetProgress = useCallback(async () => {
    const fresh = { ...defaultState, isLoading: false };
    setState(fresh);
    await AsyncStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        completeOnboarding,
        addXP,
        markIdeaRead,
        completeBook,
        toggleSaveBook,
        setInProgress,
        resetProgress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
