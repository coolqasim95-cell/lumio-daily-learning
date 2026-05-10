import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

import { useColors } from "@/hooks/useColors";

interface GoalChipProps {
  label: string;
  icon: string;
  selected: boolean;
  onPress: () => void;
}

export function GoalChip({ label, icon, selected, onPress }: GoalChipProps) {
  const colors = useColors();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        {
          backgroundColor: selected ? colors.primary : "rgba(255,255,255,0.1)",
          borderColor: selected ? colors.primary : "rgba(255,255,255,0.25)",
          opacity: pressed ? 0.8 : 1,
        },
      ]}
    >
      <Feather
        name={icon as any}
        size={15}
        color={selected ? "#fff" : "rgba(255,255,255,0.8)"}
      />
      <Text
        style={[
          styles.label,
          { color: selected ? "#fff" : "rgba(255,255,255,0.9)" },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    marginBottom: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: "500",
  },
});
