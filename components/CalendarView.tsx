import { View, FlatList } from "react-native";
import React, { useMemo } from "react";
import { ChallengeData } from "@/app/models/ChallengeData";
import CalendarItem from "./CalendarItem";
import MonthTitle from "./MonthTitle";
import CalendarItemSeparator from "./CalendarItemSeparator";

export type CalendarViewProps = {
  data: ChallengeData;
};

export default function CalendarView(props: CalendarViewProps) {
  const date = useMemo(() => new Date(), []);
  return (
    <FlatList
      data={props.data.calendar}
      CellRendererComponent={({ item, index, children }) => (
        <CalendarItemSeparator
          key={index}
          item={item}
          style={{ marginTop: index > 0 ? 20 : 0 }}
        >
          {children}
        </CalendarItemSeparator>
      )}
      renderItem={({ item, index }) => (
        <CalendarItem
          key={index}
          calendar={item}
          customer={props.data.customer}
        />
      )}
    />
  );
}
