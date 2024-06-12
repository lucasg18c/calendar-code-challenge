import { View, Text } from "react-native";
import React from "react";
import { Calendar, Customer } from "@/app/models/ChallengeData";
import CalendarAction from "./CalendarAction";
import { ThemeColors } from "@/constants/Colors";

export type CalendarItemProps = {
  calendar: Calendar;
  customer: Customer;
};

export default function CalendarItem(props: CalendarItemProps) {
  return (
    <View style={{ gap: 4 }}>
      {props.calendar.actions.length ? (
        props.calendar.actions.map((action, key) => (
          <CalendarAction key={key} action={action} customer={props.customer} />
        ))
      ) : (
        <View
          style={{
            backgroundColor: "#848FA5",
            borderRadius: 4,
            marginStart: 48,
            marginEnd: 16,
            paddingHorizontal: 16,
            paddingVertical: 12,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: ThemeColors.white,
              fontWeight: "bold",
            }}
          >
            No Maintenance Scheduled
          </Text>
        </View>
      )}
    </View>
  );
}
