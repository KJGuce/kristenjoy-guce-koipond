import React from "react";
import { OpaqueColorValue, StyleProp, TextStyle } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

// Define a custom type for valid icon names for both libraries
type IconSymbolName =
  | "house.fill"
  | "paperplane.fill"
  | "chevron.left.forwardslash.chevron.right"
  | "chevron.right"
  | "figure.2.circle.fill"
  | "gift.fill"
  | "volunteer-activism"
  | "arrow-back" // Add the back arrow icon here
  | keyof typeof MaterialIcons.glyphMap
  | keyof typeof Ionicons.glyphMap;

// Extend the mapping to include both Material Icons and Ionicons
const MAPPING: Partial<
  Record<IconSymbolName, { name: string; type: "material" | "ionicons" }>
> = {
  "house.fill": { name: "home", type: "material" },
  "paperplane.fill": { name: "send", type: "material" },
  "chevron.left.forwardslash.chevron.right": { name: "code", type: "material" },
  "chevron.right": { name: "chevron-right", type: "material" },
  "figure.2.circle.fill": { name: "people-circle", type: "ionicons" }, // Example for Ionicons
  "gift.fill": { name: "gift", type: "ionicons" }, // Example for Ionicons
  "volunteer-activism": { name: "volunteer-activism", type: "material" },
  "arrow-back": { name: "arrow-back", type: "ionicons" }, // Add back arrow mapping
};

// Component props definition
type IconSymbolProps = {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
};

// IconSymbol component
export function IconSymbol({ name, size = 24, color, style }: IconSymbolProps) {
  // Map the icon name and determine the icon type (Material or Ionicons)
  const iconDetails = MAPPING[name] || { name, type: "material" };

  if (iconDetails.type === "material") {
    return (
      <MaterialIcons
        name={iconDetails.name as keyof typeof MaterialIcons.glyphMap}
        size={size}
        color={color}
        style={style}
      />
    );
  } else if (iconDetails.type === "ionicons") {
    return (
      <Ionicons
        name={iconDetails.name as keyof typeof Ionicons.glyphMap}
        size={size}
        color={color}
        style={style}
      />
    );
  }

  // If type is unknown, fallback to a default icon or error handling
  return null;
}
