import { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, Text } from "react-native";
import CalendarView from "@/components/CalendarView";
import { calendarService } from "@/services/calendar-service";
import { useCalendar } from "@/contexts/calendar";

export default function Calendar() {
  const { calendar, setCalendar } = useCalendar();
  const [isLoading, setIsLoading] = useState(false); // this could be replaced with React Query

  const handleFetchCalendar = async () => {
    setIsLoading(true);
    const response = await calendarService.getCalendar();
    setIsLoading(false);
    setCalendar(response.data);
  };

  useEffect(() => {
    handleFetchCalendar();
  }, []);

  return (
    <SafeAreaView style={{ marginTop: StatusBar.currentHeight }}>
      {!!calendar ? (
        <CalendarView
          data={calendar}
          onRefresh={handleFetchCalendar}
          isRefreshing={isLoading}
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </SafeAreaView>
  );
}
