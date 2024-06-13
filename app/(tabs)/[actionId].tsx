import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useCalendar } from "@/contexts/calendar";
import MonthTitle from "@/components/MonthTitle";
import FormInput from "@/components/FormInput";
import { Action, Customer } from "../models/ChallengeData";
import Title from "@/components/Title";
import AppButton from "@/components/AppButton";
import { calendarService } from "@/services/calendar-service";
import { useColor } from "@/hooks/useColor";

export default function ActionDetailsScreen() {
  const { actionId } = useLocalSearchParams<{
    actionId: string;
  }>();
  const { calendar, setCalendar } = useCalendar();
  const [isLoading, setIsLoading] = useState(false); // this could be replaced with React Query

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

  const handleSaveChanges = async (updatedAction: UpdateActionForm) => {
    if (!calendar || !actionId || isLoading) return;

    setIsLoading(true);

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
      Alert.alert("Error", "There was an error saving changes"); // TODO: replace with toast
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ marginTop: StatusBar.currentHeight }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {action && calendar?.customer && (
          <ActionDetails
            action={action}
            onSave={handleSaveChanges}
            customer={calendar!.customer}
            isLoading={isLoading}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

type UpdateActionForm = {
  name: string;
};

type ActionDetailsProps = {
  action: Action;
  customer: Customer;
  isLoading?: boolean;
  onSave?: (form: UpdateActionForm) => void | Promise<void>;
};

function ActionDetails({
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
