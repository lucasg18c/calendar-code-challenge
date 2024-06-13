import { View, Text } from "react-native";
import React, { useMemo } from "react";
import { Calendar, Customer } from "@/app/models/ChallengeData";
import CalendarAction from "./CalendarAction";
import { ThemeColors } from "@/constants/Colors";

export type CalendarItemProps = {
  calendar: Calendar;
  customer: Customer;
};

export default function CalendarItem(props: CalendarItemProps) {
  const actions = useMemo(() => {
    if (!props.calendar.actions.length) {
      return [];
    }

    // get unscheduled actions
    const unscheduledActions = props.calendar.actions.filter(
      (action) => !action.scheduledDate
    );

    // get scheduled actions
    const scheduledActions = props.calendar.actions.filter(
      (action) => !!action.scheduledDate
    );

    // order scheduled actions by date
    const sortedScheduledActions = scheduledActions.sort((a, b) => {
      return (
        new Date(a.scheduledDate!).getTime() -
        new Date(b.scheduledDate!).getTime()
      );
    });

    return [...sortedScheduledActions, ...unscheduledActions];
  }, [props.calendar.actions]);

  return (
    <View style={{ gap: 4 }}>
      {actions.length ? (
        actions.map((action, key) => (
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
