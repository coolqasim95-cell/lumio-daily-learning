import { useAuth } from "@clerk/expo";
import React, { useEffect, useRef, useState } from "react";

import { useApp } from "@/context/AppContext";
import { useHabits } from "@/context/HabitContext";
import { useSync } from "@/context/SyncContext";

const API_BASE = `https://${process.env.EXPO_PUBLIC_DOMAIN || "localhost"}/api`;

async function fetchProgress(token: string) {
  const res = await fetch(`${API_BASE}/user/progress`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 404 || res.status === 204) return null;
  if (!res.ok) throw new Error(`Fetch progress failed: ${res.status}`);
  const data = await res.json();
  return data;
}

async function pushProgress(token: string, payload: Record<string, unknown>) {
  const res = await fetch(`${API_BASE}/user/progress`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Push progress failed: ${res.status}`);
}

function buildPayload(
  app: ReturnType<typeof useApp>,
  habits: ReturnType<typeof useHabits>,
): Record<string, unknown> {
  return {
    xp: app.xp,
    level: app.level,
    streak: app.streak,
    lastReadDate: app.lastReadDate,
    streakDays: app.streakDays,
    totalTopicsRead: app.totalTopicsRead,
    totalIdeasRead: app.totalTopicsRead,
    topicsReadToday: app.topicsReadToday,
    ideasReadToday: app.topicsReadToday,
    dailyGoal: app.dailyGoal,
    completedBookIds: app.completedBookIds,
    completedLessonIds: app.completedLessonIds,
    completedTopicIds: app.completedTopicIds,
    savedBookIds: app.savedBookIds,
    inProgressBookId: app.inProgressBookId,
    inProgressLessonId: app.inProgressLessonId,
    inProgressTopicId: app.inProgressTopicId,
    inProgressIdeaIndex: 0,
    goals: app.goals,
    hasOnboarded: app.hasOnboarded,
    customBooks: app.customBooks,
    habits: habits.getSyncPayload(),
  };
}

export function SyncBridge() {
  const { isSignedIn, getToken } = useAuth();
  const app = useApp();
  const habits = useHabits();
  const { setIsSyncing } = useSync();

  const [initialSyncDone, setInitialSyncDone] = useState(false);
  const isSyncingRef = useRef(false);
  const syncTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevSignedInRef = useRef<boolean | null>(null);

  // When remote is null on first sign-in, we hold the token here so a
  // separate effect can fire the push only once app+habits have finished loading.
  const [pendingInitialPushToken, setPendingInitialPushToken] = useState<string | null>(null);

  // — Effect 1: detect sign-in, fetch remote, handle import or queue initial push —
  useEffect(() => {
    const wasSignedIn = prevSignedInRef.current;
    prevSignedInRef.current = isSignedIn ?? false;

    if (!isSignedIn) {
      setInitialSyncDone(false);
      setIsSyncing(false);
      setPendingInitialPushToken(null);
      return;
    }

    if (wasSignedIn === false || wasSignedIn === null) {
      setInitialSyncDone(false);
      (async () => {
        try {
          const token = await getToken();
          if (!token) return;
          const remote = await fetchProgress(token);
          if (remote) {
            app.importProgress(remote);
            if (remote.habits && typeof remote.habits === "object") {
              const remoteHabits = remote.habits as { habits?: unknown; completedDates?: unknown };
              if (Array.isArray(remoteHabits.habits)) {
                habits.importHabits({
                  habits: remoteHabits.habits as import("@/context/HabitContext").Habit[],
                  completedDates: (remoteHabits.completedDates ?? {}) as Record<string, string[]>,
                });
              }
            }
            // Remote data found — debounced push will follow once initialSyncDone=true.
            setInitialSyncDone(true);
          } else {
            // New account — queue an immediate upload, but defer until app+habits
            // have finished loading so the payload reflects settled local state.
            setIsSyncing(true);
            setPendingInitialPushToken(token);
          }
        } catch (err) {
          console.warn("[SyncBridge] initial sync failed:", err);
          setInitialSyncDone(true);
        }
      })();
    }
  }, [isSignedIn]);

  // — Effect 2: execute the queued initial push once data has loaded —
  useEffect(() => {
    if (!pendingInitialPushToken) return;
    if (app.isLoading || habits.isLoading) return;

    const token = pendingInitialPushToken;
    setPendingInitialPushToken(null);

    (async () => {
      try {
        await pushProgress(token, buildPayload(app, habits));
      } catch (err) {
        console.warn("[SyncBridge] initial push failed:", err);
      } finally {
        setIsSyncing(false);
        setInitialSyncDone(true);
      }
    })();
  }, [pendingInitialPushToken, app.isLoading, habits.isLoading]);

  // — Effect 3: debounced push on any subsequent state change —
  useEffect(() => {
    if (!isSignedIn || app.isLoading || habits.isLoading || !initialSyncDone) return;

    if (syncTimerRef.current) clearTimeout(syncTimerRef.current);

    syncTimerRef.current = setTimeout(async () => {
      if (isSyncingRef.current) return;
      isSyncingRef.current = true;
      try {
        const token = await getToken();
        if (!token) return;
        await pushProgress(token, buildPayload(app, habits));
      } catch (err) {
        console.warn("[SyncBridge] push failed:", err);
      } finally {
        isSyncingRef.current = false;
      }
    }, 2000);

    return () => {
      if (syncTimerRef.current) clearTimeout(syncTimerRef.current);
    };
  }, [
    isSignedIn,
    initialSyncDone,
    app.isLoading,
    habits.isLoading,
    app.xp,
    app.level,
    app.streak,
    app.lastReadDate,
    app.streakDays,
    app.totalTopicsRead,
    app.topicsReadToday,
    app.dailyGoal,
    app.completedBookIds,
    app.completedLessonIds,
    app.completedTopicIds,
    app.savedBookIds,
    app.inProgressBookId,
    app.inProgressLessonId,
    app.inProgressTopicId,
    app.goals,
    app.hasOnboarded,
    app.customBooks,
    habits.habits,
    habits.completedDates,
    getToken,
  ]);

  return null;
}
