import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useApp } from "@/context/AppContext";
import { Book } from "@/data/content";
import { useColors } from "@/hooks/useColors";

interface IdeaCardProps {
  book: Book;
  compact?: boolean;
}

export function IdeaCard({ book, compact = false }: IdeaCardProps) {
  const colors = useColors();
  const { savedBookIds, completedBookIds, toggleSaveBook } = useApp();
  const isSaved = savedBookIds.includes(book.id);
  const isCompleted = completedBookIds.includes(book.id);

  function handlePress() {
    router.push(`/reader/${book.id}`);
  }

  function handleSave() {
    toggleSaveBook(book.id);
  }

  if (compact) {
    return (
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [
          styles.compactCard,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            opacity: pressed ? 0.85 : 1,
          },
        ]}
      >
        <Image source={book.cover} style={styles.compactCover} />
        <View style={styles.compactInfo}>
          <Text
            style={[styles.compactTitle, { color: colors.foreground }]}
            numberOfLines={2}
          >
            {book.title}
          </Text>
          <Text style={[styles.compactAuthor, { color: colors.mutedForeground }]}>
            {book.author}
          </Text>
          <View style={styles.compactMeta}>
            <View
              style={[
                styles.categoryBadge,
                { backgroundColor: colors.secondary },
              ]}
            >
              <Text style={[styles.categoryText, { color: colors.foreground }]}>
                {book.category}
              </Text>
            </View>
            {isCompleted && (
              <View style={[styles.doneBadge, { backgroundColor: colors.success }]}>
                <Feather name="check" size={10} color="#fff" />
              </View>
            )}
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          opacity: pressed ? 0.9 : 1,
          ...(Platform.OS === "web"
            ? { boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }
            : {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.06,
                shadowRadius: 12,
                elevation: 3,
              }),
        },
      ]}
    >
      <Image source={book.cover} style={styles.cover} />
      <View style={styles.info}>
        <View style={styles.topRow}>
          <View
            style={[
              styles.categoryBadge,
              { backgroundColor: colors.secondary },
            ]}
          >
            <Text style={[styles.categoryText, { color: colors.foreground }]}>
              {book.category}
            </Text>
          </View>
          <Pressable onPress={handleSave} hitSlop={8}>
            <Feather
              name={isSaved ? "bookmark" : "bookmark"}
              size={18}
              color={isSaved ? colors.primary : colors.mutedForeground}
            />
          </Pressable>
        </View>

        <Text
          style={[styles.title, { color: colors.foreground }]}
          numberOfLines={2}
        >
          {book.title}
        </Text>
        <Text style={[styles.author, { color: colors.mutedForeground }]}>
          {book.author}
        </Text>

        <Text
          style={[styles.description, { color: colors.mutedForeground }]}
          numberOfLines={2}
        >
          {book.description}
        </Text>

        <View style={styles.footer}>
          <View style={styles.metaRow}>
            <Feather name="zap" size={12} color={colors.primary} />
            <Text style={[styles.metaText, { color: colors.mutedForeground }]}>
              {book.lessons.length} lessons · {book.readTime} min
            </Text>
          </View>
          {isCompleted && (
            <View style={[styles.completedBadge, { backgroundColor: colors.success }]}>
              <Feather name="check" size={11} color="#fff" />
              <Text style={styles.completedText}>Done</Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
    marginBottom: 12,
  },
  cover: {
    width: 90,
    height: 120,
    resizeMode: "cover",
  },
  info: {
    flex: 1,
    padding: 12,
    gap: 4,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 20,
  },
  author: {
    fontSize: 12,
    fontWeight: "500",
  },
  description: {
    fontSize: 12,
    lineHeight: 17,
    marginTop: 2,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: 11,
  },
  completedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 20,
  },
  completedText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#fff",
  },
  doneBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  compactCard: {
    width: 140,
    borderRadius: 14,
    borderWidth: 1,
    overflow: "hidden",
    marginRight: 12,
  },
  compactCover: {
    width: "100%",
    height: 100,
    resizeMode: "cover",
  },
  compactInfo: {
    padding: 10,
    gap: 3,
  },
  compactTitle: {
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 17,
  },
  compactAuthor: {
    fontSize: 11,
    fontWeight: "400",
  },
  compactMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
});
