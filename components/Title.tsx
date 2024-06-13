import { Text, TextStyle, StyleProp } from "react-native";
import React from "react";

export type TitleProps = {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
};

export default function Title(props: TitleProps) {
  return (
    <Text style={[{ fontSize: 14, fontWeight: "bold" }, props.style]}>
      {props.children}
    </Text>
  );
}
