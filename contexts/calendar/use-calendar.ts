import { useContext } from "react";
import { CalendarContext } from "./calendar-context";

export const useCalendar = () => {
  return useContext(CalendarContext);
};
