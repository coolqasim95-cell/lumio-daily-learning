import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { GoalChip } from "@/components/GoalChip";
import { useApp } from "@/context/AppContext";
import { BOOKS, GOALS } from "@/data/content";
import { useColors } from "@/hooks/useColors";

export default function OnboardingScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { completeOnboarding } = useApp();
  const [step, setStep] = useState(0);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [savedBooks, setSavedBooks] = useState<string[]>([]);

  const recommendedBooks = BOOKS.slice(0, 3);

  function toggleGoal(id: string) {
    Haptics.selectionAsync();
    setSelectedGoals((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  }

  function toggleBook(id: string) {
    Haptics.selectionAsync();
    setSavedBooks((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  }

  async function handleContinue() {
    if (step === 0) {
      if (selectedGoals.length === 0) return;
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setStep(1);
    } else if (step === 1) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setStep(2);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      await completeOnboarding(selectedGoals);
      router.replace("/(tabs)/");
    }
  }

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  return (
    <View style={[styles.container, { backgroundColor: colors.navy }]}>
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingTop: topPad + 24, paddingBottom: bottomPad + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <View style={styles.logoRow}>
          <View style={[styles.logoMark, { backgroundColor: colors.primary }]}>
            <Feather name="zap" size={16} color="#fff" />
          </View>
          <Text style={styles.logoText}>lumio</Text>
        </View>

        {/* Step indicators */}
        <View style={styles.stepDots}>
          {[0, 1, 2].map((i) => (
            <View
              key={i}
              style={[
                styles.dot,
                { backgroundColor: i <= step ? colors.primary : "rgba(255,255,255,0.2)" },
              ]}
            />
          ))}
        </View>

        {/* Step 0: Goals */}
        {step === 0 && (
          <View style={styles.content}>
            <Text style={styles.heading}>What are some of{"\n"}your goals?</Text>
            <Text style={styles.subheading}>
              Pick what you'd like to dive into for your first reading journey.
            </Text>
            <View style={styles.chips}>
              {GOALS.map((goal) => (
                <GoalChip
                  key={goal.id}
                  label={goal.label}
                  icon={goal.icon}
                  selected={selectedGoals.includes(goal.id)}
                  onPress={() => toggleGoal(goal.id)}
                />
              ))}
            </View>
          </View>
        )}

        {/* Step 1: Book recommendations */}
        {step === 1 && (
          <View style={styles.content}>
            <Text style={styles.heading}>
              Ok, here are some{"\n"}recommendations
            </Text>
            <Text style={styles.subheading}>
              Pick what you'd like to dive into for your first reading journey.
            </Text>
            <View style={styles.bookList}>
              {recommendedBooks.map((book) => {
                const added = savedBooks.includes(book.id);
                return (
                  <View
                    key={book.id}
                    style={[
                      styles.bookCard,
                      { backgroundColor: "rgba(255,255,255,0.07)" },
                    ]}
                  >
                    <Image source={book.cover} style={styles.bookCover} />
                    <View style={styles.bookInfo}>
                      <Text style={styles.bookTitle}>{book.title}</Text>
                      <Text style={styles.bookAuthor}>Written by {book.author}</Text>
                    </View>
                    <View style={styles.bookActions}>
                      <Pressable
                        onPress={() => {}}
                        style={[styles.actionBtn, { borderColor: "#EF5350" }]}
                      >
                        <Feather name="x" size={14} color="#EF5350" />
                        <Text style={[styles.actionText, { color: "#EF5350" }]}>
                          Skip
                        </Text>
                      </Pressable>
                      <Pressable
                        onPress={() => toggleBook(book.id)}
                        style={[
                          styles.actionBtn,
                          {
                            borderColor: added ? colors.success : colors.primary,
                            backgroundColor: added
                              ? colors.success
                              : colors.primary,
                          },
                        ]}
                      >
                        <Feather
                          name={added ? "check" : "plus"}
                          size={14}
                          color="#fff"
                        />
                        <Text style={[styles.actionText, { color: "#fff" }]}>
                          {added ? "Added" : "Add"}
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {/* Step 2: Success */}
        {step === 2 && (
          <View style={[styles.content, styles.successContent]}>
            <View style={[styles.successIcon, { backgroundColor: colors.success }]}>
              <Feather name="check" size={40} color="#fff" />
            </View>
            <Text style={styles.heading}>We saved{"\n"}your picks!</Text>
            <Text style={styles.subheading}>
              You'll see them in your feed. Read 5 ideas a day and stay on top
              of things.
            </Text>

            <View style={styles.statRow}>
              {[
                { icon: "book-open", value: "5", label: "Ideas / day" },
                { icon: "zap", value: "50", label: "XP per book" },
                { icon: "calendar", value: "7", label: "Day streak goal" },
              ].map((stat) => (
                <View
                  key={stat.label}
                  style={[
                    styles.statCard,
                    { backgroundColor: "rgba(255,255,255,0.08)" },
                  ]}
                >
                  <Feather name={stat.icon as any} size={20} color={colors.primary} />
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* CTA Button */}
      <View
        style={[
          styles.footer,
          { paddingBottom: bottomPad + 16, paddingTop: 12 },
        ]}
      >
        <Pressable
          onPress={handleContinue}
          style={({ pressed }) => [
            styles.ctaButton,
            {
              backgroundColor:
                step === 0 && selectedGoals.length === 0
                  ? "rgba(245,166,35,0.4)"
                  : colors.primary,
              opacity: pressed ? 0.9 : 1,
            },
          ]}
        >
          <Text style={styles.ctaText}>
            {step === 2 ? "Start Learning" : "Continue"}
          </Text>
          <Feather name="arrow-right" size={18} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 24,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 24,
  },
  logoMark: {
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: -0.5,
  },
  stepDots: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 32,
  },
  dot: {
    width: 24,
    height: 4,
    borderRadius: 2,
  },
  content: {
    flex: 1,
  },
  heading: {
    fontSize: 30,
    fontWeight: "800",
    color: "#fff",
    lineHeight: 38,
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  subheading: {
    fontSize: 15,
    color: "rgba(255,255,255,0.65)",
    lineHeight: 22,
    marginBottom: 28,
  },
  chips: {
    gap: 0,
  },
  bookList: {
    gap: 12,
  },
  bookCard: {
    flexDirection: "row",
    borderRadius: 14,
    overflow: "hidden",
    alignItems: "center",
  },
  bookCover: {
    width: 60,
    height: 80,
    resizeMode: "cover",
  },
  bookInfo: {
    flex: 1,
    paddingHorizontal: 12,
    gap: 4,
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#fff",
  },
  bookAuthor: {
    fontSize: 12,
    color: "rgba(255,255,255,0.6)",
  },
  bookActions: {
    flexDirection: "row",
    gap: 8,
    paddingRight: 12,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  actionText: {
    fontSize: 12,
    fontWeight: "600",
  },
  successContent: {
    alignItems: "center",
    paddingTop: 20,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  statRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 32,
    width: "100%",
  },
  statCard: {
    flex: 1,
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
    gap: 6,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "800",
    color: "#fff",
  },
  statLabel: {
    fontSize: 11,
    color: "rgba(255,255,255,0.6)",
    textAlign: "center",
    fontWeight: "500",
  },
  footer: {
    paddingHorizontal: 24,
    backgroundColor: "transparent",
  },
  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
    borderRadius: 16,
  },
  ctaText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
});
