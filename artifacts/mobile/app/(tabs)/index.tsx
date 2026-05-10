import { Feather } from "@expo/vector-icons";
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

import { DailyProgress } from "@/components/DailyProgress";
import { IdeaCard } from "@/components/IdeaCard";
import { useApp } from "@/context/AppContext";
import { BOOKS } from "@/data/content";
import { useColors } from "@/hooks/useColors";

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
    inProgressIdeaIndex,
    completedBookIds,
  } = useApp();

  const topPad = Platform.OS === "web" ? 67 : insets.top;

  const inProgressBook = inProgressBookId
    ? BOOKS.find((b) => b.id === inProgressBookId)
    : null;

  const featuredBook = BOOKS[0];
  const otherBooks = BOOKS.slice(1);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Custom Header */}
      <View
        style={[
          styles.header,
          { paddingTop: topPad + 12, backgroundColor: colors.background },
        ]}
      >
        <View style={styles.headerLeft}>
          <View style={[styles.logoMark, { backgroundColor: colors.navy }]}>
            <Feather name="zap" size={14} color={colors.primary} />
          </View>
          <Text style={[styles.logoText, { color: colors.foreground }]}>
            lumio
          </Text>
        </View>
        <View style={styles.headerRight}>
          <View style={[styles.levelBadge, { backgroundColor: colors.secondary }]}>
            <Text style={[styles.levelText, { color: colors.foreground }]}>
              Lv.{level}
            </Text>
          </View>
          <Pressable
            onPress={() => router.push("/(tabs)/progress")}
            style={[styles.xpBadge, { backgroundColor: "#FFF3E0" }]}
          >
            <Feather name="star" size={13} color={colors.primary} />
            <Text style={[styles.xpText, { color: colors.primary }]}>
              {xp} XP
            </Text>
          </Pressable>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          {
            paddingBottom:
              Platform.OS === "web" ? 34 + 84 : insets.bottom + 84,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Daily Progress */}
        <View style={styles.section}>
          <DailyProgress
            current={ideasReadToday}
            goal={dailyGoal}
            streak={streak}
            xp={xp}
          />
        </View>

        {/* Continue Reading */}
        {inProgressBook && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
              Continue Reading
            </Text>
            <Pressable
              onPress={() => router.push(`/reader/${inProgressBook.id}`)}
              style={({ pressed }) => [
                styles.continueCard,
                {
                  backgroundColor: colors.navy,
                  opacity: pressed ? 0.9 : 1,
                },
              ]}
            >
              <Image
                source={inProgressBook.cover}
                style={styles.continueCover}
              />
              <View style={styles.continueInfo}>
                <Text style={styles.continueLabel}>In Progress</Text>
                <Text style={styles.continueTitle}>{inProgressBook.title}</Text>
                <Text style={styles.continueAuthor}>
                  {inProgressBook.author}
                </Text>
                <View style={styles.continueProgress}>
                  <View style={styles.continueTrack}>
                    <View
                      style={[
                        styles.continueFill,
                        {
                          width: `${Math.round(
                            ((inProgressIdeaIndex + 1) /
                              inProgressBook.ideas.length) *
                              100
                          )}%` as any,
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.continuePercent}>
                    {inProgressIdeaIndex + 1}/{inProgressBook.ideas.length}{" "}
                    ideas
                  </Text>
                </View>
              </View>
              <Feather name="arrow-right" size={20} color="rgba(255,255,255,0.6)" />
            </Pressable>
          </View>
        )}

        {/* Featured Book */}
        {!inProgressBook && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
              Featured Today
            </Text>
            <Pressable
              onPress={() => router.push(`/reader/${featuredBook.id}`)}
              style={({ pressed }) => [
                styles.featuredCard,
                {
                  backgroundColor: colors.navy,
                  opacity: pressed ? 0.9 : 1,
                },
              ]}
            >
              <View style={styles.featuredContent}>
                <View>
                  <Text style={styles.featuredCategory}>
                    {featuredBook.category}
                  </Text>
                  <Text style={styles.featuredTitle}>{featuredBook.title}</Text>
                  <Text style={styles.featuredAuthor}>
                    {featuredBook.author}
                  </Text>
                  <Text style={styles.featuredDesc}>
                    {featuredBook.description}
                  </Text>
                </View>
                <View style={styles.featuredMeta}>
                  <View style={[styles.featuredBadge, { backgroundColor: colors.primary }]}>
                    <Feather name="zap" size={13} color="#fff" />
                    <Text style={styles.featuredBadgeText}>
                      {featuredBook.ideas.length} ideas
                    </Text>
                  </View>
                  <Text style={styles.featuredTime}>
                    {featuredBook.readTime} min read
                  </Text>
                </View>
              </View>
              <Image source={featuredBook.cover} style={styles.featuredCover} />
            </Pressable>
          </View>
        )}

        {/* Horizontal quick picks */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
              Ideas for You
            </Text>
            <Pressable onPress={() => router.push("/(tabs)/explore")}>
              <Text style={[styles.seeAll, { color: colors.primary }]}>
                See all
              </Text>
            </Pressable>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontal}
          >
            {BOOKS.map((book) => (
              <Pressable
                key={book.id}
                onPress={() => router.push(`/reader/${book.id}`)}
                style={({ pressed }) => [
                  styles.quickCard,
                  { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.85 : 1 },
                ]}
              >
                <Image source={book.cover} style={styles.quickCover} />
                <View style={styles.quickInfo}>
                  <Text
                    style={[styles.quickTitle, { color: colors.foreground }]}
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
                  {completedBookIds.includes(book.id) && (
                    <View style={[styles.completedDot, { backgroundColor: colors.success }]}>
                      <Feather name="check" size={9} color="#fff" />
                    </View>
                  )}
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* All books list */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Your Library
          </Text>
          {otherBooks.map((book) => (
            <IdeaCard key={book.id} book={book} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 14,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logoMark: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  headerRight: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  levelBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  levelText: {
    fontSize: 12,
    fontWeight: "700",
  },
  xpBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  xpText: {
    fontSize: 12,
    fontWeight: "700",
  },
  scroll: {
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  seeAll: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 12,
  },
  continueCard: {
    flexDirection: "row",
    borderRadius: 16,
    padding: 14,
    alignItems: "center",
    gap: 12,
  },
  continueCover: {
    width: 60,
    height: 80,
    borderRadius: 8,
    resizeMode: "cover",
  },
  continueInfo: {
    flex: 1,
    gap: 3,
  },
  continueLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#F5A623",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  continueTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#fff",
  },
  continueAuthor: {
    fontSize: 12,
    color: "rgba(255,255,255,0.6)",
  },
  continueProgress: {
    marginTop: 6,
    gap: 4,
  },
  continueTrack: {
    height: 4,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 2,
    overflow: "hidden",
  },
  continueFill: {
    height: "100%",
    backgroundColor: "#F5A623",
    borderRadius: 2,
  },
  continuePercent: {
    fontSize: 10,
    color: "rgba(255,255,255,0.5)",
  },
  featuredCard: {
    flexDirection: "row",
    borderRadius: 20,
    overflow: "hidden",
    padding: 20,
    gap: 16,
    alignItems: "flex-start",
  },
  featuredContent: {
    flex: 1,
    gap: 12,
  },
  featuredCategory: {
    fontSize: 10,
    fontWeight: "700",
    color: "#F5A623",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  featuredTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#fff",
    lineHeight: 26,
    letterSpacing: -0.5,
  },
  featuredAuthor: {
    fontSize: 13,
    color: "rgba(255,255,255,0.6)",
    marginTop: 2,
  },
  featuredDesc: {
    fontSize: 13,
    color: "rgba(255,255,255,0.55)",
    lineHeight: 18,
    marginTop: 6,
  },
  featuredMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  featuredBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  featuredBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },
  featuredTime: {
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
  },
  featuredCover: {
    width: 90,
    height: 120,
    borderRadius: 10,
    resizeMode: "cover",
  },
  horizontal: {
    gap: 12,
    paddingRight: 8,
  },
  quickCard: {
    width: 120,
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  quickCover: {
    width: "100%",
    height: 80,
    resizeMode: "cover",
  },
  quickInfo: {
    padding: 8,
    gap: 2,
  },
  quickTitle: {
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 16,
  },
  quickAuthor: {
    fontSize: 10,
  },
  completedDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
});
