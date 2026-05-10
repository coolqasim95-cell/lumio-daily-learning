import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
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

import { useApp } from "@/context/AppContext";
import { BOOKS, getTopicCount } from "@/data/content";
import { useColors } from "@/hooks/useColors";

export default function LessonsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { bookId } = useLocalSearchParams<{ bookId: string }>();
  const {
    completedTopicIds,
    completedLessonIds,
    completedBookIds,
    savedBookIds,
    toggleSaveBook,
    setInProgress,
    customBooks,
  } = useApp();

  const allBooks = [...BOOKS, ...customBooks];
  const book = allBooks.find((b) => b.id === bookId);

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  if (!book) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.mutedForeground }}>Book not found</Text>
      </View>
    );
  }

  const totalTopics = getTopicCount(book);
  const completedCount = book.lessons
    .flatMap((l) => l.topics)
    .filter((t) => completedTopicIds.includes(t.id)).length;
  const bookProgress = totalTopics > 0 ? completedCount / totalTopics : 0;
  const isBookComplete = completedBookIds.includes(book.id);
  const isSaved = savedBookIds.includes(book.id);

  function handleStartTopic(lessonId: string, topicId: string) {
    setInProgress(book!.id, lessonId, topicId);
    router.push(
      `/topic?bookId=${book!.id}&lessonId=${lessonId}&topicId=${topicId}` as any
    );
  }

  function getFirstUncompletedTopic(): { lessonId: string; topicId: string } | null {
    for (const lesson of book!.lessons) {
      for (const topic of lesson.topics) {
        if (!completedTopicIds.includes(topic.id)) {
          return { lessonId: lesson.id, topicId: topic.id };
        }
      }
    }
    return null;
  }

  const nextTopic = getFirstUncompletedTopic();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Book header */}
      <LinearGradient
        colors={[book.gradientFrom, book.gradientTo]}
        style={[styles.bookHeader, { paddingTop: topPad + 6 }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.bookHeaderTop}>
          <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={12}>
            <Feather name="chevron-left" size={22} color="#fff" />
          </Pressable>
          <Pressable
            onPress={() => toggleSaveBook(book.id)}
            style={styles.saveBtn}
            hitSlop={12}
          >
            <Feather
              name={isSaved ? "bookmark" : "bookmark"}
              size={20}
              color={isSaved ? "#F5A623" : "rgba(255,255,255,0.7)"}
            />
          </Pressable>
        </View>

        <View style={styles.bookInfo}>
          <Image source={book.cover} style={styles.cover} />
          <View style={styles.bookText}>
            <Text style={styles.bookCategory}>{book.category}</Text>
            <Text style={styles.bookTitle}>{book.title}</Text>
            <Text style={styles.bookAuthor}>{book.author}</Text>
            <View style={styles.bookMeta}>
              <View style={styles.metaChip}>
                <Feather name="layers" size={11} color="rgba(255,255,255,0.8)" />
                <Text style={styles.metaChipText}>{book.lessons.length} lessons</Text>
              </View>
              <View style={styles.metaChip}>
                <Feather name="zap" size={11} color="rgba(255,255,255,0.8)" />
                <Text style={styles.metaChipText}>+{book.xpReward} XP</Text>
              </View>
              <View style={styles.metaChip}>
                <Feather name="clock" size={11} color="rgba(255,255,255,0.8)" />
                <Text style={styles.metaChipText}>{book.readTime} min</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Overall progress */}
        <View style={styles.progressSection}>
          <View style={styles.progressLabelRow}>
            <Text style={styles.progressLabel}>
              {isBookComplete ? "✓ Complete!" : `${completedCount} / ${totalTopics} topics`}
            </Text>
            <Text style={styles.progressPct}>{Math.round(bookProgress * 100)}%</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${bookProgress * 100}%` as any }]} />
          </View>
        </View>
      </LinearGradient>

      {/* Continue / Start CTA */}
      {!isBookComplete && nextTopic && (
        <Pressable
          onPress={() => handleStartTopic(nextTopic.lessonId, nextTopic.topicId)}
          style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}
        >
          <LinearGradient
            colors={[book.gradientFrom, book.gradientTo]}
            style={styles.ctaBar}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Feather name="play" size={16} color="#fff" />
            <Text style={styles.ctaText}>
              {completedCount === 0 ? "Start Learning" : "Continue"}
            </Text>
            <Feather name="arrow-right" size={16} color="#fff" />
          </LinearGradient>
        </Pressable>
      )}

      {isBookComplete && (
        <View style={[styles.completeBanner, { backgroundColor: colors.success + "22", borderColor: colors.success }]}>
          <Feather name="award" size={18} color={colors.success} />
          <Text style={[styles.completeBannerText, { color: colors.success }]}>
            Book Complete — All lessons mastered!
          </Text>
        </View>
      )}

      {/* Lessons list */}
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: bottomPad + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Lessons</Text>

        {book.lessons.map((lesson, li) => {
          const lessonTopicsCompleted = lesson.topics.filter((t) =>
            completedTopicIds.includes(t.id)
          ).length;
          const lessonComplete = completedLessonIds.includes(lesson.id);
          const lessonProgress = lessonTopicsCompleted / lesson.topics.length;
          const isLocked =
            li > 0 &&
            !completedLessonIds.includes(book.lessons[li - 1].id) &&
            completedCount === 0;

          return (
            <View
              key={lesson.id}
              style={[
                styles.lessonCard,
                { backgroundColor: colors.card, borderColor: colors.border },
                lessonComplete && { borderColor: colors.success + "66" },
              ]}
            >
              {/* Lesson header */}
              <View style={styles.lessonHeader}>
                <LinearGradient
                  colors={
                    lessonComplete
                      ? [colors.success, "#16A34A"]
                      : [book.gradientFrom, book.gradientTo]
                  }
                  style={styles.lessonNum}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  {lessonComplete ? (
                    <Feather name="check" size={14} color="#fff" />
                  ) : (
                    <Text style={styles.lessonNumText}>{li + 1}</Text>
                  )}
                </LinearGradient>
                <View style={styles.lessonTitleBlock}>
                  <Text style={[styles.lessonTitle, { color: colors.foreground }]}>
                    {lesson.title}
                  </Text>
                  <Text style={[styles.lessonMeta, { color: colors.mutedForeground }]}>
                    {lesson.topics.length} topics · {lessonTopicsCompleted}/{lesson.topics.length} done
                  </Text>
                </View>
                {lessonComplete && (
                  <View style={[styles.completeChip, { backgroundColor: colors.success + "22" }]}>
                    <Text style={[styles.completeChipText, { color: colors.success }]}>Done</Text>
                  </View>
                )}
              </View>

              {/* Lesson progress bar */}
              <View style={[styles.lessonProgressTrack, { backgroundColor: colors.secondary }]}>
                <LinearGradient
                  colors={lessonComplete ? [colors.success, "#16A34A"] : [book.gradientFrom, book.gradientTo]}
                  style={[styles.lessonProgressFill, { width: `${lessonProgress * 100}%` as any }]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                />
              </View>

              {/* Topics */}
              <View style={styles.topics}>
                {lesson.topics.map((topic, ti) => {
                  const done = completedTopicIds.includes(topic.id);
                  const isNext =
                    !done &&
                    lesson.topics.slice(0, ti).every((t) => completedTopicIds.includes(t.id));

                  return (
                    <Pressable
                      key={topic.id}
                      onPress={() => handleStartTopic(lesson.id, topic.id)}
                      style={({ pressed }) => [
                        styles.topicRow,
                        {
                          backgroundColor: done
                            ? colors.success + "11"
                            : isNext
                            ? book.gradientFrom + "18"
                            : colors.background,
                          borderColor: done
                            ? colors.success + "44"
                            : isNext
                            ? book.gradientFrom + "55"
                            : colors.border,
                          opacity: pressed ? 0.8 : 1,
                        },
                      ]}
                    >
                      <View
                        style={[
                          styles.topicIcon,
                          {
                            backgroundColor: done
                              ? colors.success
                              : isNext
                              ? book.gradientFrom
                              : colors.border,
                          },
                        ]}
                      >
                        {done ? (
                          <Feather name="check" size={11} color="#fff" />
                        ) : (
                          <Text style={styles.topicNumText}>{ti + 1}</Text>
                        )}
                      </View>
                      <View style={styles.topicInfo}>
                        <Text
                          style={[
                            styles.topicTitle,
                            {
                              color: done
                                ? colors.success
                                : isNext
                                ? colors.foreground
                                : colors.mutedForeground,
                              fontWeight: isNext ? "700" : "500",
                            },
                          ]}
                          numberOfLines={1}
                        >
                          {topic.title}
                        </Text>
                        <Text style={[styles.topicSub, { color: colors.mutedForeground }]}>
                          {done ? "Completed ✓" : isNext ? "Up next" : "Topic"}
                          {" · +10 XP"}
                        </Text>
                      </View>
                      <Feather
                        name={done ? "check-circle" : "chevron-right"}
                        size={16}
                        color={done ? colors.success : colors.border}
                      />
                    </Pressable>
                  );
                })}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  bookHeader: {
    paddingHorizontal: 16,
    paddingBottom: 18,
    gap: 14,
  },
  bookHeaderTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  saveBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  bookInfo: {
    flexDirection: "row",
    gap: 14,
    alignItems: "flex-start",
  },
  cover: {
    width: 64,
    height: 90,
    borderRadius: 8,
    resizeMode: "cover",
  },
  bookText: { flex: 1, gap: 3 },
  bookCategory: {
    fontSize: 10,
    fontWeight: "700",
    color: "rgba(255,255,255,0.7)",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  bookTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#fff",
    letterSpacing: -0.5,
    lineHeight: 25,
  },
  bookAuthor: {
    fontSize: 13,
    color: "rgba(255,255,255,0.75)",
  },
  bookMeta: {
    flexDirection: "row",
    gap: 6,
    marginTop: 4,
    flexWrap: "wrap",
  },
  metaChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  metaChipText: {
    fontSize: 10,
    fontWeight: "600",
    color: "rgba(255,255,255,0.9)",
  },
  progressSection: { gap: 6 },
  progressLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "rgba(255,255,255,0.85)",
  },
  progressPct: {
    fontSize: 12,
    fontWeight: "700",
    color: "#fff",
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.25)",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
    backgroundColor: "#fff",
  },
  ctaBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 14,
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 16,
  },
  ctaText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: -0.2,
  },
  completeBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginHorizontal: 16,
    marginTop: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
  },
  completeBannerText: {
    fontSize: 14,
    fontWeight: "700",
  },
  scroll: { padding: 16, gap: 14 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.4,
    marginBottom: 2,
  },
  lessonCard: {
    borderRadius: 18,
    borderWidth: 1,
    overflow: "hidden",
  },
  lessonHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    paddingBottom: 10,
  },
  lessonNum: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  lessonNumText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#fff",
  },
  lessonTitleBlock: { flex: 1 },
  lessonTitle: {
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: -0.2,
  },
  lessonMeta: {
    fontSize: 11,
    fontWeight: "500",
    marginTop: 1,
  },
  completeChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  completeChipText: {
    fontSize: 11,
    fontWeight: "700",
  },
  lessonProgressTrack: {
    height: 3,
    marginHorizontal: 16,
    borderRadius: 2,
    overflow: "hidden",
  },
  lessonProgressFill: {
    height: "100%",
    borderRadius: 2,
  },
  topics: { gap: 1, padding: 10, paddingTop: 8 },
  topicRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 4,
  },
  topicIcon: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  topicNumText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#fff",
  },
  topicInfo: { flex: 1 },
  topicTitle: {
    fontSize: 13,
    lineHeight: 18,
  },
  topicSub: {
    fontSize: 11,
    marginTop: 1,
  },
});
