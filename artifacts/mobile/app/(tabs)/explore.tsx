import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useApp } from "@/context/AppContext";
import { BOOKS, CATEGORIES } from "@/data/content";
import { useColors } from "@/hooks/useColors";

export default function ExploreScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { completedBookIds, savedBookIds, toggleSaveBook, customBooks } = useApp();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const allBooks = [...BOOKS, ...customBooks];

  const filtered = allBooks.filter((book) => {
    const matchCat =
      selectedCategory === "All" || book.category === selectedCategory;
    const matchQ =
      !query ||
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPad + 12 }]}>
        <Text style={[styles.title, { color: colors.foreground }]}>Explore</Text>
        <View
          style={[
            styles.searchBox,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Feather name="search" size={16} color={colors.mutedForeground} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search books or authors..."
            placeholderTextColor={colors.mutedForeground}
            style={[styles.searchInput, { color: colors.foreground }]}
          />
          {query.length > 0 && (
            <Pressable onPress={() => setQuery("")}>
              <Feather name="x" size={16} color={colors.mutedForeground} />
            </Pressable>
          )}
        </View>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.catRow}
      >
        {CATEGORIES.map((cat) => (
          <Pressable
            key={cat}
            onPress={() => setSelectedCategory(cat)}
            style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
          >
            {selectedCategory === cat ? (
              <LinearGradient
                colors={["#F5A623", "#EF4444"]}
                style={styles.catActive}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.catActiveText}>{cat}</Text>
              </LinearGradient>
            ) : (
              <View
                style={[
                  styles.catInactive,
                  { backgroundColor: colors.secondary, borderColor: colors.border },
                ]}
              >
                <Text style={[styles.catInactiveText, { color: colors.mutedForeground }]}>
                  {cat}
                </Text>
              </View>
            )}
          </Pressable>
        ))}
        <Pressable
          onPress={() => router.push("/add-book")}
          style={[
            styles.catInactive,
            {
              backgroundColor: "transparent",
              borderColor: colors.primary,
              borderStyle: "dashed",
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
            },
          ]}
        >
          <Feather name="plus" size={13} color={colors.primary} />
          <Text style={[styles.catInactiveText, { color: colors.primary }]}>
            Add Book
          </Text>
        </Pressable>
      </ScrollView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.bookList,
          { paddingBottom: Platform.OS === "web" ? 90 : insets.bottom + 85 },
        ]}
      >
        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <Feather name="search" size={40} color={colors.mutedForeground} />
            <Text style={[styles.emptyTitle, { color: colors.foreground }]}>
              No results
            </Text>
            <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
              Try a different search or category
            </Text>
          </View>
        ) : (
          filtered.map((book) => {
            const isCompleted = completedBookIds.includes(book.id);
            const isSaved = savedBookIds.includes(book.id);

            return (
              <Pressable
                key={book.id}
                onPress={() => router.push(`/reader/${book.id}`)}
                style={({ pressed }) => [
                  styles.bookCard,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    opacity: pressed ? 0.88 : 1,
                  },
                ]}
              >
                <LinearGradient
                  colors={[book.gradientFrom, book.gradientTo]}
                  style={styles.bookCoverGrad}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Image
                    source={book.cover}
                    style={styles.bookCoverImg}
                  />
                </LinearGradient>
                <View style={styles.bookInfo}>
                  <View style={styles.bookTop}>
                    <View
                      style={[
                        styles.bookCat,
                        { backgroundColor: colors.secondary },
                      ]}
                    >
                      <Text
                        style={[styles.bookCatText, { color: colors.mutedForeground }]}
                      >
                        {book.category}
                      </Text>
                    </View>
                    {isCompleted && (
                      <View style={[styles.doneBadge, { backgroundColor: colors.success }]}>
                        <Feather name="check" size={9} color="#fff" />
                        <Text style={styles.doneBadgeText}>Done</Text>
                      </View>
                    )}
                  </View>
                  <Text
                    style={[styles.bookTitle, { color: colors.foreground }]}
                    numberOfLines={2}
                  >
                    {book.title}
                  </Text>
                  <Text
                    style={[styles.bookAuthor, { color: colors.mutedForeground }]}
                    numberOfLines={1}
                  >
                    {book.author}
                  </Text>
                  <Text
                    style={[styles.bookDesc, { color: colors.mutedForeground }]}
                    numberOfLines={2}
                  >
                    {book.description}
                  </Text>
                  <View style={styles.bookFooter}>
                    <View style={styles.bookMeta}>
                      <Feather name="zap" size={11} color={colors.primary} />
                      <Text
                        style={[styles.bookMetaText, { color: colors.mutedForeground }]}
                      >
                        {book.lessons.length} lessons · +{book.xpReward} XP
                      </Text>
                    </View>
                    <Pressable
                      onPress={(e) => {
                        e.stopPropagation();
                        toggleSaveBook(book.id);
                      }}
                      hitSlop={8}
                    >
                      <Feather
                        name="bookmark"
                        size={17}
                        color={isSaved ? colors.primary : colors.mutedForeground}
                      />
                    </Pressable>
                  </View>
                </View>
              </Pressable>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    gap: 12,
  },
  title: { fontSize: 28, fontWeight: "800", letterSpacing: -0.5 },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  searchInput: { flex: 1, fontSize: 15, padding: 0 },
  catRow: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    gap: 8,
  },
  catActive: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  catActiveText: { fontSize: 13, fontWeight: "700", color: "#fff" },
  catInactive: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },
  catInactiveText: { fontSize: 13, fontWeight: "600" },
  bookList: { paddingHorizontal: 16, paddingTop: 4, gap: 10 },
  bookCard: {
    flexDirection: "row",
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
    alignItems: "center",
    paddingRight: 14,
  },
  bookCoverGrad: { width: 76, height: 100, flexShrink: 0 },
  bookCoverImg: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    opacity: 0.85,
  },
  bookInfo: { flex: 1, paddingHorizontal: 12, paddingVertical: 10, gap: 3 },
  bookTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 2,
  },
  bookCat: { paddingHorizontal: 7, paddingVertical: 3, borderRadius: 20 },
  bookCatText: {
    fontSize: 9,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  doneBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 20,
  },
  doneBadgeText: { fontSize: 9, fontWeight: "700", color: "#fff" },
  bookTitle: { fontSize: 15, fontWeight: "800", lineHeight: 19 },
  bookAuthor: { fontSize: 12, fontWeight: "400" },
  bookDesc: { fontSize: 11, lineHeight: 15, marginTop: 1 },
  bookFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  bookMeta: { flexDirection: "row", alignItems: "center", gap: 4 },
  bookMetaText: { fontSize: 11 },
  empty: {
    alignItems: "center",
    paddingTop: 60,
    gap: 10,
  },
  emptyTitle: { fontSize: 18, fontWeight: "700" },
  emptyText: { fontSize: 14, textAlign: "center" },
});
