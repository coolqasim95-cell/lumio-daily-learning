import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";

export default function QuizRedirectScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: topPad + 24 }]}>
      <View style={[styles.iconWrap, { backgroundColor: colors.success + "22" }]}>
        <Feather name="check-circle" size={48} color={colors.success} />
      </View>
      <Text style={[styles.title, { color: colors.foreground }]}>Book Complete!</Text>
      <Text style={[styles.sub, { color: colors.mutedForeground }]}>
        Quizzes are now built into each topic. Complete topics to earn XP.
      </Text>
      <Pressable
        onPress={() => router.replace("/")}
        style={[styles.btn, { backgroundColor: colors.primary }]}
      >
        <Text style={styles.btnText}>Back to Home</Text>
        <Feather name="arrow-right" size={18} color="#fff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", paddingHorizontal: 32, gap: 16 },
  iconWrap: { width: 96, height: 96, borderRadius: 48, alignItems: "center", justifyContent: "center", marginBottom: 8 },
  title: { fontSize: 28, fontWeight: "800", letterSpacing: -0.5 },
  sub: { fontSize: 15, textAlign: "center", lineHeight: 22 },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    marginTop: 8,
  },
  btnText: { fontSize: 16, fontWeight: "700", color: "#fff" },
});
