import { View, Text, FlatList } from "react-native";
import React from "react";
import { ChallengeData } from "@/app/models/ChallengeData";
import CalendarItem from "./CalendarItem";

export type CalendarViewProps = {
  data: ChallengeData;
};

export default function CalendarView(props: CalendarViewProps) {
  return (
    <FlatList
      data={props.data.calendar}
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
