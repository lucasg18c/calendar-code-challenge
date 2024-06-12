import { View, Text } from "react-native";
import React, { useMemo } from "react";
import { Action, ActionStatus, Customer } from "@/app/models/ChallengeData";
import StatusIcon from "./StatusIcon";
import { MapPinIcon } from "react-native-heroicons/solid";
import { ThemeColors } from "@/constants/Colors";

export type CalendarActionProps = {
  action: Action;
  customer: Customer;
};

const dayOfWeekMapping = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const statusColorMapping: Record<ActionStatus, string> = {
  Completed: "#00B47D",
  Scheduled: "#006A4B",
  Unscheduled: "#011638",
};

export default function CalendarAction(props: CalendarActionProps) {
  const date = useMemo(
    () =>
      !!props.action.scheduledDate
        ? new Date(props.action.scheduledDate)
        : undefined,
    [props.action.scheduledDate]
  );

  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
      <View style={{ flexDirection: "column", alignItems: "center" }}>
        {!!date ? (
          <>
            <Text style={{ fontSize: 20 }}>
              {dayOfWeekMapping[date!.getDay()]}
            </Text>
            <Text style={{ fontSize: 20 }}>{date.getDate()}</Text>
            <StatusIcon status={props.action.status as ActionStatus} />
          </>
        ) : (
          <Text style={{ fontSize: 20 }}>TBD</Text>
        )}
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: "column",
          paddingHorizontal: 16,
          paddingVertical: 9,
          backgroundColor: statusColorMapping[props.action.status!],
        }}
      >
        <Text style={{ fontSize: 16, color: ThemeColors.white }}>
          {props.action.name}
        </Text>
        {props.action.vendor && (
          <>
            <Text style={{ fontSize: 14, color: ThemeColors.white }}>
              {props.action.vendor.vendorName}
            </Text>
            <Text style={{ fontSize: 14, color: ThemeColors.white }}>
              {props.action.vendor.phoneNumber}
            </Text>
          </>
        )}

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MapPinIcon color={ThemeColors.white} />
          <Text style={{ fontSize: 14, color: ThemeColors.white }}>
            {props.customer.street}
          </Text>
        </View>
        <Text style={{ fontSize: 14, color: ThemeColors.white }}></Text>
      </View>
    </View>
  );
}
