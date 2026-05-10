import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Animated,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useApp } from "@/context/AppContext";
import { BOOKS, Quiz } from "@/data/content";
import { useColors } from "@/hooks/useColors";

type AnswerState = "idle" | "correct" | "wrong";

export default function QuizScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { bookId } = useLocalSearchParams<{ bookId: string }>();
  const { xp, customBooks } = useApp();

  const allBooks = [...BOOKS, ...customBooks];
  const book = allBooks.find((b) => b.id === bookId);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>("idle");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  if (!book || book.quizzes.length === 0) {
    return (
      <View
        style={[
          styles.container,
          styles.centered,
          { backgroundColor: colors.background },
        ]}
      >
        <Feather name="check-circle" size={60} color={colors.success} />
        <Text style={[styles.doneTitle, { color: colors.foreground }]}>
          Book Complete!
        </Text>
        <Pressable
          onPress={() => router.replace("/")}
          style={[styles.doneBtn, { backgroundColor: colors.primary }]}
        >
          <Text style={styles.doneBtnText}>Back to Home</Text>
        </Pressable>
      </View>
    );
  }

  const quiz: Quiz = book.quizzes[currentQ];
  const totalQ = book.quizzes.length;

  function handleSelect(index: number) {
    if (answerState !== "idle") return;
    setSelected(index);
    const correct = index === quiz.correctIndex;
    setAnswerState(correct ? "correct" : "wrong");
    if (correct) {
      setScore((s) => s + 1);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  }

  function handleNext() {
    if (currentQ < totalQ - 1) {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setAnswerState("idle");
      Haptics.selectionAsync();
    } else {
      setFinished(true);
    }
  }

  function getOptionStyle(index: number) {
    if (answerState === "idle") {
      return {
        backgroundColor: colors.card,
        borderColor: colors.border,
      };
    }
    if (index === quiz.correctIndex) {
      return { backgroundColor: "#E8F5E9", borderColor: colors.success };
    }
    if (index === selected && index !== quiz.correctIndex) {
      return { backgroundColor: "#FFEBEE", borderColor: "#EF5350" };
    }
    return { backgroundColor: colors.card, borderColor: colors.border };
  }

  function getOptionIconColor(index: number): string {
    if (answerState === "idle") return colors.mutedForeground;
    if (index === quiz.correctIndex) return colors.success;
    if (index === selected && index !== quiz.correctIndex) return "#EF5350";
    return colors.border;
  }

  if (finished) {
    const perfect = score === totalQ;
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: colors.background },
        ]}
      >
        <View style={[styles.resultContainer, { paddingTop: topPad + 24, paddingBottom: bottomPad + 24 }]}>
          {/* Header */}
          <View
            style={[
              styles.resultIcon,
              { backgroundColor: perfect ? colors.success : colors.primary },
            ]}
          >
            <Feather
              name={perfect ? "star" : "check"}
              size={40}
              color="#fff"
            />
          </View>

          <Text style={[styles.resultTitle, { color: colors.foreground }]}>
            {perfect ? "Perfect Score!" : "Quiz Complete!"}
          </Text>
          <Text style={[styles.resultSub, { color: colors.mutedForeground }]}>
            You got {score} out of {totalQ} questions right
          </Text>

          <View style={styles.resultStats}>
            <View
              style={[
                styles.resultStat,
                { backgroundColor: "#FFF3E0", borderColor: "#FFE0B2" },
              ]}
            >
              <Feather name="zap" size={20} color="#F5A623" />
              <Text style={styles.resultStatValue}>{xp}</Text>
              <Text style={[styles.resultStatLabel, { color: "#F5A623" }]}>
                Total XP
              </Text>
            </View>
            <View
              style={[
                styles.resultStat,
                { backgroundColor: "#E8F5E9", borderColor: "#C8E6C9" },
              ]}
            >
              <Feather name="book-open" size={20} color={colors.success} />
              <Text style={[styles.resultStatValue, { color: colors.success }]}>
                {score}/{totalQ}
              </Text>
              <Text style={[styles.resultStatLabel, { color: colors.success }]}>
                Score
              </Text>
            </View>
          </View>

          <Text style={[styles.bookCompleted, { color: colors.mutedForeground }]}>
            <Feather name="check-circle" size={14} color={colors.success} />{" "}
            "{book.title}" marked complete
          </Text>

          <Pressable
            onPress={() => router.replace("/")}
            style={({ pressed }) => [
              styles.homeBtn,
              {
                backgroundColor: colors.navy,
                opacity: pressed ? 0.9 : 1,
              },
            ]}
          >
            <Text style={styles.homeBtnText}>Back to Home</Text>
            <Feather name="arrow-right" size={18} color="#fff" />
          </Pressable>

          <Pressable
            onPress={() => router.replace("/(tabs)/explore")}
            style={({ pressed }) => [
              styles.exploreBtn,
              {
                backgroundColor: colors.secondary,
                opacity: pressed ? 0.85 : 1,
              },
            ]}
          >
            <Text style={[styles.exploreBtnText, { color: colors.foreground }]}>
              Explore More Books
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            paddingTop: topPad + 12,
            backgroundColor: colors.background,
            borderBottomColor: colors.border,
          },
        ]}
      >
        <Pressable
          onPress={() => router.replace("/")}
          style={[styles.closeBtn, { backgroundColor: colors.secondary }]}
          hitSlop={8}
        >
          <Feather name="x" size={18} color={colors.foreground} />
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { color: colors.foreground }]}>
            Quick Quiz
          </Text>
          <Text style={[styles.headerSub, { color: colors.mutedForeground }]}>
            {book.title}
          </Text>
        </View>
        <View style={[styles.scoreChip, { backgroundColor: colors.secondary }]}>
          <Text style={[styles.scoreText, { color: colors.foreground }]}>
            {score}/{totalQ}
          </Text>
        </View>
      </View>

      {/* Progress */}
      <View style={[styles.progressTrack, { backgroundColor: colors.secondary }]}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${((currentQ + 1) / totalQ) * 100}%` as any,
              backgroundColor: colors.primary,
            },
          ]}
        />
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: bottomPad + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Question */}
        <View
          style={[
            styles.questionCard,
            { backgroundColor: colors.navy },
          ]}
        >
          <Text style={styles.qNum}>
            Question {currentQ + 1} of {totalQ}
          </Text>
          <Text style={styles.question}>{quiz.question}</Text>
        </View>

        {/* Options */}
        <View style={styles.options}>
          {quiz.options.map((option, index) => (
            <Pressable
              key={index}
              onPress={() => handleSelect(index)}
              style={({ pressed }) => [
                styles.option,
                getOptionStyle(index),
                { opacity: pressed && answerState === "idle" ? 0.8 : 1 },
              ]}
            >
              <View
                style={[
                  styles.optionIndicator,
                  {
                    borderColor: getOptionIconColor(index),
                    backgroundColor:
                      answerState !== "idle" &&
                      (index === quiz.correctIndex ||
                        index === selected)
                        ? getOptionIconColor(index) + "20"
                        : "transparent",
                  },
                ]}
              >
                {answerState !== "idle" && index === quiz.correctIndex && (
                  <Feather name="check" size={14} color={colors.success} />
                )}
                {answerState !== "idle" &&
                  index === selected &&
                  index !== quiz.correctIndex && (
                    <Feather name="x" size={14} color="#EF5350" />
                  )}
                {(answerState === "idle" ||
                  (index !== quiz.correctIndex && index !== selected)) &&
                  answerState === "idle" && (
                    <Text
                      style={[
                        styles.optionLetter,
                        { color: colors.mutedForeground },
                      ]}
                    >
                      {String.fromCharCode(65 + index)}
                    </Text>
                  )}
              </View>
              <Text
                style={[styles.optionText, { color: colors.foreground }]}
              >
                {option}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Feedback */}
        {answerState !== "idle" && (
          <View
            style={[
              styles.feedback,
              {
                backgroundColor:
                  answerState === "correct" ? "#E8F5E9" : "#FFEBEE",
                borderColor:
                  answerState === "correct" ? colors.success : "#EF5350",
              },
            ]}
          >
            <Feather
              name={answerState === "correct" ? "check-circle" : "info"}
              size={18}
              color={answerState === "correct" ? colors.success : "#EF5350"}
            />
            <Text
              style={[
                styles.feedbackText,
                {
                  color:
                    answerState === "correct" ? colors.success : "#EF5350",
                },
              ]}
            >
              {answerState === "correct"
                ? "Correct! Great job."
                : `Not quite — the answer was "${quiz.options[quiz.correctIndex]}"`}
            </Text>
          </View>
        )}

        {/* Next button */}
        {answerState !== "idle" && (
          <Pressable
            onPress={handleNext}
            style={({ pressed }) => [
              styles.nextBtn,
              {
                backgroundColor: colors.primary,
                opacity: pressed ? 0.85 : 1,
              },
            ]}
          >
            <Text style={styles.nextBtnText}>
              {currentQ === totalQ - 1 ? "See Results" : "Next Question"}
            </Text>
            <Feather name="arrow-right" size={18} color="#fff" />
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  centered: { alignItems: "center", justifyContent: "center", gap: 20 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 10,
    borderBottomWidth: 1,
  },
  closeBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
    gap: 2,
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: "700",
  },
  headerSub: {
    fontSize: 11,
  },
  scoreChip: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  scoreText: {
    fontSize: 13,
    fontWeight: "700",
  },
  progressTrack: {
    height: 4,
  },
  progressFill: {
    height: "100%",
  },
  scroll: {
    padding: 20,
    gap: 14,
  },
  questionCard: {
    borderRadius: 18,
    padding: 22,
    gap: 10,
  },
  qNum: {
    fontSize: 11,
    fontWeight: "700",
    color: "#F5A623",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  question: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    lineHeight: 27,
  },
  options: {
    gap: 10,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    padding: 16,
  },
  optionIndicator: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  optionLetter: {
    fontSize: 13,
    fontWeight: "700",
  },
  optionText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 20,
  },
  feedback: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  feedbackText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
  },
  nextBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
    borderRadius: 16,
  },
  nextBtnText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  resultContainer: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: "center",
    gap: 16,
  },
  resultIcon: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  resultSub: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
  },
  resultStats: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
    marginVertical: 8,
  },
  resultStat: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    alignItems: "center",
    gap: 6,
  },
  resultStatValue: {
    fontSize: 26,
    fontWeight: "800",
    color: "#F5A623",
  },
  resultStatLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
  bookCompleted: {
    fontSize: 13,
    textAlign: "center",
  },
  homeBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
    borderRadius: 16,
    width: "100%",
  },
  homeBtnText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  exploreBtn: {
    paddingVertical: 14,
    borderRadius: 14,
    width: "100%",
    alignItems: "center",
  },
  exploreBtnText: {
    fontSize: 15,
    fontWeight: "600",
  },
  doneTitle: {
    fontSize: 24,
    fontWeight: "800",
  },
  doneBtn: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 14,
  },
  doneBtnText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
});
