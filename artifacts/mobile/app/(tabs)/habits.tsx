import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useHabits } from "@/context/HabitContext";
import { useColors } from "@/hooks/useColors";

const HABIT_COLORS = [
  "#F5A623",
  "#7C5CFC",
  "#22C55E",
  "#EC4899",
  "#0EA5E9",
  "#EF4444",
  "#F59E0B",
  "#10B981",
];

const HABIT_ICONS = [
  "sun",
  "moon",
  "book-open",
  "activity",
  "heart",
  "coffee",
  "music",
  "edit-3",
  "zap",
  "shield",
  "droplet",
  "wind",
];

function getLast7Days(): string[] {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split("T")[0];
  });
}

function getDayLabel(dateStr: string): string {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  return days[new Date(dateStr + "T00:00:00").getDay()];
}

function todayStr() {
  return new Date().toISOString().split("T")[0];
}

export default function HabitsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { habits, addHabit, deleteHabit, toggleHabitDate, getHabitStreak, isCompletedToday } =
    useHabits();

  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newColor, setNewColor] = useState(HABIT_COLORS[0]);
  const [newIcon, setNewIcon] = useState(HABIT_ICONS[0]);

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const last7 = getLast7Days();
  const today = todayStr();

  async function handleAdd() {
    if (!newName.trim()) return;
    await addHabit({ name: newName.trim(), icon: newIcon, color: newColor });
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setShowModal(false);
    setNewName("");
    setNewColor(HABIT_COLORS[0]);
    setNewIcon(HABIT_ICONS[0]);
  }

  function confirmDelete(habitId: string, name: string) {
    Alert.alert(`Delete "${name}"?`, "This will remove the habit and all its data.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteHabit(habitId),
      },
    ]);
  }

  async function handleToggle(habitId: string) {
    await toggleHabitDate(habitId, today);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }

  const completedCount = habits.filter((h) => isCompletedToday(h.id)).length;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: topPad + 12 }]}>
        <View>
          <Text style={[styles.title, { color: colors.foreground }]}>
            Habits
          </Text>
          <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
            {completedCount}/{habits.length} done today
          </Text>
        </View>
        <Pressable
          onPress={() => setShowModal(true)}
          style={[styles.addBtn, { backgroundColor: colors.primary }]}
        >
          <Feather name="plus" size={20} color="#fff" />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: Platform.OS === "web" ? 90 : insets.bottom + 85 },
        ]}
      >
        {habits.length === 0 ? (
          <View style={styles.empty}>
            <View
              style={[styles.emptyIcon, { backgroundColor: colors.secondary }]}
            >
              <Feather name="check-circle" size={36} color={colors.mutedForeground} />
            </View>
            <Text style={[styles.emptyTitle, { color: colors.foreground }]}>
              No habits yet
            </Text>
            <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
              Tap + to create your first daily habit and start building streaks.
            </Text>
            <Pressable
              onPress={() => setShowModal(true)}
              style={[styles.emptyBtn, { backgroundColor: colors.primary }]}
            >
              <Feather name="plus" size={16} color="#fff" />
              <Text style={styles.emptyBtnText}>Add Habit</Text>
            </Pressable>
          </View>
        ) : (
          habits.map((habit) => {
            const streak = getHabitStreak(habit.id);
            const done = isCompletedToday(habit.id);

            return (
              <View
                key={habit.id}
                style={[
                  styles.habitCard,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <View style={styles.habitTop}>
                  <View
                    style={[
                      styles.habitIconWrap,
                      { backgroundColor: habit.color + "22" },
                    ]}
                  >
                    <Feather
                      name={habit.icon as any}
                      size={20}
                      color={habit.color}
                    />
                  </View>
                  <View style={styles.habitInfo}>
                    <Text style={[styles.habitName, { color: colors.foreground }]}>
                      {habit.name}
                    </Text>
                    <View style={styles.habitMeta}>
                      <Text
                        style={[styles.streakText, { color: habit.color }]}
                      >
                        🔥 {streak} day streak
                      </Text>
                    </View>
                  </View>
                  <View style={styles.habitRight}>
                    <Pressable
                      onPress={() => handleToggle(habit.id)}
                      style={[
                        styles.checkBtn,
                        {
                          backgroundColor: done
                            ? habit.color
                            : "transparent",
                          borderColor: done ? habit.color : colors.border,
                        },
                      ]}
                    >
                      {done && (
                        <Feather name="check" size={16} color="#fff" />
                      )}
                    </Pressable>
                  </View>
                </View>

                {/* 7-day mini calendar */}
                <View style={styles.weekRow}>
                  {last7.map((dateStr, i) => {
                    const isToday = dateStr === today;
                    return (
                      <Pressable
                        key={dateStr}
                        onPress={() => toggleHabitDate(habit.id, dateStr)}
                        style={styles.dayCol}
                      >
                        <Text
                          style={[
                            styles.dayLabel,
                            { color: isToday ? habit.color : colors.mutedForeground },
                          ]}
                        >
                          {getDayLabel(dateStr)}
                        </Text>
                        <View
                          style={[
                            styles.dayDot,
                            {
                              backgroundColor:
                                (isCompletedToday(habit.id) && isToday) ||
                                (habit.id && i === 6 && done)
                                  ? habit.color
                                  : colors.secondary,
                              borderColor: isToday
                                ? habit.color
                                : "transparent",
                              borderWidth: isToday ? 1.5 : 0,
                            },
                          ]}
                        />
                      </Pressable>
                    );
                  })}
                </View>

                <Pressable
                  onPress={() => confirmDelete(habit.id, habit.name)}
                  style={styles.deleteHint}
                >
                  <Text style={[styles.deleteText, { color: colors.mutedForeground }]}>
                    Hold to delete
                  </Text>
                </Pressable>
              </View>
            );
          })
        )}
      </ScrollView>

      {/* Add Habit Modal */}
      <Modal
        visible={showModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowModal(false)}
      >
        <View
          style={[styles.modal, { backgroundColor: colors.background }]}
        >
          <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
            <Text style={[styles.modalTitle, { color: colors.foreground }]}>
              New Habit
            </Text>
            <Pressable
              onPress={() => setShowModal(false)}
              style={[styles.modalClose, { backgroundColor: colors.secondary }]}
            >
              <Feather name="x" size={16} color={colors.foreground} />
            </Pressable>
          </View>

          <ScrollView contentContainerStyle={styles.modalScroll}>
            {/* Name */}
            <Text style={[styles.fieldLabel, { color: colors.mutedForeground }]}>
              Habit Name
            </Text>
            <TextInput
              value={newName}
              onChangeText={setNewName}
              placeholder="e.g. Meditate 10 min"
              placeholderTextColor={colors.mutedForeground}
              style={[
                styles.modalInput,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  color: colors.foreground,
                },
              ]}
              autoFocus
            />

            {/* Color */}
            <Text style={[styles.fieldLabel, { color: colors.mutedForeground }]}>
              Color
            </Text>
            <View style={styles.colorRow}>
              {HABIT_COLORS.map((c) => (
                <Pressable
                  key={c}
                  onPress={() => setNewColor(c)}
                  style={[
                    styles.colorDot,
                    { backgroundColor: c },
                    newColor === c && styles.colorDotSelected,
                  ]}
                >
                  {newColor === c && (
                    <Feather name="check" size={14} color="#fff" />
                  )}
                </Pressable>
              ))}
            </View>

            {/* Icon */}
            <Text style={[styles.fieldLabel, { color: colors.mutedForeground }]}>
              Icon
            </Text>
            <View style={styles.iconGrid}>
              {HABIT_ICONS.map((ic) => (
                <Pressable
                  key={ic}
                  onPress={() => setNewIcon(ic)}
                  style={[
                    styles.iconBtn,
                    {
                      backgroundColor:
                        newIcon === ic ? newColor + "22" : colors.secondary,
                      borderColor: newIcon === ic ? newColor : "transparent",
                      borderWidth: 1.5,
                    },
                  ]}
                >
                  <Feather
                    name={ic as any}
                    size={20}
                    color={newIcon === ic ? newColor : colors.mutedForeground}
                  />
                </Pressable>
              ))}
            </View>

            <Pressable
              onPress={handleAdd}
              style={({ pressed }) => [
                styles.createBtn,
                { backgroundColor: newColor, opacity: pressed ? 0.85 : 1 },
              ]}
            >
              <Text style={styles.createBtnText}>Create Habit</Text>
            </Pressable>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 14,
  },
  title: { fontSize: 28, fontWeight: "800", letterSpacing: -0.5 },
  subtitle: { fontSize: 13, fontWeight: "500", marginTop: 2 },
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  scroll: { paddingHorizontal: 16 },
  empty: { alignItems: "center", paddingTop: 60, gap: 12, paddingHorizontal: 20 },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  emptyTitle: { fontSize: 20, fontWeight: "700" },
  emptyText: { fontSize: 14, textAlign: "center", lineHeight: 20 },
  emptyBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
    marginTop: 8,
  },
  emptyBtnText: { fontSize: 15, fontWeight: "700", color: "#fff" },
  habitCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    marginBottom: 12,
    gap: 12,
  },
  habitTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  habitIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  habitInfo: { flex: 1 },
  habitName: { fontSize: 16, fontWeight: "700" },
  habitMeta: { marginTop: 2 },
  streakText: { fontSize: 12, fontWeight: "600" },
  habitRight: {},
  checkBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayCol: { alignItems: "center", gap: 4, flex: 1 },
  dayLabel: { fontSize: 10, fontWeight: "700" },
  dayDot: { width: 22, height: 22, borderRadius: 11 },
  deleteHint: { alignItems: "center" },
  deleteText: { fontSize: 10 },
  modal: { flex: 1 },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  modalTitle: { fontSize: 20, fontWeight: "800" },
  modalClose: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  modalScroll: { padding: 20, gap: 12 },
  fieldLabel: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  modalInput: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  colorRow: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
    marginBottom: 16,
  },
  colorDot: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  colorDotSelected: {
    transform: [{ scale: 1.15 }],
  },
  iconGrid: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
    marginBottom: 24,
  },
  iconBtn: {
    width: 50,
    height: 50,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  createBtn: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  createBtnText: { fontSize: 16, fontWeight: "700", color: "#fff" },
});
