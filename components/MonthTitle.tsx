import { Text, StyleProp, TextStyle } from "react-native";
import React, { useMemo } from "react";
import { formatDate } from "@/libs/format";

export type MonthTitleProps = {
  date: Date;
  showDay?: boolean;
  style?: StyleProp<TextStyle>;
};

export default function MonthTitle(props: MonthTitleProps) {
  const title = useMemo(
    () => formatDate(props.date, props.showDay),
    [props.date, props.showDay]
  );

  return (
    <Text
      style={[
        props.style,
        {
          fontSize: 16,
          fontWeight: "bold",
          color: "#000000CC",
        },
      ]}
    >
      {title}
    </Text>
  );
}
