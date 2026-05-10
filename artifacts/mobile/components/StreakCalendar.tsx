import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { useColors } from "@/hooks/useColors";

interface StreakCalendarProps {
  streakDays: string[];
  streak: number;
}

const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

export function StreakCalendar({ streakDays, streak }: StreakCalendarProps) {
  const colors = useColors();

  function getLast28Days(): { date: string; dayOfWeek: number }[] {
    const days = [];
    for (let i = 27; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      days.push({ date: dateStr, dayOfWeek: d.getDay() });
    }
    return days;
  }

  const days = getLast28Days();
  const today = new Date().toISOString().split("T")[0];

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: colors.foreground }]}>
            Streak
          </Text>
          <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
            Last 28 days
          </Text>
        </View>
        <View style={[styles.streakBadge, { backgroundColor: "#FFF3E0" }]}>
          <Feather name="zap" size={20} color="#F5A623" />
          <Text style={styles.streakNumber}>{streak}</Text>
          <Text style={[styles.streakLabel, { color: "#F5A623" }]}>days</Text>
        </View>
      </View>

      <View style={styles.dayLabels}>
        {DAY_LABELS.map((label, i) => (
          <Text key={i} style={[styles.dayLabel, { color: colors.mutedForeground }]}>
            {label}
          </Text>
        ))}
      </View>

      <View style={styles.grid}>
        {days.map((day, index) => {
          const isActive = streakDays.includes(day.date);
          const isToday = day.date === today;
          return (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor: isActive
                    ? colors.success
                    : isToday
                    ? colors.secondary
                    : colors.secondary,
                  borderWidth: isToday ? 2 : 0,
                  borderColor: isToday ? colors.primary : "transparent",
                },
              ]}
            >
              {isActive && (
                <Feather name="check" size={10} color="#fff" />
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  streakBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  streakNumber: {
    fontSize: 22,
    fontWeight: "800",
    color: "#F5A623",
  },
  streakLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
  dayLabels: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  dayLabel: {
    fontSize: 11,
    fontWeight: "600",
    width: 28,
    textAlign: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    justifyContent: "space-between",
  },
  dot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
});
