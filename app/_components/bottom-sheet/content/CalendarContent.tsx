import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useEffect, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { CALENDAR_STYLE } from "@/constants/calendarStyle";
import "@/styles/customCalendar.css";

const STYLE = {
  bottomSheet: "flex w-full justify-center py-16 px-24",
  dropDown: "shadow-postBox flex w-full justify-center rounded-md px-[1.8rem] py-16",
};

interface Props {
  type: "bottomSheet" | "dropDown";
  contentRef?: (node: HTMLElement | null) => void;
  setStartDateFilter: (data: string) => void;
  setEndDateFilter: (date: string) => void;
  endFunc?: () => void;
}

const CalendarContent = ({ contentRef, type, setStartDateFilter, setEndDateFilter, endFunc }: Props) => {
  const [range, setRange] = useState<DateRange | undefined>();

  useEffect(() => {
    if (range?.from) {
      if (!range.to) {
        setStartDateFilter(format(range.from, "yyyy.MM.dd", { locale: ko }));
      } else if (range.to) {
        setStartDateFilter(format(range.from, "yyyy.MM.dd", { locale: ko }));
        setEndDateFilter(format(range.to, "yyyy.MM.dd", { locale: ko }));
        if (endFunc) endFunc();
      }
    }
  }, [range]);

  return (
    <>
      <style>{CALENDAR_STYLE}</style>
      <div className={STYLE[type]} ref={contentRef}>
        <DayPicker
          weekStartsOn={1}
          id="test"
          mode="range"
          selected={range}
          onSelect={setRange}
          modifiersClassNames={{ selected: "my-selected", range_end: "my-day_range_end", range_start: "my-day_range_start" }}
        />
      </div>
    </>
  );
};

export default CalendarContent;
