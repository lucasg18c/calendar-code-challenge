import { ChallengeData } from "@/app/models/ChallengeData";
import { axiosClient } from "@/libs/axios-config";
import { mockedCalendar } from "@/mock/calendar";

const client = axiosClient.interview;

const USE_MOCK = false;

export const calendarService = {
  getCalendar: async () => {
    return USE_MOCK
      ? { data: mockedCalendar }
      : client.get<ChallengeData>("/interview/api/v1/challenge");
  },
  updateCalendar: async (data: ChallengeData) => {
    return client.post<ChallengeData>("/interview/api/v1/challenge", data);
  },
};
