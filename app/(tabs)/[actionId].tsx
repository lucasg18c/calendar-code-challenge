import { View, Text, SafeAreaView, StatusBar, TextInput } from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useCalendar } from "@/contexts/calendar";
import MonthTitle from "@/components/MonthTitle";
import FormInput from "@/components/FormInput";
import { Action, Customer } from "../models/ChallengeData";
import Title from "@/components/Title";
import AppButton from "@/components/AppButton";
import { calendarService } from "@/services/calendar-service";

export default function ActionDetailsScreen() {
  const { actionId } = useLocalSearchParams<{
    actionId: string;
  }>();
  const { calendar, setCalendar } = useCalendar();

  const findActionById = useCallback(
    (id: string) => {
      if (!calendar) return;

      return calendar.calendar
        .flatMap((i) => i.actions)
        .find((i) => i.id === id);
    },
    [calendar]
  );

  const action = useMemo(() => {
    if (!calendar || !actionId) return;

    return findActionById(actionId);
  }, [calendar, actionId]);

  const handleChange = async (updatedAction: UpdateActionForm) => {
    if (!calendar || !actionId) return;

    const _calendar = { ...calendar };
    const copy = JSON.parse(JSON.stringify(_calendar));

    try {
      const _action = findActionById(actionId);

      if (!_action) return;

      _action.name = updatedAction.name;

      setCalendar(_calendar);
      await calendarService.updateCalendar(_calendar);
    } catch (e) {
      console.log(e);
      setCalendar(copy);
    }
  };

  return (
    <SafeAreaView style={{ marginTop: StatusBar.currentHeight }}>
      {action && calendar?.customer && (
        <ActionDetails
          action={action}
          onSave={handleChange}
          customer={calendar!.customer}
        />
      )}
    </SafeAreaView>
  );
}

type UpdateActionForm = {
  name: string;
};

type ActionDetailsProps = {
  action: Action;
  customer: Customer;
  onSave?: (form: UpdateActionForm) => void | Promise<void>;
};

function ActionDetails({ action, customer, onSave }: ActionDetailsProps) {
  const [serviceName, setServiceName] = useState(action.name);

  const date = useMemo(() => {
    if (!action?.scheduledDate) return;

    return new Date(action.scheduledDate);
  }, [action]);

  const addressLine2 = useMemo(() => {
    return `${customer.city}, ${customer.state} ${customer.zip}`;
  }, [customer]);

  useEffect(() => {
    if (!action) return;

    setServiceName(action.name);
  }, [action]);

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
              color: "#000000CC",
            }}
          >
            TBD
          </Text>
        )}
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
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
          <Text>{action.vendor?.vendorName}</Text>
          <Text style={{ color: "#00B47D" }}>{action.vendor?.phoneNumber}</Text>
        </View>
      )}

      <View style={{ gap: 5, marginTop: 17 }}>
        <Title>Address</Title>
        <Text>{customer.street}</Text>
        <Text>{addressLine2}</Text>
      </View>

      <AppButton
        title="SAVE CHANGES"
        onPress={() => onSave && onSave({ name: serviceName })}
        style={{ marginTop: 29 }}
      />
    </View>
  );
}
