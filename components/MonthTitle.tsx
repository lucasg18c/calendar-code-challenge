import { Text, StyleProp, TextStyle } from "react-native";
import React, { useMemo } from "react";
import { formatDate } from "@/libs/format";
import { useColor } from "@/hooks/useColor";

export type MonthTitleProps = {
  date: Date;
  showDay?: boolean;
  style?: StyleProp<TextStyle>;
};

export default function MonthTitle(props: MonthTitleProps) {
  const colors = useColor();

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
          color: colors.subtitle,
        },
      ]}
    >
      {title}
    </Text>
  );
}
