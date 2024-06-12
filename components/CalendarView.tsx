import { View, Text, FlatList } from "react-native";
import React from "react";
import { ChallengeData } from "@/app/models/ChallengeData";
import CalendarItem from "./CalendarItem";

export type CalendarViewProps = {
  data: ChallengeData;
};

function formatDateToMonthYear(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
  };
  return date.toLocaleDateString("en-US", options);
}

export default function CalendarView(props: CalendarViewProps) {
  return (
    <FlatList
      data={props.data.calendar}
      CellRendererComponent={({ item, index, children }) => (
        <View key={index} style={{ marginTop: 20 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginStart: 15,
              marginBottom: 21,
              color: "#000000CC",
            }}
          >
            {formatDateToMonthYear(new Date(item.year, item.month, 1))}
          </Text>
          {children}
        </View>
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
