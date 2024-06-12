import axios from "axios";
import { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, Text } from "react-native";
import { ChallengeData } from "../models/ChallengeData";
import CalendarView from "@/components/CalendarView";

export default function Calendar() {
  const [data, setData] = useState<ChallengeData>();

  const fetchCalendar = async () => {
    const response = await axios.get<ChallengeData>(
      "https://xjvq5wtiye.execute-api.us-east-1.amazonaws.com/interview/api/v1/challenge"
    );
    setData(response.data);
  };

  useEffect(() => {
    fetchCalendar();
  }, []);

  return (
    <SafeAreaView style={{ marginTop: StatusBar.currentHeight }}>
      {!!data ? <CalendarView data={data} /> : <Text>Loading...</Text>}
    </SafeAreaView>
  );
}
