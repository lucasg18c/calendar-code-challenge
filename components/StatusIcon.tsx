import { View, Text } from "react-native";
import React from "react";
import { ActionStatus } from "@/app/models/ChallengeData";
import { ClockIcon } from "react-native-heroicons/outline";
import { CheckCircleIcon } from "react-native-heroicons/solid";
import { ThemeColors } from "@/constants/Colors";

export type StatusIconProps = {
  status: ActionStatus;
};

const iconsMapping: Record<ActionStatus, React.ReactNode> = {
  Completed: <CheckCircleIcon color={ThemeColors.primary} />,
  Scheduled: <ClockIcon color={ThemeColors.primary} />,
  Unscheduled: <></>,
};

export default function StatusIcon(props: StatusIconProps) {
  return iconsMapping[props.status];
}
