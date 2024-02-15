import { format } from "date-fns";

export const getCalendarTime = (date: string | Date) => {
  const formattedDate = format(new Date(date), "yyyy-MM-dd");
  return new Date(formattedDate).getTime();
};
