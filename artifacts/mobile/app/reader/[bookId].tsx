import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useApp } from "@/context/AppContext";
import { BOOKS, Idea } from "@/data/content";
import { useColors } from "@/hooks/useColors";

const { width: W } = Dimensions.get("window");

export default function ReaderScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { bookId } = useLocalSearchParams<{ bookId: string }>();
  const { markIdeaRead, addXP, completeBook, setInProgress, customBooks } = useApp();

  const allBooks = [...BOOKS, ...customBooks];
  const book = allBooks.find((b) => b.id === bookId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const flatListRef = useRef<FlatList>(null);
  const hintOpacity = useRef(new Animated.Value(1)).current;
  const btnScale = useRef(new Animated.Value(1)).current;

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        const idx = viewableItems[0].index;
        setCurrentIndex(idx);
        setInProgress(bookId ?? "", idx);
        if (idx > 0 && showSwipeHint) {
          setShowSwipeHint(false);
          Animated.timing(hintOpacity, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }).start();
        }
      }
    },
    [bookId, setInProgress, showSwipeHint, hintOpacity]
  );

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 });

  function animateButton() {
    Animated.sequence([
      Animated.timing(btnScale, { toValue: 0.93, duration: 80, useNativeDriver: true }),
      Animated.timing(btnScale, { toValue: 1, duration: 120, useNativeDriver: true }),
    ]).start();
  }

  async function handleNext() {
    if (!book) return;
    animateButton();
    await markIdeaRead();
    await addXP(10);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    if (currentIndex < book.ideas.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      await completeBook(bookId ?? "");
      await addXP(book.xpReward);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      if (book.quizzes.length > 0) {
        router.replace(`/quiz/${bookId}`);
      } else {
        router.replace("/");
      }
    }
  }

  if (!book) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.mutedForeground }}>Book not found</Text>
      </View>
    );
  }

  const progress = (currentIndex + 1) / book.ideas.length;
  const isLast = currentIndex === book.ideas.length - 1;

  function renderIdea({ item, index }: { item: Idea; index: number }) {
    return (
      <View style={[styles.ideaPage, { width: W }]}>
        <View
          style={[
            styles.ideaCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          {/* Idea badge */}
          <View style={styles.ideaBadgeRow}>
            <LinearGradient
              colors={[book!.gradientFrom, book!.gradientTo]}
              style={styles.ideaBadge}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.ideaBadgeText}>IDEA {index + 1}</Text>
            </LinearGradient>
            <Text style={[styles.ideaOf, { color: colors.mutedForeground }]}>
              of {book!.ideas.length}
            </Text>
          </View>

          {/* Title */}
          <Text style={[styles.ideaTitle, { color: colors.foreground }]}>
            {item.title}
          </Text>

          {/* Content */}
          <Text style={[styles.ideaContent, { color: colors.foreground }]}>
            {item.content}
          </Text>

          {/* XP hint */}
          <View style={[styles.xpRow, { backgroundColor: colors.secondary }]}>
            <Feather name="zap" size={13} color={colors.primary} />
            <Text style={[styles.xpRowText, { color: colors.primary }]}>
              +10 XP for reading this idea
            </Text>
          </View>
        </View>

        {/* Swipe hint */}
        {index === 0 && (
          <Animated.View style={[styles.swipeHint, { opacity: hintOpacity }]}>
            <Text style={[styles.swipeHintText, { color: colors.mutedForeground }]}>
              ← Swipe to navigate ideas →
            </Text>
          </Animated.View>
        )}
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <LinearGradient
        colors={[book.gradientFrom + "DD", book.gradientTo + "99"]}
        style={[styles.header, { paddingTop: topPad + 6 }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Pressable
          onPress={() => router.back()}
          style={styles.backBtn}
          hitSlop={12}
        >
          <Feather name="chevron-down" size={22} color="#fff" />
        </Pressable>

        <View style={styles.headerCenter}>
          <Image source={book.cover} style={styles.headerCover} />
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle} numberOfLines={1}>
              {book.title}
            </Text>
            <Text style={styles.headerAuthor}>{book.author}</Text>
          </View>
        </View>

        <View style={styles.headerXP}>
          <Feather name="star" size={13} color="rgba(255,255,255,0.8)" />
          <Text style={styles.headerXPText}>+{book.xpReward}</Text>
        </View>
      </LinearGradient>

      {/* Progress bar */}
      <View style={[styles.progressTrack, { backgroundColor: colors.secondary }]}>
        <LinearGradient
          colors={[book.gradientFrom, book.gradientTo]}
          style={[styles.progressFill, { width: `${progress * 100}%` as any }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      </View>

      {/* Ideas FlatList */}
      <FlatList
        ref={flatListRef}
        data={book.ideas}
        keyExtractor={(item) => item.id}
        renderItem={renderIdea}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig.current}
        style={styles.flatList}
        decelerationRate="fast"
        snapToInterval={W}
        snapToAlignment="start"
      />

      {/* Footer */}
      <View
        style={[
          styles.footer,
          {
            paddingBottom: bottomPad + 12,
            backgroundColor: colors.background,
            borderTopColor: colors.border,
          },
        ]}
      >
        {/* Dot indicators */}
        <View style={styles.dots}>
          {book.ideas.map((_, i) => (
            <Pressable
              key={i}
              onPress={() =>
                flatListRef.current?.scrollToIndex({ index: i, animated: true })
              }
            >
              <View
                style={[
                  styles.dot,
                  {
                    width: i === currentIndex ? 18 : 6,
                    backgroundColor:
                      i === currentIndex ? book.gradientFrom : colors.border,
                  },
                ]}
              />
            </Pressable>
          ))}
        </View>

        {/* Next button */}
        <Animated.View style={{ transform: [{ scale: btnScale }] }}>
          <Pressable onPress={handleNext}>
            <LinearGradient
              colors={
                isLast
                  ? [colors.success, "#16A34A"]
                  : [book.gradientFrom, book.gradientTo]
              }
              style={styles.nextBtn}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.nextBtnText}>
                {isLast ? "🎉 Finish & Quiz" : "Next Idea"}
              </Text>
              <Feather
                name={isLast ? "check-circle" : "arrow-right"}
                size={19}
                color="#fff"
              />
            </LinearGradient>
          </Pressable>
        </Animated.View>
      </View>
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
  headerCenter: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerCover: {
    width: 32,
    height: 42,
    borderRadius: 5,
    resizeMode: "cover",
  },
  headerInfo: { flex: 1 },
  headerTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#fff",
  },
  headerAuthor: {
    fontSize: 11,
    color: "rgba(255,255,255,0.7)",
    marginTop: 1,
  },
  headerXP: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  headerXPText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#fff",
  },
  progressTrack: { height: 4 },
  progressFill: { height: "100%", borderRadius: 2 },
  flatList: { flex: 1 },
  ideaPage: {
    flex: 1,
    padding: 18,
    justifyContent: "center",
  },
  ideaCard: {
    borderRadius: 22,
    borderWidth: 1,
    padding: 24,
    gap: 16,
  },
  ideaBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  ideaBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  ideaBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 1.2,
  },
  ideaOf: { fontSize: 12, fontWeight: "500" },
  ideaTitle: {
    fontSize: 26,
    fontWeight: "900",
    lineHeight: 32,
    letterSpacing: -0.7,
  },
  ideaContent: {
    fontSize: 16,
    lineHeight: 26,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    letterSpacing: 0.1,
  },
  xpRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  xpRowText: {
    fontSize: 12,
    fontWeight: "700",
  },
  swipeHint: {
    alignItems: "center",
    marginTop: 16,
  },
  swipeHintText: {
    fontSize: 12,
    fontWeight: "500",
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    gap: 12,
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  dot: { height: 6, borderRadius: 3 },
  nextBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 17,
    borderRadius: 18,
  },
  nextBtnText: {
    fontSize: 17,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: -0.3,
  },
});
