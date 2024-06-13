import { SafeAreaView, StatusBar, ScrollView, Alert } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useCalendar } from "@/contexts/calendar";
import { calendarService } from "@/services/calendar-service";
import ActionDetails, { UpdateActionForm } from "@/components/ActionDetails";

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

      if (!_action) {
        setIsLoading(false);
        throw new Error("Action not found");
      }

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
