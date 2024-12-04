import { StyleSheet, Text, TextProps } from "react-native";
import { useThemeColor } from "@/src/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Quicksand-Regular", // Use the regular weight
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Quicksand-SemiBold", // Use the semi-bold weight
  },
  title: {
    fontSize: 32,
    lineHeight: 40,
    fontFamily: "Quicksand-Bold", // Use the bold weight
  },
  subtitle: {
    fontSize: 20,
    lineHeight: 28,
    fontFamily: "Quicksand-SemiBold", // SemiBold for subtitles
  },
  link: {
    fontSize: 16,
    lineHeight: 30,
    color: "#0a7ea4",
    fontFamily: "Quicksand-Regular", // Regular font for links
  },
});
