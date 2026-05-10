import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { StreakCalendar } from "@/components/StreakCalendar";
import { useApp } from "@/context/AppContext";
import { useHabits } from "@/context/HabitContext";
import { BOOKS } from "@/data/content";
import { useColors } from "@/hooks/useColors";

const XP_PER_LEVEL = 100;

const BADGES = [
  { id: "first", icon: "star", label: "First Idea", desc: "Read your first idea", xpRequired: 1 },
  { id: "streak3", icon: "zap", label: "3-Day Streak", desc: "Read 3 days in a row", streakRequired: 3 },
  { id: "bookworm", icon: "book-open", label: "Bookworm", desc: "Complete your first book", booksRequired: 1 },
  { id: "dedicated", icon: "award", label: "Dedicated", desc: "Reach 100 XP", xpRequired: 100 },
  { id: "streak7", icon: "zap", label: "7-Day Streak", desc: "Read 7 days in a row", streakRequired: 7 },
  { id: "scholar", icon: "award", label: "Scholar", desc: "Complete 3 books", booksRequired: 3 },
  { id: "habit", icon: "check-circle", label: "Habit Starter", desc: "Create your first habit", habitsRequired: 1 },
  { id: "consistent", icon: "calendar", label: "Consistent", desc: "5-day habit streak", habitStreakRequired: 5 },
];

export default function ProgressScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const {
    xp,
    level,
    streak,
    streakDays,
    totalIdeasRead,
    completedBookIds,
    customBooks,
    resetProgress,
  } = useApp();
  const { habits, getHabitStreak } = useHabits();

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const levelProgress = xp % XP_PER_LEVEL;
  const allBooks = [...BOOKS, ...customBooks];
  const maxHabitStreak = habits.length
    ? Math.max(...habits.map((h) => getHabitStreak(h.id)))
    : 0;

  function isBadgeEarned(badge: (typeof BADGES)[0]) {
    if (badge.xpRequired && xp < badge.xpRequired) return false;
    if (badge.streakRequired && streak < badge.streakRequired) return false;
    if (badge.booksRequired && completedBookIds.length < badge.booksRequired) return false;
    if (badge.habitsRequired && habits.length < badge.habitsRequired) return false;
    if (badge.habitStreakRequired && maxHabitStreak < badge.habitStreakRequired) return false;
    return true;
  }

  const earnedCount = BADGES.filter(isBadgeEarned).length;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: topPad + 12 }]}>
        <Text style={[styles.title, { color: colors.foreground }]}>Progress</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: Platform.OS === "web" ? 90 : insets.bottom + 85 },
        ]}
      >
        {/* XP Level Card */}
        <LinearGradient
          colors={["#0D0D2E", "#1E1060"]}
          style={styles.levelCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.levelTop}>
            <View>
              <Text style={styles.levelLabel}>Level {level}</Text>
              <Text style={styles.levelSub}>
                {XP_PER_LEVEL - levelProgress} XP to next level
              </Text>
            </View>
            <View style={[styles.xpBig, { backgroundColor: colors.primary }]}>
              <Feather name="zap" size={18} color="#fff" />
              <Text style={styles.xpBigText}>{xp}</Text>
            </View>
          </View>

          <View style={styles.xpTrack}>
            <LinearGradient
              colors={[colors.primary, "#EF4444"]}
              style={[
                styles.xpFill,
                {
                  width: `${(levelProgress / XP_PER_LEVEL) * 100}%` as any,
                },
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          </View>
          <Text style={styles.xpHintText}>
            {levelProgress}/{XP_PER_LEVEL} XP to Level {level + 1}
          </Text>
        </LinearGradient>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          {[
            { icon: "book-open", value: totalIdeasRead, label: "Ideas Read", color: colors.primary },
            { icon: "check-circle", value: completedBookIds.length, label: "Books Done", color: colors.success },
            { icon: "zap", value: streak, label: "Day Streak", color: "#F59E0B" },
          ].map((stat) => (
            <View
              key={stat.label}
              style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}
            >
              <Feather name={stat.icon as any} size={20} color={stat.color} />
              <Text style={[styles.statValue, { color: colors.foreground }]}>
                {stat.value}
              </Text>
              <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>
                {stat.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Streak Calendar */}
        <StreakCalendar streakDays={streakDays} streak={streak} />

        {/* Habits summary */}
        {habits.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
                Habit Streaks
              </Text>
              <Pressable onPress={() => router.push("/(tabs)/habits")}>
                <Text style={[styles.seeAll, { color: colors.primary }]}>
                  Manage →
                </Text>
              </Pressable>
            </View>
            {habits.map((habit) => {
              const s = getHabitStreak(habit.id);
              return (
                <View
                  key={habit.id}
                  style={[
                    styles.habitRow,
                    { backgroundColor: colors.card, borderColor: colors.border },
                  ]}
                >
                  <View
                    style={[
                      styles.habitIcon,
                      { backgroundColor: habit.color + "22" },
                    ]}
                  >
                    <Feather
                      name={habit.icon as any}
                      size={16}
                      color={habit.color}
                    />
                  </View>
                  <Text style={[styles.habitName, { color: colors.foreground }]}>
                    {habit.name}
                  </Text>
                  <View style={styles.habitStreak}>
                    <Text style={styles.habitStreakFire}>🔥</Text>
                    <Text style={[styles.habitStreakNum, { color: habit.color }]}>
                      {s}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {/* Badges */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Badges ({earnedCount}/{BADGES.length})
          </Text>
          <View style={styles.badgesGrid}>
            {BADGES.map((badge) => {
              const earned = isBadgeEarned(badge);
              return (
                <View
                  key={badge.id}
                  style={[
                    styles.badgeCard,
                    {
                      backgroundColor: earned ? colors.card : colors.secondary,
                      borderColor: earned ? colors.primary : colors.border,
                      borderWidth: earned ? 1.5 : 1,
                      opacity: earned ? 1 : 0.45,
                    },
                  ]}
                >
                  {earned ? (
                    <LinearGradient
                      colors={[colors.primary, "#EF4444"]}
                      style={styles.badgeIconWrap}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <Feather name={badge.icon as any} size={20} color="#fff" />
                    </LinearGradient>
                  ) : (
                    <View
                      style={[
                        styles.badgeIconWrap,
                        { backgroundColor: colors.muted },
                      ]}
                    >
                      <Feather
                        name={badge.icon as any}
                        size={20}
                        color={colors.mutedForeground}
                      />
                    </View>
                  )}
                  <Text
                    style={[
                      styles.badgeLabel,
                      {
                        color: earned ? colors.foreground : colors.mutedForeground,
                      },
                    ]}
                  >
                    {badge.label}
                  </Text>
                  <Text
                    style={[styles.badgeDesc, { color: colors.mutedForeground }]}
                    numberOfLines={2}
                  >
                    {badge.desc}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Completed books */}
        {completedBookIds.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
              Completed Books
            </Text>
            {allBooks
              .filter((b) => completedBookIds.includes(b.id))
              .map((book) => (
                <View
                  key={book.id}
                  style={[
                    styles.doneRow,
                    { backgroundColor: colors.card, borderColor: colors.border },
                  ]}
                >
                  <View
                    style={[styles.doneCheck, { backgroundColor: colors.success }]}
                  >
                    <Feather name="check" size={14} color="#fff" />
                  </View>
                  <View style={styles.doneInfo}>
                    <Text style={[styles.doneTitle, { color: colors.foreground }]}>
                      {book.title}
                    </Text>
                    <Text style={[styles.doneSub, { color: colors.mutedForeground }]}>
                      {book.author} · +{book.xpReward} XP earned
                    </Text>
                  </View>
                </View>
              ))}
          </View>
        )}

        <Pressable
          onPress={resetProgress}
          style={[styles.resetBtn, { borderColor: colors.border }]}
        >
          <Feather name="refresh-ccw" size={13} color={colors.mutedForeground} />
          <Text style={[styles.resetText, { color: colors.mutedForeground }]}>
            Reset all progress
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingBottom: 14 },
  title: { fontSize: 28, fontWeight: "800", letterSpacing: -0.5 },
  scroll: { paddingHorizontal: 20, gap: 16 },
  levelCard: {
    borderRadius: 20,
    padding: 20,
    gap: 12,
  },
  levelTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  levelLabel: { fontSize: 22, fontWeight: "900", color: "#fff", letterSpacing: -0.5 },
  levelSub: { fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 3 },
  xpBig: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  xpBigText: { fontSize: 20, fontWeight: "800", color: "#fff" },
  xpTrack: {
    height: 10,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 5,
    overflow: "hidden",
  },
  xpFill: { height: "100%", borderRadius: 5 },
  xpHintText: { fontSize: 11, color: "rgba(255,255,255,0.4)", textAlign: "right" },
  statsRow: { flexDirection: "row", gap: 10 },
  statCard: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    alignItems: "center",
    gap: 5,
  },
  statValue: { fontSize: 24, fontWeight: "900" },
  statLabel: { fontSize: 10, fontWeight: "600", textAlign: "center" },
  section: { gap: 10 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: { fontSize: 18, fontWeight: "800", letterSpacing: -0.3 },
  seeAll: { fontSize: 13, fontWeight: "600" },
  habitRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  habitIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  habitName: { flex: 1, fontSize: 14, fontWeight: "700" },
  habitStreak: { flexDirection: "row", alignItems: "center", gap: 3 },
  habitStreakFire: { fontSize: 14 },
  habitStreakNum: { fontSize: 16, fontWeight: "800" },
  badgesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  badgeCard: {
    width: "47%",
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
    gap: 8,
  },
  badgeIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeLabel: { fontSize: 12, fontWeight: "700", textAlign: "center" },
  badgeDesc: { fontSize: 10, textAlign: "center", lineHeight: 13 },
  doneRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  doneCheck: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  doneInfo: { flex: 1 },
  doneTitle: { fontSize: 14, fontWeight: "700" },
  doneSub: { fontSize: 11, marginTop: 2 },
  resetBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 4,
    marginBottom: 8,
  },
  resetText: { fontSize: 13, fontWeight: "500" },
});
