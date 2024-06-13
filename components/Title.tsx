import { Text, TextStyle, StyleProp } from "react-native";
import React from "react";
import { useColor } from "@/hooks/useColor";

export type TitleProps = {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
};

export default function Title(props: TitleProps) {
  const color = useColor();

  return (
    <Text
      style={[
        { fontSize: 14, fontWeight: "bold", color: color.title },
        props.style,
      ]}
    >
      {props.children}
    </Text>
  );
}
