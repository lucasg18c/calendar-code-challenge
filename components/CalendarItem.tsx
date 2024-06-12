import { View, Text } from "react-native";
import React from "react";
import { Calendar, Customer } from "@/app/models/ChallengeData";
import CalendarAction from "./CalendarAction";

export type CalendarItemProps = {
  calendar: Calendar;
  customer: Customer;
};

export default function CalendarItem(props: CalendarItemProps) {
  return (
    <View style={{}}>
      {props.calendar.actions.map((action, key) => (
        <CalendarAction key={key} action={action} customer={props.customer} />
      ))}
    </View>
  );
}
