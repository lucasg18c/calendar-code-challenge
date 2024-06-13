import { Text, TouchableOpacity, ViewStyle, StyleProp } from "react-native";
import React from "react";
import { useColor } from "@/hooks/useColor";

export type AppButtonProps = {
  title: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void | Promise<void>;
};

export default function AppButton(props: AppButtonProps) {
  const colors = useColor();

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        {
          backgroundColor: colors.primary,
          borderRadius: 50,
          height: 43,
          justifyContent: "center",
          alignItems: "center",
        },
        props.style,
      ]}
    >
      <Text
        style={{ color: colors.onPrimary, fontSize: 16, fontWeight: "bold" }}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}
