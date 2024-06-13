import { View, ViewStyle, StyleProp } from "react-native";
import React, { useMemo } from "react";
import MonthTitle from "./MonthTitle";
import { Calendar } from "@/app/models/ChallengeData";

export type CalendarItemSeparatorProps = {
  item: Calendar;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function CalendarItemSeparator(
  props: CalendarItemSeparatorProps
) {
  const date = useMemo(
    () => new Date(props.item.year, props.item.month, 1),
    [props.item.year, props.item.month]
  );

  return (
    <View style={props.style}>
      <MonthTitle date={date} style={{ marginStart: 15, marginBottom: 21 }} />
      {props.children}
    </View>
  );
}
