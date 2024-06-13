import { useEffect } from "react";
import { SafeAreaView, StatusBar, Text } from "react-native";
import CalendarView from "@/components/CalendarView";
import { calendarService } from "@/services/calendar-service";
import { useCalendar } from "@/contexts/calendar";

export default function Calendar() {
  const { calendar, setCalendar } = useCalendar();

  const fetchCalendar = async () => {
    const response = await calendarService.getCalendar();
    setCalendar(response.data);
  };

  useEffect(() => {
    fetchCalendar();
  }, []);

  return (
    <SafeAreaView style={{ marginTop: StatusBar.currentHeight }}>
      {!!calendar ? <CalendarView data={calendar} /> : <Text>Loading...</Text>}
    </SafeAreaView>
  );
}
