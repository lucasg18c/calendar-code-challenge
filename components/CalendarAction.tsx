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

  const isScheduled = useMemo(
    () => !!props.action.scheduledDate,
    [props.action.scheduledDate]
  );

  const statusText = useMemo(() => {
    switch (props.action.status) {
      case "Completed":
        return "Completed";
      case "Scheduled":
        return `Scheduled ${props.action.arrivalStartWindow} - ${props.action.arrivalEndWindow}`;
      default:
        return "Scheduled date & time TBD";
    }
  }, [
    props.action.status,
    props.action.arrivalStartWindow,
    props.action.arrivalEndWindow,
  ]);

  return (
    <View
      style={{
        flexDirection: "row",
        gap: 10,
        marginHorizontal: 16,
      }}
    >
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          width: 25,
        }}
      >
        {isScheduled ? (
          <>
            <Text
              style={{ fontSize: 9, fontWeight: "bold", color: "#00000099" }}
            >
              {dayOfWeekMapping[date!.getDay()]}
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginTop: 5,
                marginBottom: 7.8,
              }}
            >
              {date!.getDate()}
            </Text>
            <StatusIcon status={props.action.status as ActionStatus} />
          </>
        ) : (
          <Text style={{ fontSize: 9, fontWeight: "bold" }}>TBD</Text>
        )}
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: "column",
          paddingHorizontal: 16,
          paddingTop: 9,
          paddingBottom: 14,
          backgroundColor:
            statusColorMapping[props.action.status ?? "Unscheduled"],
          borderRadius: 4,
          gap: 1,
        }}
      >
        <Text
          style={{ fontSize: 16, color: ThemeColors.white, fontWeight: "bold" }}
        >
          {props.action.name}
        </Text>
        {props.action.vendor && (
          <>
            <Text style={{ fontSize: 12, color: ThemeColors.white }}>
              {props.action.vendor.vendorName}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: ThemeColors.white,
                fontWeight: "bold",
              }}
            >
              {props.action.vendor.phoneNumber}
            </Text>
          </>
        )}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 9,
            gap: 4,
          }}
        >
          <MapPinIcon color={ThemeColors.white} size={10} />
          <Text style={{ fontSize: 12, color: ThemeColors.white }}>
            {props.customer.street}
          </Text>
        </View>
        <Text style={{ fontSize: 12, color: ThemeColors.white }}>
          {statusText}
        </Text>
      </View>
    </View>
  );
}
