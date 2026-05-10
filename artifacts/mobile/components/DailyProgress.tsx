import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { useColors } from "@/hooks/useColors";

interface DailyProgressProps {
  current: number;
  goal: number;
  streak: number;
  xp: number;
}

export function DailyProgress({ current, goal, streak, xp }: DailyProgressProps) {
  const colors = useColors();
  const progress = Math.min(current / goal, 1);
  const done = current >= goal;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      <View style={styles.topRow}>
        <View style={styles.goalSection}>
          <Text style={[styles.goalLabel, { color: colors.mutedForeground }]}>
            Daily Goal
          </Text>
          <Text style={[styles.goalCount, { color: colors.foreground }]}>
            <Text style={{ color: done ? colors.success : colors.primary }}>
              {current}
            </Text>
            /{goal} ideas
          </Text>
        </View>

        <View style={styles.badges}>
          <View style={[styles.badge, { backgroundColor: "#FFF3E0" }]}>
            <Feather name="zap" size={13} color="#F5A623" />
            <Text style={[styles.badgeText, { color: "#F5A623" }]}>{streak}d</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: colors.secondary }]}>
            <Feather name="star" size={13} color={colors.primary} />
            <Text style={[styles.badgeText, { color: colors.primary }]}>{xp} XP</Text>
          </View>
        </View>
      </View>

      <View style={[styles.track, { backgroundColor: colors.secondary }]}>
        <View
          style={[
            styles.fill,
            {
              width: `${progress * 100}%` as any,
              backgroundColor: done ? colors.success : colors.primary,
            },
          ]}
        />
      </View>

      {done && (
        <Text style={[styles.doneText, { color: colors.success }]}>
          Goal complete — great work!
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 10,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  goalSection: {
    gap: 2,
  },
  goalLabel: {
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  goalCount: {
    fontSize: 18,
    fontWeight: "700",
  },
  badges: {
    flexDirection: "row",
    gap: 8,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
  },
  track: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: 4,
  },
  doneText: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
});
