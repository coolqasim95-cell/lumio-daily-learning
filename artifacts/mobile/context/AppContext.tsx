import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { Book, BOOKS, getTopicCount } from "@/data/content";

const STORAGE_KEY = "lumio_app_state_v3";

interface AppState {
  hasOnboarded: boolean;
  isLoading: boolean;
  goals: string[];
  xp: number;
  level: number;
  streak: number;
  lastReadDate: string | null;
  streakDays: string[];
  topicsReadToday: number;
  dailyGoal: number;
  completedBookIds: string[];
  completedLessonIds: string[];
  completedTopicIds: string[];
  savedBookIds: string[];
  inProgressBookId: string | null;
  inProgressLessonId: string | null;
  inProgressTopicId: string | null;
  totalTopicsRead: number;
  customBooks: Book[];
}

interface AppContextType extends AppState {
  completeOnboarding: (goals: string[]) => Promise<void>;
  addXP: (amount: number) => Promise<void>;
  completeTopic: (bookId: string, lessonId: string, topicId: string) => Promise<void>;
  completeBook: (bookId: string) => Promise<void>;
  toggleSaveBook: (bookId: string) => Promise<void>;
  setInProgress: (bookId: string, lessonId: string, topicId: string) => Promise<void>;
  addCustomBook: (book: Book) => Promise<void>;
  deleteCustomBook: (bookId: string) => Promise<void>;
  resetProgress: () => Promise<void>;
  // Legacy aliases
  markIdeaRead: () => Promise<void>;
  ideasReadToday: number;
  totalIdeasRead: number;
  inProgressIdeaIndex: number;
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
  topicsReadToday: 0,
  dailyGoal: 5,
  completedBookIds: [],
  completedLessonIds: [],
  completedTopicIds: [],
  savedBookIds: [],
  inProgressBookId: null,
  inProgressLessonId: null,
  inProgressTopicId: null,
  totalTopicsRead: 0,
  customBooks: [],
};

const AppContext = createContext<AppContextType>({
  ...defaultState,
  ideasReadToday: 0,
  totalIdeasRead: 0,
  inProgressIdeaIndex: 0,
  completeOnboarding: async () => {},
  addXP: async () => {},
  completeTopic: async () => {},
  completeBook: async () => {},
  toggleSaveBook: async () => {},
  setInProgress: async () => {},
  addCustomBook: async () => {},
  deleteCustomBook: async () => {},
  resetProgress: async () => {},
  markIdeaRead: async () => {},
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
        let topicsReadToday = saved.topicsReadToday ?? 0;
        if (saved.lastReadDate !== today) {
          topicsReadToday = 0;
        }
        setState({
          ...defaultState,
          ...saved,
          customBooks: saved.customBooks ?? [],
          completedLessonIds: saved.completedLessonIds ?? [],
          completedTopicIds: saved.completedTopicIds ?? [],
          topicsReadToday,
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
      const newTopicsToday = prev.topicsReadToday + 1;
      const newTotal = prev.totalTopicsRead + 1;
      let newStreak = prev.streak;
      let newStreakDays = [...prev.streakDays];
      if (prev.lastReadDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yStr = yesterday.toISOString().split("T")[0];
        if (prev.lastReadDate === yStr || prev.streak === 0) {
          newStreak = prev.streak + 1;
        } else {
          newStreak = 1;
        }
        if (!newStreakDays.includes(today)) {
          newStreakDays = [...newStreakDays, today].slice(-90);
        }
      }
      const next = {
        ...prev,
        topicsReadToday: newTopicsToday,
        totalTopicsRead: newTotal,
        lastReadDate: today,
        streak: newStreak,
        streakDays: newStreakDays,
      };
      saveState(next);
      return next;
    });
  }, []);

  const completeTopic = useCallback(
    async (bookId: string, lessonId: string, topicId: string) => {
      setState((prev) => {
        if (prev.completedTopicIds.includes(topicId)) return prev;

        const today = getTodayString();
        const newTopicsToday = prev.topicsReadToday + 1;
        const newTotal = prev.totalTopicsRead + 1;

        let newStreak = prev.streak;
        let newStreakDays = [...prev.streakDays];
        if (prev.lastReadDate !== today) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yStr = yesterday.toISOString().split("T")[0];
          if (prev.lastReadDate === yStr || prev.streak === 0) {
            newStreak = prev.streak + 1;
          } else {
            newStreak = 1;
          }
          if (!newStreakDays.includes(today)) {
            newStreakDays = [...newStreakDays, today].slice(-90);
          }
        }

        const newCompletedTopics = [...prev.completedTopicIds, topicId];

        // Check if lesson is complete
        const allBooks = [...BOOKS, ...prev.customBooks];
        const book = allBooks.find((b) => b.id === bookId);
        let newCompletedLessons = [...prev.completedLessonIds];
        let newCompletedBooks = [...prev.completedBookIds];

        if (book) {
          const lesson = book.lessons.find((l) => l.id === lessonId);
          if (lesson) {
            const lessonTopicIds = lesson.topics.map((t) => t.id);
            const allLessonTopicsDone = lessonTopicIds.every(
              (tid) => newCompletedTopics.includes(tid)
            );
            if (allLessonTopicsDone && !newCompletedLessons.includes(lessonId)) {
              newCompletedLessons = [...newCompletedLessons, lessonId];
            }
          }

          // Check if all lessons complete = book complete
          const allLessonsDone = book.lessons.every((l) =>
            newCompletedLessons.includes(l.id)
          );
          if (allLessonsDone && !newCompletedBooks.includes(bookId)) {
            newCompletedBooks = [...newCompletedBooks, bookId];
          }
        }

        const newXP = prev.xp + 10;
        const next = {
          ...prev,
          xp: newXP,
          level: getLevelFromXP(newXP),
          completedTopicIds: newCompletedTopics,
          completedLessonIds: newCompletedLessons,
          completedBookIds: newCompletedBooks,
          topicsReadToday: newTopicsToday,
          totalTopicsRead: newTotal,
          lastReadDate: today,
          streak: newStreak,
          streakDays: newStreakDays,
        };
        saveState(next);
        return next;
      });
    },
    []
  );

  const completeBook = useCallback(async (bookId: string) => {
    setState((prev) => {
      if (prev.completedBookIds.includes(bookId)) return prev;
      const next = {
        ...prev,
        completedBookIds: [...prev.completedBookIds, bookId],
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

  const setInProgress = useCallback(
    async (bookId: string, lessonId: string, topicId: string) => {
      setState((prev) => {
        const next = {
          ...prev,
          inProgressBookId: bookId,
          inProgressLessonId: lessonId,
          inProgressTopicId: topicId,
        };
        saveState(next);
        return next;
      });
    },
    []
  );

  const addCustomBook = useCallback(async (book: Book) => {
    setState((prev) => {
      const next = { ...prev, customBooks: [...prev.customBooks, book] };
      saveState(next);
      return next;
    });
  }, []);

  const deleteCustomBook = useCallback(async (bookId: string) => {
    setState((prev) => {
      const next = {
        ...prev,
        customBooks: prev.customBooks.filter((b) => b.id !== bookId),
        completedBookIds: prev.completedBookIds.filter((id) => id !== bookId),
        savedBookIds: prev.savedBookIds.filter((id) => id !== bookId),
      };
      saveState(next);
      return next;
    });
  }, []);

  const resetProgress = useCallback(async () => {
    const fresh = { ...defaultState, isLoading: false };
    setState(fresh);
    await AsyncStorage.removeItem(STORAGE_KEY);
  }, []);

  // Helper: count completed topics for a book
  function getBookTopicProgress(bookId: string): number {
    const allBooks = [...BOOKS, ...state.customBooks];
    const book = allBooks.find((b) => b.id === bookId);
    if (!book) return 0;
    return book.lessons
      .flatMap((l) => l.topics)
      .filter((t) => state.completedTopicIds.includes(t.id)).length;
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        // Legacy aliases
        ideasReadToday: state.topicsReadToday,
        totalIdeasRead: state.totalTopicsRead,
        inProgressIdeaIndex: 0,
        completeOnboarding,
        addXP,
        completeTopic,
        completeBook,
        toggleSaveBook,
        setInProgress,
        addCustomBook,
        deleteCustomBook,
        resetProgress,
        markIdeaRead,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
