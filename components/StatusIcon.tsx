import React from "react";
import { ActionStatus } from "@/app/models/ChallengeData";
import { ClockIcon } from "react-native-heroicons/outline";
import { CheckCircleIcon } from "react-native-heroicons/solid";
import { useColor } from "@/hooks/useColor";

export type StatusIconProps = {
  status: ActionStatus;
};

const iconsMapping: Record<
  ActionStatus,
  React.FC<{ color: string; size: number }>
> = {
  Completed: (props) => <CheckCircleIcon {...props} />,
  Scheduled: (props) => <ClockIcon {...props} />,
  Unscheduled: (props) => <></>,
};

export default function StatusIcon(props: StatusIconProps) {
  const color = useColor();

  const Icon = iconsMapping[props.status];

  return <Icon color={color.primary} size={15} />;
}
