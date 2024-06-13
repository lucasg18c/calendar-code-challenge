import { View, TextInput, StyleProp, ViewStyle } from "react-native";
import React from "react";
import Title from "./Title";

export type FormInputProps = {
  label: string;
  value: string;
  style?: StyleProp<ViewStyle>;
  onChangeText?: (text: string) => void;
};

export default function FormInput(props: FormInputProps) {
  return (
    <View style={[props.style, { gap: 7 }]}>
      <Title>{props.label}</Title>
      <TextInput
        value={props.value}
        onChangeText={props.onChangeText}
        style={{
          paddingHorizontal: 16,
          paddingVertical: 12,
          backgroundColor: "#F3F3F3",
          borderColor: "#E9E9E9",
          borderWidth: 1,
          borderRadius: 4,
          flexDirection: "row",
          alignItems: "center",
        }}
      />
    </View>
  );
}
