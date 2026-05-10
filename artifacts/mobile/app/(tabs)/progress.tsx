import { Feather } from "@expo/vector-icons";
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
    resetProgress,
  } = useApp();

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const levelProgress = xp % XP_PER_LEVEL;
  const xpToNextLevel = XP_PER_LEVEL;

  function isBadgeEarned(badge: (typeof BADGES)[0]) {
    if (badge.xpRequired && xp < badge.xpRequired) return false;
    if (badge.streakRequired && streak < badge.streakRequired) return false;
    if (badge.booksRequired && completedBookIds.length < badge.booksRequired) return false;
    return true;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.header,
          { paddingTop: topPad + 12, backgroundColor: colors.background },
        ]}
      >
        <Text style={[styles.title, { color: colors.foreground }]}>
          Progress
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          {
            paddingBottom:
              Platform.OS === "web" ? 34 + 84 : insets.bottom + 84,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* XP Level Card */}
        <View
          style={[
            styles.levelCard,
            { backgroundColor: colors.navy },
          ]}
        >
          <View style={styles.levelHeader}>
            <View>
              <Text style={styles.levelLabel}>Level {level}</Text>
              <Text style={styles.levelSub}>
                {xp} XP total · {xpToNextLevel - levelProgress} XP to next
              </Text>
            </View>
            <View style={[styles.levelBadge, { backgroundColor: colors.primary }]}>
              <Feather name="star" size={18} color="#fff" />
              <Text style={styles.levelBadgeText}>{xp}</Text>
            </View>
          </View>
          <View style={styles.xpTrack}>
            <View
              style={[
                styles.xpFill,
                {
                  width: `${(levelProgress / xpToNextLevel) * 100}%` as any,
                  backgroundColor: colors.primary,
                },
              ]}
            />
          </View>
          <Text style={styles.xpHint}>
            {levelProgress}/{xpToNextLevel} XP to Level {level + 1}
          </Text>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          {[
            { icon: "book-open", value: totalIdeasRead, label: "Ideas Read" },
            { icon: "check-circle", value: completedBookIds.length, label: "Books Done" },
            { icon: "zap", value: streak, label: "Day Streak" },
          ].map((stat) => (
            <View
              key={stat.label}
              style={[
                styles.statCard,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <Feather name={stat.icon as any} size={20} color={colors.primary} />
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

        {/* Badges */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Badges
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
                      opacity: earned ? 1 : 0.55,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.badgeIcon,
                      {
                        backgroundColor: earned
                          ? "#FFF3E0"
                          : colors.secondary,
                      },
                    ]}
                  >
                    <Feather
                      name={badge.icon as any}
                      size={22}
                      color={earned ? colors.primary : colors.mutedForeground}
                    />
                  </View>
                  <Text
                    style={[
                      styles.badgeLabel,
                      { color: earned ? colors.foreground : colors.mutedForeground },
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
            {BOOKS.filter((b) => completedBookIds.includes(b.id)).map(
              (book) => (
                <View
                  key={book.id}
                  style={[
                    styles.completedRow,
                    { backgroundColor: colors.card, borderColor: colors.border },
                  ]}
                >
                  <View
                    style={[
                      styles.completedCheck,
                      { backgroundColor: colors.success },
                    ]}
                  >
                    <Feather name="check" size={14} color="#fff" />
                  </View>
                  <View style={styles.completedInfo}>
                    <Text
                      style={[styles.completedTitle, { color: colors.foreground }]}
                    >
                      {book.title}
                    </Text>
                    <Text
                      style={[
                        styles.completedAuthor,
                        { color: colors.mutedForeground },
                      ]}
                    >
                      {book.author} · +{book.xpReward} XP
                    </Text>
                  </View>
                </View>
              )
            )}
          </View>
        )}

        <Pressable
          onPress={resetProgress}
          style={[styles.resetBtn, { borderColor: colors.border }]}
        >
          <Feather name="refresh-ccw" size={14} color={colors.mutedForeground} />
          <Text style={[styles.resetText, { color: colors.mutedForeground }]}>
            Reset progress
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 14,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  scroll: {
    paddingHorizontal: 20,
    gap: 16,
  },
  levelCard: {
    borderRadius: 20,
    padding: 20,
    gap: 12,
  },
  levelHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  levelLabel: {
    fontSize: 22,
    fontWeight: "800",
    color: "#fff",
  },
  levelSub: {
    fontSize: 12,
    color: "rgba(255,255,255,0.6)",
    marginTop: 2,
  },
  levelBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  levelBadgeText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#fff",
  },
  xpTrack: {
    height: 10,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 5,
    overflow: "hidden",
  },
  xpFill: {
    height: "100%",
    borderRadius: 5,
  },
  xpHint: {
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
    textAlign: "right",
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
  },
  statCard: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    alignItems: "center",
    gap: 6,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "800",
  },
  statLabel: {
    fontSize: 11,
    fontWeight: "500",
    textAlign: "center",
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: -0.3,
  },
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
  badgeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeLabel: {
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
  },
  badgeDesc: {
    fontSize: 11,
    textAlign: "center",
    lineHeight: 14,
  },
  completedRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  completedCheck: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  completedInfo: {
    flex: 1,
    gap: 2,
  },
  completedTitle: {
    fontSize: 14,
    fontWeight: "700",
  },
  completedAuthor: {
    fontSize: 12,
  },
  resetBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 8,
  },
  resetText: {
    fontSize: 13,
    fontWeight: "500",
  },
});
