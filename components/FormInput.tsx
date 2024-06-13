import { View, TextInput, StyleProp, ViewStyle, Text } from "react-native";
import React from "react";
import Title from "./Title";
import { useColor } from "@/hooks/useColor";

export type FormInputProps = {
  label: string;
  value: string;
  style?: StyleProp<ViewStyle>;
  error?: string;
  maxLength?: number;
  onChangeText?: (text: string) => void;
};

export default function FormInput(props: FormInputProps) {
  const colors = useColor();

  return (
    <View style={props.style}>
      <Title>{props.label}</Title>
      <TextInput
        value={props.value}
        onChangeText={props.onChangeText}
        style={{
          paddingHorizontal: 16,
          paddingVertical: 12,
          backgroundColor: colors.surface,
          borderColor: colors.surfaceOutline,
          borderWidth: 1,
          borderRadius: 4,
          flexDirection: "row",
          alignItems: "center",
          color: colors.onSurface,
          marginTop: 7,
        }}
        maxLength={props.maxLength}
      />
      {props.error && (
        <Text
          style={{ color: colors.error, fontSize: 12, fontWeight: "medium" }}
        >
          {props.error}
        </Text>
      )}
    </View>
  );
}
