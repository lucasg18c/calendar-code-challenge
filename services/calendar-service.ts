import { ChallengeData } from "@/app/models/ChallengeData";
import { axiosClient } from "@/libs/axios-config";
import { mockedCalendar } from "@/mock/calendar";

const client = axiosClient.interview;

const USE_MOCK = false; // TODO: replace with env var, or remove mock at all

const RESOURCE_URL = "/interview/api/v1/challenge";

export const calendarService = {
  getCalendar: async () => {
    return USE_MOCK
      ? { data: mockedCalendar }
      : client.get<ChallengeData>(RESOURCE_URL);
  },
  updateCalendar: async (data: ChallengeData) => {
    return client.post<ChallengeData>(RESOURCE_URL, data);
  },
};
