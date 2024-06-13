import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";

type ColorTheme = typeof Colors.light | typeof Colors.dark;

export function useColor(): ColorTheme {
  const colorScheme = useColorScheme();

  return colorScheme === "dark" ? Colors.dark : Colors.light;
}
