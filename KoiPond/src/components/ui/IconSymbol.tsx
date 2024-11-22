import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { OpaqueColorValue, StyleProp, TextStyle } from "react-native";

// Define a custom type for valid icon names
type IconSymbolName =
  | "house.fill"
  | "paperplane.fill"
  | "chevron.left.forwardslash.chevron.right"
  | "chevron.right"
  | "figure.2.circle.fill"
  | "gift.fill"
  | "volunteer-activism"
  | keyof typeof MaterialIcons.glyphMap; // All valid MaterialIcons names

// Create a mapping from custom icon names to MaterialIcons names
const MAPPING: Partial<Record<IconSymbolName, string>> = {
  "house.fill": "home",
  "paperplane.fill": "send",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.right": "chevron-right",
  "figure.2.circle.fill": "volunteer-activism", // Custom icon for volunteer-activism
  "gift.fill": "gift", // Custom icon for gift
};

// Component props definition
type IconSymbolProps = {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>; // Change here to TextStyle
};

// IconSymbol component
export function IconSymbol({ name, size = 24, color, style }: IconSymbolProps) {
  // Use the MAPPING or fallback to the name if it's not in the MAPPING
  const iconName = MAPPING[name] || name;

  return (
    <MaterialIcons
      color={color}
      size={size}
      name={iconName as keyof typeof MaterialIcons.glyphMap} // Explicitly cast to valid icon name
      style={style}
    />
  );
}
