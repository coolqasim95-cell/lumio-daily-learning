import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
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

function BookGradientCard({
  bookId,
  compact = false,
}: {
  bookId: string;
  compact?: boolean;
}) {
  const allBooks = useAllBooks();
  const book = allBooks.find((b) => b.id === bookId);
  const colors = useColors();
  if (!book) return null;

  if (compact) {
    return (
      <Pressable
        onPress={() => router.push(`/reader/${book.id}`)}
        style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}
      >
        <LinearGradient
          colors={[book.gradientFrom, book.gradientTo]}
          style={styles.compactCover}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Image source={book.cover} style={styles.compactCoverImg} />
        </LinearGradient>
        <Text
          style={[styles.compactTitle, { color: colors.foreground }]}
          numberOfLines={2}
        >
          {book.title}
        </Text>
        <Text style={[styles.compactAuthor, { color: colors.mutedForeground }]}>
          {book.author}
        </Text>
      </Pressable>
    );
  }
  return null;
}

function useAllBooks() {
  const { customBooks } = useApp();
  return [...BOOKS, ...customBooks];
}

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const {
    ideasReadToday,
    dailyGoal,
    streak,
    xp,
    level,
    inProgressBookId,
    completedBookIds,
    completedTopicIds,
    customBooks,
  } = useApp();

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const allBooks = [...BOOKS, ...customBooks];
  const inProgressBook = inProgressBookId
    ? allBooks.find((b) => b.id === inProgressBookId)
    : null;
  const featuredBooks = allBooks.slice(0, 6);
  const dailyPick = allBooks[0];
  const progress = Math.min(ideasReadToday / dailyGoal, 1);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPad + 10 }]}>
        <View>
          <Text style={[styles.greeting, { color: colors.mutedForeground }]}>
            Good day 👋
          </Text>
          <Text style={[styles.appName, { color: colors.foreground }]}>
            lumio
          </Text>
        </View>
        <View style={styles.headerRight}>
          {streak > 0 && (
            <View style={[styles.streakBadge, { backgroundColor: "#FFF3E0" }]}>
              <Text style={styles.streakFire}>🔥</Text>
              <Text style={styles.streakNum}>{streak}</Text>
            </View>
          )}
          <Pressable
            onPress={() => router.push("/(tabs)/progress")}
            style={[styles.xpBadge, { backgroundColor: colors.secondary }]}
          >
            <Feather name="zap" size={13} color={colors.primary} />
            <Text style={[styles.xpText, { color: colors.foreground }]}>
              {xp} XP
            </Text>
          </Pressable>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: Platform.OS === "web" ? 90 : insets.bottom + 85 },
        ]}
      >
        {/* Daily Goal Card */}
        <LinearGradient
          colors={[colors.navy, "#1E1E40"]}
          style={styles.goalCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.goalTop}>
            <View>
              <Text style={styles.goalLabel}>Daily Goal</Text>
              <Text style={styles.goalCount}>
                <Text style={{ color: colors.primary, fontSize: 28 }}>
                  {ideasReadToday}
                </Text>
                <Text style={{ fontSize: 18 }}>/{dailyGoal}</Text>{" "}
                <Text style={{ fontSize: 14 }}>ideas</Text>
              </Text>
            </View>
            <View style={styles.goalRight}>
              <Text style={styles.levelBadge}>LV.{level}</Text>
              {ideasReadToday >= dailyGoal && (
                <Text style={styles.goalDone}>✓ Done!</Text>
              )}
            </View>
          </View>
          <View style={styles.goalTrack}>
            <View
              style={[
                styles.goalFill,
                {
                  width: `${progress * 100}%` as any,
                  backgroundColor:
                    progress >= 1 ? colors.success : colors.primary,
                },
              ]}
            />
          </View>
        </LinearGradient>

        {/* Continue Reading */}
        {inProgressBook && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
              Continue Reading
            </Text>
            <Pressable
              onPress={() => router.push(`/reader/${inProgressBook.id}`)}
              style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}
            >
              <LinearGradient
                colors={[inProgressBook.gradientFrom, inProgressBook.gradientTo]}
                style={styles.continueCard}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Image
                  source={inProgressBook.cover}
                  style={styles.continueCover}
                />
                <View style={styles.continueInfo}>
                  <Text style={styles.continueCategory}>
                    {inProgressBook.category}
                  </Text>
                  <Text style={styles.continueTitle} numberOfLines={2}>
                    {inProgressBook.title}
                  </Text>
                  <Text style={styles.continueAuthor}>
                    {inProgressBook.author}
                  </Text>
                  <View style={styles.continueProgressRow}>
                    <View style={styles.continueTrack}>
                      <View
                        style={[
                          styles.continueFill,
                          {
                            width: `${Math.round(
                              (inProgressBook.lessons
                                .flatMap((l) => l.topics)
                                .filter((t) => completedTopicIds.includes(t.id)).length /
                                getTopicCount(inProgressBook)) *
                                100
                            )}%` as any,
                          },
                        ]}
                      />
                    </View>
                    <Text style={styles.continuePercent}>
                      {inProgressBook.lessons
                        .flatMap((l) => l.topics)
                        .filter((t) => completedTopicIds.includes(t.id)).length}/
                      {getTopicCount(inProgressBook)}
                    </Text>
                  </View>
                </View>
                <View style={styles.continueArrow}>
                  <Feather name="arrow-right" size={18} color="rgba(255,255,255,0.8)" />
                </View>
              </LinearGradient>
            </Pressable>
          </View>
        )}

        {/* Today's Pick */}
        {!inProgressBook && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
              Today's Pick
            </Text>
            <Pressable
              onPress={() => router.push(`/reader/${dailyPick.id}`)}
              style={({ pressed }) => [{ opacity: pressed ? 0.92 : 1 }]}
            >
              <LinearGradient
                colors={[dailyPick.gradientFrom, dailyPick.gradientTo]}
                style={styles.featuredCard}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.featuredInfo}>
                  <View
                    style={[
                      styles.catPill,
                      { backgroundColor: "rgba(255,255,255,0.2)" },
                    ]}
                  >
                    <Text style={styles.catPillText}>{dailyPick.category}</Text>
                  </View>
                  <Text style={styles.featuredTitle}>{dailyPick.title}</Text>
                  <Text style={styles.featuredAuthor}>{dailyPick.author}</Text>
                  <Text style={styles.featuredDesc} numberOfLines={2}>
                    {dailyPick.description}
                  </Text>
                  <View style={styles.featuredMeta}>
                    <View style={styles.metaItem}>
                      <Feather name="layers" size={12} color="rgba(255,255,255,0.7)" />
                      <Text style={styles.metaText}>
                        {dailyPick.lessons.length} lessons
                      </Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Feather name="star" size={12} color="rgba(255,255,255,0.7)" />
                      <Text style={styles.metaText}>
                        +{dailyPick.xpReward} XP
                      </Text>
                    </View>
                  </View>
                </View>
                <Image source={dailyPick.cover} style={styles.featuredCover} />
              </LinearGradient>
            </Pressable>
          </View>
        )}

        {/* Quick Picks */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
              Your Library
            </Text>
            <Pressable onPress={() => router.push("/(tabs)/explore")}>
              <Text style={[styles.seeAll, { color: colors.primary }]}>
                Browse all →
              </Text>
            </Pressable>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickRow}
          >
            {allBooks.map((book) => {
              const isCompleted = completedBookIds.includes(book.id);
              return (
                <Pressable
                  key={book.id}
                  onPress={() => router.push(`/reader/${book.id}`)}
                  style={({ pressed }) => [
                    styles.quickCard,
                    { opacity: pressed ? 0.85 : 1 },
                  ]}
                >
                  <LinearGradient
                    colors={[book.gradientFrom, book.gradientTo]}
                    style={styles.quickCoverGrad}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Image source={book.cover} style={styles.quickCoverImg} />
                    {isCompleted && (
                      <View style={styles.completedOverlay}>
                        <Feather name="check" size={14} color="#fff" />
                      </View>
                    )}
                  </LinearGradient>
                  <Text
                    style={[
                      styles.quickTitle,
                      { color: colors.foreground },
                    ]}
                    numberOfLines={2}
                  >
                    {book.title}
                  </Text>
                  <Text
                    style={[styles.quickAuthor, { color: colors.mutedForeground }]}
                    numberOfLines={1}
                  >
                    {book.author}
                  </Text>
                </Pressable>
              );
            })}
            {/* Add book tile */}
            <Pressable
              onPress={() => router.push("/add-book")}
              style={({ pressed }) => [
                styles.quickCard,
                { opacity: pressed ? 0.85 : 1 },
              ]}
            >
              <View
                style={[
                  styles.quickCoverGrad,
                  {
                    backgroundColor: colors.secondary,
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 1.5,
                    borderColor: colors.border,
                    borderStyle: "dashed",
                  },
                ]}
              >
                <Feather name="plus" size={28} color={colors.mutedForeground} />
              </View>
              <Text
                style={[styles.quickTitle, { color: colors.mutedForeground }]}
              >
                Add Book
              </Text>
            </Pressable>
          </ScrollView>
        </View>

        {/* Recent books list */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Recently Added
          </Text>
          {allBooks.slice(0, 4).map((book) => {
            const isCompleted = completedBookIds.includes(book.id);
            return (
              <Pressable
                key={book.id}
                onPress={() => router.push(`/reader/${book.id}`)}
                style={({ pressed }) => [
                  styles.listCard,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    opacity: pressed ? 0.88 : 1,
                  },
                ]}
              >
                <LinearGradient
                  colors={[book.gradientFrom, book.gradientTo]}
                  style={styles.listCoverGrad}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Image
                    source={book.cover}
                    style={styles.listCoverImg}
                  />
                </LinearGradient>
                <View style={styles.listInfo}>
                  <View style={styles.listTop}>
                    <View
                      style={[
                        styles.listCat,
                        { backgroundColor: colors.secondary },
                      ]}
                    >
                      <Text
                        style={[
                          styles.listCatText,
                          { color: colors.mutedForeground },
                        ]}
                      >
                        {book.category}
                      </Text>
                    </View>
                    {isCompleted && (
                      <View
                        style={[
                          styles.doneTag,
                          { backgroundColor: colors.success },
                        ]}
                      >
                        <Feather name="check" size={10} color="#fff" />
                        <Text style={styles.doneTagText}>Done</Text>
                      </View>
                    )}
                  </View>
                  <Text
                    style={[styles.listTitle, { color: colors.foreground }]}
                    numberOfLines={1}
                  >
                    {book.title}
                  </Text>
                  <Text
                    style={[
                      styles.listAuthor,
                      { color: colors.mutedForeground },
                    ]}
                  >
                    {book.author}
                  </Text>
                  <View style={styles.listMeta}>
                    <Feather
                      name="layers"
                      size={11}
                      color={colors.primary}
                    />
                    <Text
                      style={[
                        styles.listMetaText,
                        { color: colors.mutedForeground },
                      ]}
                    >
                      {book.lessons.length} lessons · +{book.xpReward} XP
                    </Text>
                  </View>
                </View>
                <Feather
                  name="chevron-right"
                  size={18}
                  color={colors.mutedForeground}
                />
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
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
  greeting: { fontSize: 13, fontWeight: "500" },
  appName: {
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: -1,
    marginTop: 1,
  },
  headerRight: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  streakBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  streakFire: { fontSize: 14 },
  streakNum: {
    fontSize: 13,
    fontWeight: "800",
    color: "#F5A623",
  },
  xpBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  xpText: { fontSize: 12, fontWeight: "700" },
  scroll: { paddingHorizontal: 20 },
  goalCard: {
    borderRadius: 20,
    padding: 18,
    marginBottom: 22,
    gap: 12,
  },
  goalTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  goalLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "rgba(255,255,255,0.55)",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 2,
  },
  goalCount: {
    fontSize: 24,
    fontWeight: "800",
    color: "#fff",
  },
  goalRight: { alignItems: "flex-end", gap: 4 },
  levelBadge: {
    fontSize: 12,
    fontWeight: "800",
    color: "rgba(255,255,255,0.6)",
  },
  goalDone: {
    fontSize: 12,
    fontWeight: "700",
    color: "#22C55E",
  },
  goalTrack: {
    height: 6,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 3,
    overflow: "hidden",
  },
  goalFill: {
    height: "100%",
    borderRadius: 3,
  },
  section: { marginBottom: 24 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  seeAll: { fontSize: 13, fontWeight: "600" },
  continueCard: {
    borderRadius: 18,
    flexDirection: "row",
    padding: 14,
    alignItems: "center",
    gap: 12,
  },
  continueCover: {
    width: 56,
    height: 75,
    borderRadius: 8,
    resizeMode: "cover",
  },
  continueInfo: { flex: 1, gap: 3 },
  continueCategory: {
    fontSize: 9,
    fontWeight: "800",
    color: "rgba(255,255,255,0.6)",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  continueTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#fff",
    lineHeight: 20,
  },
  continueAuthor: {
    fontSize: 11,
    color: "rgba(255,255,255,0.6)",
  },
  continueProgressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 4,
  },
  continueTrack: {
    flex: 1,
    height: 3,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 2,
    overflow: "hidden",
  },
  continueFill: {
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 2,
  },
  continuePercent: {
    fontSize: 10,
    color: "rgba(255,255,255,0.6)",
  },
  continueArrow: { paddingLeft: 4 },
  featuredCard: {
    borderRadius: 20,
    flexDirection: "row",
    padding: 20,
    gap: 16,
    alignItems: "flex-start",
  },
  featuredInfo: { flex: 1, gap: 6 },
  catPill: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 2,
  },
  catPillText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#fff",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  featuredTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#fff",
    lineHeight: 26,
    letterSpacing: -0.5,
  },
  featuredAuthor: {
    fontSize: 13,
    color: "rgba(255,255,255,0.65)",
    fontWeight: "500",
  },
  featuredDesc: {
    fontSize: 12,
    color: "rgba(255,255,255,0.55)",
    lineHeight: 17,
  },
  featuredMeta: { flexDirection: "row", gap: 12, marginTop: 4 },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: 11,
    color: "rgba(255,255,255,0.65)",
    fontWeight: "500",
  },
  featuredCover: {
    width: 90,
    height: 120,
    borderRadius: 10,
    resizeMode: "cover",
  },
  quickRow: { gap: 14, paddingRight: 4 },
  quickCard: { width: 110 },
  quickCoverGrad: {
    width: 110,
    height: 145,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 8,
    position: "relative",
  },
  quickCoverImg: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    opacity: 0.85,
  },
  completedOverlay: {
    position: "absolute",
    bottom: 8,
    right: 8,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#22C55E",
    alignItems: "center",
    justifyContent: "center",
  },
  quickTitle: {
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 15,
    marginBottom: 2,
  },
  quickAuthor: { fontSize: 10, fontWeight: "400" },
  listCard: {
    flexDirection: "row",
    borderRadius: 14,
    borderWidth: 1,
    overflow: "hidden",
    marginBottom: 10,
    alignItems: "center",
    paddingRight: 12,
  },
  listCoverGrad: {
    width: 70,
    height: 90,
    flexShrink: 0,
  },
  listCoverImg: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    opacity: 0.85,
  },
  listInfo: { flex: 1, paddingHorizontal: 12, paddingVertical: 10, gap: 3 },
  listTop: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 2 },
  listCat: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 20,
  },
  listCatText: {
    fontSize: 9,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  doneTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 20,
  },
  doneTagText: {
    fontSize: 9,
    fontWeight: "700",
    color: "#fff",
  },
  listTitle: {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 18,
  },
  listAuthor: { fontSize: 11, fontWeight: "400" },
  listMeta: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2 },
  listMetaText: { fontSize: 11 },
  compactCover: {
    width: "100%",
    height: 130,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 8,
  },
  compactCoverImg: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    opacity: 0.85,
  },
  compactTitle: {
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 15,
    marginBottom: 2,
  },
  compactAuthor: { fontSize: 10 },
});
