import { ChallengeData } from "@/app/models/ChallengeData";
import { createContext } from "react";

export type CalendarState = {
  calendar?: ChallengeData;
  setCalendar: (calendar: ChallengeData) => void;
};

export const CalendarContext = createContext<CalendarState>({} as any);
