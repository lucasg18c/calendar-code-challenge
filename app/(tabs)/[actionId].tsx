import { View, Text, SafeAreaView, StatusBar, TextInput } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useCalendar } from "@/contexts/calendar";
import MonthTitle from "@/components/MonthTitle";
import FormInput from "@/components/FormInput";
import { Action } from "../models/ChallengeData";
import Title from "@/components/Title";
import AppButton from "@/components/AppButton";
import { calendarService } from "@/services/calendar-service";

export default function ActionDetailsScreen() {
  const { actionId } = useLocalSearchParams<{
    actionId: string;
  }>();
  const { calendar, setCalendar } = useCalendar();
  const action = useMemo(() => {
    if (!calendar || !actionId) return;

    return calendar.calendar
      .flatMap((i) => i.actions)
      .find((i) => i.id === actionId);
  }, [calendar, actionId]);

  const handleChange = async (updatedAction: UpdateActionForm) => {
    if (!calendar) return;

    const _calendar = { ...calendar };
    const copy = JSON.parse(JSON.stringify(_calendar));

    try {
      const _action = _calendar.calendar
        .flatMap((i) => i.actions)
        .find((i) => i.id === actionId);

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
      {action && <ActionDetails action={action} onSave={handleChange} />}
    </SafeAreaView>
  );
}

type UpdateActionForm = {
  name: string;
};

type ActionDetailsProps = {
  action: Action;
  onSave?: (form: UpdateActionForm) => void | Promise<void>;
};

function ActionDetails({ action, onSave }: ActionDetailsProps) {
  const [serviceName, setServiceName] = useState(action.name);

  const date = useMemo(() => {
    if (!action?.scheduledDate) return;

    return new Date(action.scheduledDate);
  }, [action]);

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
        <MonthTitle date={date!} showDay />
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          {action.status}
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
        <Text></Text>
        <Text></Text>
      </View>

      <AppButton
        title="SAVE CHANGES"
        onPress={() => onSave && onSave({ name: serviceName })}
      />
    </View>
  );
}
