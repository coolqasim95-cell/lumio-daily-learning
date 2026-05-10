import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
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
import { BOOKS, findTopic, getNextTopic } from "@/data/content";
import { useColors } from "@/hooks/useColors";

type Phase = "read" | "quiz" | "done";
type AnswerState = "idle" | "correct" | "wrong";

export default function TopicScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { bookId, lessonId, topicId } = useLocalSearchParams<{
    bookId: string;
    lessonId: string;
    topicId: string;
  }>();
  const { completeTopic, completedTopicIds, customBooks, setInProgress } = useApp();

  const allBooks = [...BOOKS, ...customBooks];
  const book = allBooks.find((b) => b.id === bookId);
  const found = book ? findTopic(book, lessonId ?? "", topicId ?? "") : null;

  const [phase, setPhase] = useState<Phase>("read");
  const [selected, setSelected] = useState<number | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>("idle");
  const [xpAnimScale] = useState(new Animated.Value(0));

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  if (!book || !found) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.mutedForeground }}>Topic not found</Text>
      </View>
    );
  }

  const { lesson, topic } = found;
  const alreadyDone = completedTopicIds.includes(topic.id);
  const quiz = topic.quiz;

  // Progress within the lesson
  const lessonTopicIndex = lesson.topics.findIndex((t) => t.id === topic.id);
  const lessonProgress = (lessonTopicIndex + 1) / lesson.topics.length;

  function handleStartQuiz() {
    setPhase("quiz");
    Haptics.selectionAsync();
  }

  async function handleSelect(index: number) {
    if (answerState !== "idle") return;
    setSelected(index);
    const correct = index === quiz.correctIndex;
    setAnswerState(correct ? "correct" : "wrong");
    if (correct) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      if (!alreadyDone) {
        await completeTopic(bookId ?? "", lessonId ?? "", topicId ?? "");
      }
      // Animate XP badge
      Animated.sequence([
        Animated.spring(xpAnimScale, { toValue: 1, useNativeDriver: true, tension: 200 }),
        Animated.delay(1200),
        Animated.timing(xpAnimScale, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]).start(() => setPhase("done"));
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  }

  function handleContinue() {
    const next = getNextTopic(book!, lessonId ?? "", topicId ?? "");
    if (next) {
      setInProgress(bookId ?? "", next.lessonId, next.topicId);
      router.replace(
        `/topic?bookId=${bookId}&lessonId=${next.lessonId}&topicId=${next.topicId}` as any
      );
    } else {
      // All topics done — back to reader (lesson list)
      router.replace(`/reader/${bookId}`);
    }
  }

  function getOptionStyle(index: number) {
    if (answerState === "idle") return { backgroundColor: colors.card, borderColor: colors.border };
    if (index === quiz.correctIndex) return { backgroundColor: "#E8F5E9", borderColor: colors.success };
    if (index === selected && index !== quiz.correctIndex) return { backgroundColor: "#FFEBEE", borderColor: "#EF5350" };
    return { backgroundColor: colors.card, borderColor: colors.border };
  }

  function getOptionIcon(index: number) {
    if (answerState === "idle") return null;
    if (index === quiz.correctIndex) return <Feather name="check" size={14} color={colors.success} />;
    if (index === selected && index !== quiz.correctIndex) return <Feather name="x" size={14} color="#EF5350" />;
    return (
      <Text style={[styles.optionLetter, { color: colors.mutedForeground }]}>
        {String.fromCharCode(65 + index)}
      </Text>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <LinearGradient
        colors={[book.gradientFrom + "EE", book.gradientTo + "99"]}
        style={[styles.header, { paddingTop: topPad + 8 }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={12}>
          <Feather name="chevron-left" size={22} color="#fff" />
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={styles.headerLesson} numberOfLines={1}>{lesson.title}</Text>
          <Text style={styles.headerTopic} numberOfLines={1}>{topic.title}</Text>
        </View>
        <View style={styles.phaseChip}>
          <Text style={styles.phaseChipText}>
            {phase === "read" ? "READ" : phase === "quiz" ? "QUIZ" : "✓"}
          </Text>
        </View>
      </LinearGradient>

      {/* Lesson progress bar */}
      <View style={[styles.progressTrack, { backgroundColor: colors.secondary }]}>
        <LinearGradient
          colors={[book.gradientFrom, book.gradientTo]}
          style={[styles.progressFill, { width: `${lessonProgress * 100}%` as any }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      </View>

      {/* XP earned animation overlay */}
      <Animated.View
        style={[
          styles.xpToast,
          { transform: [{ scale: xpAnimScale }] },
          xpAnimScale as any,
        ]}
        pointerEvents="none"
      >
        <LinearGradient
          colors={["#F5A623", "#EF4444"]}
          style={styles.xpToastGrad}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Feather name="zap" size={18} color="#fff" />
          <Text style={styles.xpToastText}>+10 XP Earned!</Text>
        </LinearGradient>
      </Animated.View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: bottomPad + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── READ PHASE ── */}
        {phase === "read" && (
          <>
            <Text style={[styles.topicTitle, { color: colors.foreground }]}>
              {topic.title}
            </Text>

            <View style={[styles.contentCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.contentText, { color: colors.foreground }]}>
                {topic.content}
              </Text>
            </View>

            {/* Wisdom box */}
            <LinearGradient
              colors={[book.gradientFrom + "33", book.gradientTo + "22"]}
              style={[styles.wisdomBox, { borderColor: book.gradientFrom + "66" }]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.wisdomHeader}>
                <Feather name="bookmark" size={15} color={book.gradientFrom} />
                <Text style={[styles.wisdomLabel, { color: book.gradientFrom }]}>KEY WISDOM</Text>
              </View>
              <Text style={[styles.wisdomText, { color: colors.foreground }]}>
                {topic.wisdom}
              </Text>
            </LinearGradient>

            <Pressable onPress={handleStartQuiz}>
              <LinearGradient
                colors={[book.gradientFrom, book.gradientTo]}
                style={styles.quizBtn}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Feather name="help-circle" size={20} color="#fff" />
                <Text style={styles.quizBtnText}>Take the Quiz → +10 XP</Text>
              </LinearGradient>
            </Pressable>

            {alreadyDone && (
              <Pressable onPress={handleContinue} style={styles.skipBtn}>
                <Text style={[styles.skipText, { color: colors.mutedForeground }]}>
                  Already completed • Skip to next
                </Text>
              </Pressable>
            )}
          </>
        )}

        {/* ── QUIZ PHASE ── */}
        {(phase === "quiz" || phase === "done") && (
          <>
            <View style={[styles.questionCard, { backgroundColor: colors.navy }]}>
              <Text style={styles.qLabel}>QUICK QUIZ</Text>
              <Text style={styles.qText}>{quiz.question}</Text>
            </View>

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
                        borderColor:
                          answerState !== "idle" && index === quiz.correctIndex
                            ? colors.success
                            : answerState !== "idle" && index === selected
                            ? "#EF5350"
                            : colors.border,
                      },
                    ]}
                  >
                    {answerState === "idle" ? (
                      <Text style={[styles.optionLetter, { color: colors.mutedForeground }]}>
                        {String.fromCharCode(65 + index)}
                      </Text>
                    ) : (
                      getOptionIcon(index)
                    )}
                  </View>
                  <Text style={[styles.optionText, { color: colors.foreground }]}>{option}</Text>
                </Pressable>
              ))}
            </View>

            {answerState === "wrong" && (
              <>
                <View style={[styles.feedback, { backgroundColor: "#FFEBEE", borderColor: "#EF5350" }]}>
                  <Feather name="info" size={16} color="#EF5350" />
                  <Text style={[styles.feedbackText, { color: "#EF5350" }]}>
                    Not quite — the answer is "{quiz.options[quiz.correctIndex]}"
                  </Text>
                </View>
                <Pressable onPress={handleContinue}>
                  <LinearGradient
                    colors={[book.gradientFrom, book.gradientTo]}
                    style={styles.continueBtn}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text style={styles.continueBtnText}>Continue Anyway</Text>
                    <Feather name="arrow-right" size={18} color="#fff" />
                  </LinearGradient>
                </Pressable>
              </>
            )}

            {phase === "done" && (
              <>
                <View style={[styles.feedback, { backgroundColor: "#E8F5E9", borderColor: colors.success }]}>
                  <Feather name="check-circle" size={16} color={colors.success} />
                  <Text style={[styles.feedbackText, { color: colors.success }]}>
                    Correct! +10 XP added to your account.
                  </Text>
                </View>
                <Pressable onPress={handleContinue}>
                  <LinearGradient
                    colors={[colors.success, "#16A34A"]}
                    style={styles.continueBtn}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text style={styles.continueBtnText}>
                      {getNextTopic(book!, lessonId ?? "", topicId ?? "")
                        ? "Next Topic"
                        : "Back to Lessons"}
                    </Text>
                    <Feather name="arrow-right" size={18} color="#fff" />
                  </LinearGradient>
                </Pressable>
              </>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 14,
    gap: 10,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerCenter: { flex: 1 },
  headerLesson: {
    fontSize: 11,
    fontWeight: "600",
    color: "rgba(255,255,255,0.7)",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  headerTopic: {
    fontSize: 15,
    fontWeight: "700",
    color: "#fff",
    marginTop: 1,
  },
  phaseChip: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  phaseChipText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 1,
  },
  progressTrack: { height: 3 },
  progressFill: { height: "100%", borderRadius: 2 },
  xpToast: {
    position: "absolute",
    top: 120,
    alignSelf: "center",
    zIndex: 999,
  },
  xpToastGrad: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 40,
  },
  xpToastText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#fff",
  },
  scroll: { padding: 20, gap: 16 },
  topicTitle: {
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: -0.8,
    lineHeight: 34,
  },
  contentCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 20,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 27,
    letterSpacing: 0.1,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
  },
  wisdomBox: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 18,
    gap: 10,
  },
  wisdomHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  wisdomLabel: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  wisdomText: {
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 23,
    fontStyle: "italic",
  },
  quizBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 18,
    borderRadius: 18,
  },
  quizBtnText: {
    fontSize: 17,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: -0.2,
  },
  skipBtn: {
    alignItems: "center",
    paddingVertical: 8,
  },
  skipText: {
    fontSize: 13,
    fontWeight: "500",
  },
  questionCard: {
    borderRadius: 18,
    padding: 22,
    gap: 10,
  },
  qLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: "#F5A623",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  qText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    lineHeight: 27,
  },
  options: { gap: 10 },
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
    lineHeight: 21,
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
  continueBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 17,
    borderRadius: 18,
  },
  continueBtnText: {
    fontSize: 17,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: -0.2,
  },
});
