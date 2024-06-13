import { Text, TouchableOpacity, ViewStyle, StyleProp } from "react-native";
import React from "react";

export type AppButtonProps = {
  title: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void | Promise<void>;
};

export default function AppButton(props: AppButtonProps) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        {
          backgroundColor: "#00B47D",
          borderRadius: 50,
          height: 43,
          justifyContent: "center",
          alignItems: "center",
        },
        props.style,
      ]}
    >
      <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "bold" }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}
