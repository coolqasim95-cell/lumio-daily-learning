import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { IdeaCard } from "@/components/IdeaCard";
import { useApp } from "@/context/AppContext";
import { BOOKS } from "@/data/content";
import { useColors } from "@/hooks/useColors";

export default function SavedScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { savedBookIds } = useApp();

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const savedBooks = BOOKS.filter((b) => savedBookIds.includes(b.id));

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.header,
          { paddingTop: topPad + 12, backgroundColor: colors.background },
        ]}
      >
        <Text style={[styles.title, { color: colors.foreground }]}>
          Saved
        </Text>
        <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
          {savedBooks.length} {savedBooks.length === 1 ? "book" : "books"} saved
        </Text>
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
        {savedBooks.length === 0 ? (
          <View style={styles.empty}>
            <View
              style={[
                styles.emptyIcon,
                { backgroundColor: colors.secondary },
              ]}
            >
              <Feather name="bookmark" size={32} color={colors.mutedForeground} />
            </View>
            <Text style={[styles.emptyTitle, { color: colors.foreground }]}>
              No saved books yet
            </Text>
            <Text
              style={[styles.emptyText, { color: colors.mutedForeground }]}
            >
              Bookmark books from the home feed or explore page to save them
              here.
            </Text>
            <Pressable
              onPress={() => router.push("/(tabs)/explore")}
              style={[styles.exploreBtn, { backgroundColor: colors.primary }]}
            >
              <Text style={styles.exploreBtnText}>Browse Books</Text>
            </Pressable>
          </View>
        ) : (
          savedBooks.map((book) => <IdeaCard key={book.id} book={book} />)
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 14,
    gap: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "500",
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 4,
  },
  empty: {
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 20,
    gap: 12,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  emptyText: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  exploreBtn: {
    paddingHorizontal: 24,
    paddingVertical: 13,
    borderRadius: 14,
    marginTop: 8,
  },
  exploreBtnText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#fff",
  },
});
