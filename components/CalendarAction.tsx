import { View, Text } from "react-native";
import React, { useMemo } from "react";
import { Action, ActionStatus, Customer } from "@/app/models/ChallengeData";
import StatusIcon from "./StatusIcon";
import { MapPinIcon } from "react-native-heroicons/solid";
import { Link } from "expo-router";
import { useColor } from "@/hooks/useColor";
import { Colors } from "@/constants/Colors";

export type CalendarActionProps = {
  action: Action;
  customer: Customer;
};

const dayOfWeekMapping = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const statusColorMapping: Record<ActionStatus, string> = {
  Completed: Colors.light.primary,
  Scheduled: Colors.light.primaryDark,
  Unscheduled: Colors.light.secondary,
};

export default function CalendarAction(props: CalendarActionProps) {
  const colors = useColor();
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
              style={{
                fontSize: 9,
                fontWeight: "bold",
                color: colors.subtitle,
              }}
            >
              {dayOfWeekMapping[date!.getDay()]}
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginTop: 5,
                marginBottom: 7.8,
                color: colors.title,
              }}
            >
              {date!.getDate()}
            </Text>
            <StatusIcon status={props.action.status as ActionStatus} />
          </>
        ) : (
          <Text
            style={{ fontSize: 9, fontWeight: "bold", color: colors.subtitle }}
          >
            TBD
          </Text>
        )}
      </View>

      <Link
        href={{
          pathname: "[actionId]",
          params: { actionId: props.action.id },
        }}
        style={{
          flex: 1,
          paddingHorizontal: 16,
          paddingTop: 9,
          paddingBottom: 14,
          backgroundColor:
            statusColorMapping[props.action.status ?? "Unscheduled"],
          borderRadius: 4,
        }}
      >
        <View
          style={{
            gap: 1,
            flexDirection: "column",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: colors.onPrimary,
              fontWeight: "bold",
            }}
          >
            {props.action.name}
          </Text>
          {props.action.vendor && (
            <>
              <Text style={{ fontSize: 12, color: colors.onPrimary }}>
                {props.action.vendor.vendorName}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: colors.onPrimary,
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
            <MapPinIcon color={colors.onPrimary} size={10} />
            <Text style={{ fontSize: 12, color: colors.onPrimary }}>
              {props.customer.street}
            </Text>
          </View>
          <Text style={{ fontSize: 12, color: colors.onPrimary }}>
            {statusText}
          </Text>
        </View>
      </Link>
    </View>
  );
}
