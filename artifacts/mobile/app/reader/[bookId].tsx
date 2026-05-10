import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
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

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function ReaderScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { bookId } = useLocalSearchParams<{ bookId: string }>();
  const { markIdeaRead, addXP, completeBook, setInProgress } = useApp();

  const book = BOOKS.find((b) => b.id === bookId);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setCurrentIndex(viewableItems[0].index);
        setInProgress(bookId ?? "", viewableItems[0].index);
      }
    },
    [bookId, setInProgress]
  );

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 });

  async function handleNext() {
    if (!book) return;
    await markIdeaRead();
    await addXP(10);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (currentIndex < book.ideas.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      await completeBook(bookId ?? "");
      await addXP(book.xpReward);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.replace(`/quiz/${bookId}`);
    }
  }

  function handlePrev() {
    if (currentIndex > 0) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex - 1,
        animated: true,
      });
      Haptics.selectionAsync();
    }
  }

  if (!book) {
    return (
      <View
        style={[
          styles.container,
          styles.centered,
          { backgroundColor: colors.background },
        ]}
      >
        <Text style={{ color: colors.mutedForeground }}>Book not found</Text>
      </View>
    );
  }

  const progress = (currentIndex + 1) / book.ideas.length;

  function renderIdea({ item, index }: { item: Idea; index: number }) {
    return (
      <View style={[styles.ideaPage, { width: SCREEN_WIDTH }]}>
        <View
          style={[
            styles.ideaCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          {/* Idea number */}
          <View style={styles.ideaHeader}>
            <View
              style={[
                styles.ideaNumBadge,
                { backgroundColor: colors.secondary },
              ]}
            >
              <Text style={[styles.ideaNum, { color: colors.mutedForeground }]}>
                IDEA {index + 1}
              </Text>
            </View>
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
          <View
            style={[styles.xpHint, { backgroundColor: "#FFF3E0" }]}
          >
            <Feather name="zap" size={13} color="#F5A623" />
            <Text style={styles.xpHintText}>+10 XP for reading this idea</Text>
          </View>
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
            paddingTop: topPad + 8,
            backgroundColor: colors.background,
            borderBottomColor: colors.border,
          },
        ]}
      >
        <Pressable
          onPress={() => router.back()}
          style={[styles.backBtn, { backgroundColor: colors.secondary }]}
          hitSlop={8}
        >
          <Feather name="x" size={18} color={colors.foreground} />
        </Pressable>

        <View style={styles.headerCenter}>
          <Text
            style={[styles.headerTitle, { color: colors.foreground }]}
            numberOfLines={1}
          >
            {book.title}
          </Text>
          <Text style={[styles.headerSub, { color: colors.mutedForeground }]}>
            {currentIndex + 1} of {book.ideas.length} ideas
          </Text>
        </View>

        <View style={[styles.xpBadge, { backgroundColor: "#FFF3E0" }]}>
          <Feather name="star" size={13} color="#F5A623" />
          <Text style={[styles.xpBadgeText, { color: "#F5A623" }]}>
            {book.xpReward} XP
          </Text>
        </View>
      </View>

      {/* Progress bar */}
      <View style={[styles.progressTrack, { backgroundColor: colors.secondary }]}>
        <Animated.View
          style={[
            styles.progressFill,
            {
              width: `${progress * 100}%` as any,
              backgroundColor: colors.primary,
            },
          ]}
        />
      </View>

      {/* Swipeable ideas */}
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
        scrollEnabled={true}
        contentContainerStyle={styles.flatListContent}
        style={styles.flatList}
      />

      {/* Navigation */}
      <View
        style={[
          styles.footer,
          {
            paddingBottom: bottomPad + 16,
            backgroundColor: colors.background,
            borderTopColor: colors.border,
          },
        ]}
      >
        {/* Dots indicator */}
        <View style={styles.dots}>
          {book.ideas.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    i === currentIndex ? colors.primary : colors.border,
                  width: i === currentIndex ? 20 : 6,
                },
              ]}
            />
          ))}
        </View>

        <View style={styles.navRow}>
          <Pressable
            onPress={handlePrev}
            disabled={currentIndex === 0}
            style={({ pressed }) => [
              styles.prevBtn,
              {
                backgroundColor: colors.secondary,
                opacity: currentIndex === 0 ? 0.3 : pressed ? 0.7 : 1,
              },
            ]}
          >
            <Feather name="chevron-left" size={22} color={colors.foreground} />
          </Pressable>

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
            <Text style={styles.nextText}>
              {currentIndex === book.ideas.length - 1
                ? "Finish & Quiz"
                : "Next Idea"}
            </Text>
            <Feather
              name={
                currentIndex === book.ideas.length - 1
                  ? "check-circle"
                  : "chevron-right"
              }
              size={18}
              color="#fff"
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  centered: { alignItems: "center", justifyContent: "center" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 10,
    borderBottomWidth: 1,
  },
  backBtn: {
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
    fontSize: 14,
    fontWeight: "700",
  },
  headerSub: {
    fontSize: 11,
    fontWeight: "500",
  },
  xpBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  xpBadgeText: {
    fontSize: 12,
    fontWeight: "700",
  },
  progressTrack: {
    height: 4,
  },
  progressFill: {
    height: "100%",
  },
  flatList: {
    flex: 1,
  },
  flatListContent: {
    alignItems: "flex-start",
  },
  ideaPage: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  ideaCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 24,
    gap: 16,
  },
  ideaHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  ideaNumBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  ideaNum: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
  },
  ideaTitle: {
    fontSize: 24,
    fontWeight: "800",
    lineHeight: 30,
    letterSpacing: -0.5,
  },
  ideaContent: {
    fontSize: 16,
    lineHeight: 26,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
  },
  xpHint: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  xpHintText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#F5A623",
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    gap: 14,
    borderTopWidth: 1,
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  navRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  prevBtn: {
    width: 48,
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  nextBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 52,
    borderRadius: 14,
  },
  nextText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
});
