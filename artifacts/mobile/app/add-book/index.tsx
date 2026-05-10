import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
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
import { Book, CATEGORIES } from "@/data/content";
import { useColors } from "@/hooks/useColors";

const PALETTE = [
  { from: "#F5A623", to: "#EF4444" },
  { from: "#7C5CFC", to: "#3B82F6" },
  { from: "#10B981", to: "#3B82F6" },
  { from: "#EC4899", to: "#F97316" },
  { from: "#0EA5E9", to: "#6366F1" },
  { from: "#374151", to: "#EF4444" },
  { from: "#1E3A5F", to: "#7C3AED" },
  { from: "#6B21A8", to: "#1D4ED8" },
];

const ICON_OPTIONS = [
  "book-open",
  "zap",
  "star",
  "heart",
  "shield",
  "trending-up",
  "compass",
  "award",
];

const PLACEHOLDER_COVER = null;

export default function AddBookScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { addCustomBook } = useApp();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Custom");
  const [selectedGradient, setSelectedGradient] = useState(0);
  const [ideaTexts, setIdeaTexts] = useState(["", "", ""]);

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  function updateIdea(index: number, text: string) {
    const newIdeas = [...ideaTexts];
    newIdeas[index] = text;
    setIdeaTexts(newIdeas);
  }

  function addIdeaField() {
    setIdeaTexts((prev) => [...prev, ""]);
  }

  async function handleSave() {
    if (!title.trim()) {
      Alert.alert("Missing title", "Please enter a book title.");
      return;
    }
    if (!author.trim()) {
      Alert.alert("Missing author", "Please enter an author name.");
      return;
    }
    const validIdeas = ideaTexts.filter((t) => t.trim().length > 0);
    if (validIdeas.length === 0) {
      Alert.alert("No ideas", "Add at least one key idea from this book.");
      return;
    }

    const gradient = PALETTE[selectedGradient];
    const newBook: Book = {
      id: `custom_${Date.now()}`,
      title: title.trim(),
      author: author.trim(),
      cover: require("../../assets/images/icon.png"),
      category,
      description: description.trim() || `Key ideas from ${title.trim()}`,
      readTime: Math.max(3, validIdeas.length),
      xpReward: validIdeas.length * 10,
      tags: ["custom"],
      gradientFrom: gradient.from,
      gradientTo: gradient.to,
      isCustom: true,
      ideas: validIdeas.map((text, i) => ({
        id: `custom_idea_${Date.now()}_${i}`,
        title: `Idea ${i + 1}`,
        content: text.trim(),
      })),
      quizzes: [],
    };

    await addCustomBook(newBook);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.back();
  }

  const bookCategories = CATEGORIES.filter((c) => c !== "All");

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
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
          onPress={() => router.back()}
          style={[styles.closeBtn, { backgroundColor: colors.secondary }]}
        >
          <Feather name="x" size={18} color={colors.foreground} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>
          Add a Book
        </Text>
        <Pressable
          onPress={handleSave}
          style={[styles.saveBtn, { backgroundColor: colors.primary }]}
        >
          <Text style={styles.saveBtnText}>Save</Text>
        </Pressable>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scroll,
            { paddingBottom: bottomPad + 24 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Cover gradient picker */}
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>
              Cover Color
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.paletteRow}>
                {PALETTE.map((p, i) => (
                  <Pressable
                    key={i}
                    onPress={() => setSelectedGradient(i)}
                    style={[
                      styles.paletteItem,
                      {
                        borderColor:
                          selectedGradient === i ? colors.foreground : "transparent",
                        borderWidth: selectedGradient === i ? 3 : 0,
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.paletteColor,
                        { backgroundColor: p.from },
                      ]}
                    />
                  </Pressable>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Title */}
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>
              Book Title *
            </Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="e.g. Zero to One"
              placeholderTextColor={colors.mutedForeground}
              style={[
                styles.input,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  color: colors.foreground,
                },
              ]}
            />
          </View>

          {/* Author */}
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>
              Author *
            </Text>
            <TextInput
              value={author}
              onChangeText={setAuthor}
              placeholder="e.g. Peter Thiel"
              placeholderTextColor={colors.mutedForeground}
              style={[
                styles.input,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  color: colors.foreground,
                },
              ]}
            />
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>
              Short Description
            </Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="What is this book about?"
              placeholderTextColor={colors.mutedForeground}
              multiline
              numberOfLines={2}
              style={[
                styles.input,
                styles.multilineInput,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  color: colors.foreground,
                },
              ]}
            />
          </View>

          {/* Category */}
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>
              Category
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.categoryRow}>
                {bookCategories.map((cat) => (
                  <Pressable
                    key={cat}
                    onPress={() => setCategory(cat)}
                    style={[
                      styles.catChip,
                      {
                        backgroundColor:
                          category === cat ? colors.primary : colors.secondary,
                        borderColor:
                          category === cat ? colors.primary : colors.border,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.catChipText,
                        {
                          color: category === cat ? "#fff" : colors.mutedForeground,
                        },
                      ]}
                    >
                      {cat}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Ideas */}
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>
              Key Ideas *
            </Text>
            <Text
              style={[styles.sectionSub, { color: colors.mutedForeground }]}
            >
              Add the most important insights from this book
            </Text>
            {ideaTexts.map((idea, index) => (
              <View key={index} style={styles.ideaInputRow}>
                <View
                  style={[
                    styles.ideaNum,
                    { backgroundColor: colors.primary },
                  ]}
                >
                  <Text style={styles.ideaNumText}>{index + 1}</Text>
                </View>
                <TextInput
                  value={idea}
                  onChangeText={(t) => updateIdea(index, t)}
                  placeholder={`Key idea ${index + 1}...`}
                  placeholderTextColor={colors.mutedForeground}
                  multiline
                  style={[
                    styles.ideaInput,
                    {
                      backgroundColor: colors.card,
                      borderColor: colors.border,
                      color: colors.foreground,
                    },
                  ]}
                />
              </View>
            ))}
            <Pressable
              onPress={addIdeaField}
              style={[
                styles.addIdeaBtn,
                {
                  borderColor: colors.border,
                  backgroundColor: colors.secondary,
                },
              ]}
            >
              <Feather name="plus" size={16} color={colors.mutedForeground} />
              <Text
                style={[styles.addIdeaText, { color: colors.mutedForeground }]}
              >
                Add another idea
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 14,
    gap: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  closeBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: "700",
    textAlign: "center",
  },
  saveBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  saveBtnText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#fff",
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 0,
  },
  section: {
    marginBottom: 20,
    gap: 8,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  sectionSub: {
    fontSize: 12,
    marginTop: -4,
  },
  input: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  multilineInput: {
    height: 70,
    textAlignVertical: "top",
    paddingTop: 12,
  },
  paletteRow: {
    flexDirection: "row",
    gap: 10,
    paddingRight: 8,
  },
  paletteItem: {
    borderRadius: 20,
    padding: 2,
  },
  paletteColor: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  categoryRow: {
    flexDirection: "row",
    gap: 8,
    paddingRight: 8,
  },
  catChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  catChipText: {
    fontSize: 13,
    fontWeight: "600",
  },
  ideaInputRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
    marginBottom: 10,
  },
  ideaNum: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    flexShrink: 0,
  },
  ideaNumText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#fff",
  },
  ideaInput: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    minHeight: 70,
    textAlignVertical: "top",
  },
  addIdeaBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: "dashed",
  },
  addIdeaText: {
    fontSize: 13,
    fontWeight: "600",
  },
});
