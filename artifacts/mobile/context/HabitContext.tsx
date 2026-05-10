import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const HABIT_STORAGE_KEY = "lumio_habits_v1";

export interface Habit {
  id: string;
  name: string;
  icon: string;
  color: string;
  createdAt: string;
}

interface HabitState {
  habits: Habit[];
  completedDates: Record<string, string[]>; // habitId -> ISO date strings
  isLoading: boolean;
}

interface HabitContextType extends HabitState {
  addHabit: (habit: Omit<Habit, "id" | "createdAt">) => Promise<void>;
  deleteHabit: (habitId: string) => Promise<void>;
  toggleHabitDate: (habitId: string, dateStr: string) => Promise<void>;
  getHabitStreak: (habitId: string) => number;
  isCompletedToday: (habitId: string) => boolean;
}

const HabitContext = createContext<HabitContextType>({
  habits: [],
  completedDates: {},
  isLoading: true,
  addHabit: async () => {},
  deleteHabit: async () => {},
  toggleHabitDate: async () => {},
  getHabitStreak: () => 0,
  isCompletedToday: () => false,
});

function todayStr() {
  return new Date().toISOString().split("T")[0];
}

function getStreak(dates: string[]): number {
  if (!dates.length) return 0;
  const sorted = [...dates].sort().reverse();
  const today = todayStr();
  const yesterday = (() => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split("T")[0];
  })();

  if (sorted[0] !== today && sorted[0] !== yesterday) return 0;

  let streak = 1;
  for (let i = 1; i < sorted.length; i++) {
    const cur = new Date(sorted[i - 1]);
    cur.setDate(cur.getDate() - 1);
    const expected = cur.toISOString().split("T")[0];
    if (sorted[i] === expected) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

export function HabitProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<HabitState>({
    habits: [],
    completedDates: {},
    isLoading: true,
  });

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const raw = await AsyncStorage.getItem(HABIT_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setState({ ...parsed, isLoading: false });
      } else {
        setState((p) => ({ ...p, isLoading: false }));
      }
    } catch {
      setState((p) => ({ ...p, isLoading: false }));
    }
  }

  async function save(next: Omit<HabitState, "isLoading">) {
    await AsyncStorage.setItem(HABIT_STORAGE_KEY, JSON.stringify(next));
  }

  const addHabit = useCallback(
    async (habit: Omit<Habit, "id" | "createdAt">) => {
      const newHabit: Habit = {
        ...habit,
        id: `habit_${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      setState((prev) => {
        const next = {
          habits: [...prev.habits, newHabit],
          completedDates: { ...prev.completedDates },
        };
        save(next);
        return { ...prev, ...next };
      });
    },
    []
  );

  const deleteHabit = useCallback(async (habitId: string) => {
    setState((prev) => {
      const completedDates = { ...prev.completedDates };
      delete completedDates[habitId];
      const next = {
        habits: prev.habits.filter((h) => h.id !== habitId),
        completedDates,
      };
      save(next);
      return { ...prev, ...next };
    });
  }, []);

  const toggleHabitDate = useCallback(
    async (habitId: string, dateStr: string) => {
      setState((prev) => {
        const existing = prev.completedDates[habitId] ?? [];
        const updated = existing.includes(dateStr)
          ? existing.filter((d) => d !== dateStr)
          : [...existing, dateStr];
        const next = {
          habits: prev.habits,
          completedDates: { ...prev.completedDates, [habitId]: updated },
        };
        save(next);
        return { ...prev, ...next };
      });
    },
    []
  );

  const getHabitStreak = useCallback(
    (habitId: string) => {
      return getStreak(state.completedDates[habitId] ?? []);
    },
    [state.completedDates]
  );

  const isCompletedToday = useCallback(
    (habitId: string) => {
      return (state.completedDates[habitId] ?? []).includes(todayStr());
    },
    [state.completedDates]
  );

  return (
    <HabitContext.Provider
      value={{
        ...state,
        addHabit,
        deleteHabit,
        toggleHabitDate,
        getHabitStreak,
        isCompletedToday,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
}

export function useHabits() {
  return useContext(HabitContext);
}
