import { Action, Customer } from "@/app/models/ChallengeData";
import { useColor } from "@/hooks/useColor";
import { useMemo, useState } from "react";
import { Text, View } from "react-native";
import MonthTitle from "./MonthTitle";
import FormInput from "./FormInput";
import Title from "./Title";
import AppButton from "./AppButton";

export type UpdateActionForm = {
  name: string;
};

export type ActionDetailsProps = {
  action: Action;
  customer: Customer;
  isLoading?: boolean;
  onSave?: (form: UpdateActionForm) => void | Promise<void>;
};

export default function ActionDetails({
  action,
  customer,
  isLoading,
  onSave,
}: ActionDetailsProps) {
  const colors = useColor();

  const [serviceName, setServiceName] = useState(action.name);

  const date = useMemo(() => {
    if (!action?.scheduledDate) return;

    return new Date(action.scheduledDate);
  }, [action]);

  const addressLine2 = useMemo(() => {
    return `${customer.city}, ${customer.state} ${customer.zip}`;
  }, [customer]);

  return (
    <View style={{ marginHorizontal: 16 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {date ? (
          <MonthTitle date={date} showDay />
        ) : (
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: colors.subtitle,
            }}
          >
            TBD
          </Text>
        )}
        <Text style={{ fontWeight: "bold", fontSize: 16, color: colors.title }}>
          {action.status && action.status !== "Unscheduled"
            ? action.status
            : "Schedule date & time TBD"}
        </Text>
      </View>

      <FormInput
        label="Service Name"
        value={serviceName}
        onChangeText={setServiceName}
        style={{ marginTop: 23 }}
      />

      {action.vendor && (
        <View style={{ gap: 5, marginTop: 21 }}>
          <Title>Provided by</Title>
          <Text style={{ color: colors.onBackground }}>
            {action.vendor?.vendorName}
          </Text>
          <Text style={{ color: colors.primary }}>
            {action.vendor?.phoneNumber}
          </Text>
        </View>
      )}

      <View style={{ gap: 5, marginTop: 17 }}>
        <Title>Address</Title>
        <Text style={{ color: colors.onBackground }}>{customer.street}</Text>
        <Text style={{ color: colors.onBackground }}>{addressLine2}</Text>
      </View>

      <AppButton
        title={isLoading ? "Saving..." : "SAVE CHANGES"}
        onPress={() => onSave && onSave({ name: serviceName })}
        style={{ marginTop: 29 }}
        disabled={isLoading}
      />
    </View>
  );
}
