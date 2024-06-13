import React, { useState } from "react";
import { CalendarContext } from "./calendar-context";
import { ChallengeData } from "@/app/models/ChallengeData";

export type CalendarContextProviderProps = {
  children: React.ReactNode;
};

export default function CalendarContextProvider(
  props: CalendarContextProviderProps
) {
  const [calendar, setCalendar] = useState<ChallengeData>();
  return (
    <CalendarContext.Provider value={{ calendar, setCalendar }}>
      {props.children}
    </CalendarContext.Provider>
  );
}
