"use client";

import { PostType } from "@/(route)/post/page";
import "@/styles/customCalendar.css";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useEffect, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { useFormContext } from "react-hook-form";
import { CALENDAR_STYLE } from "@/constants/calendarStyle";
import BottomSheet from "./BottomSheetMaterial";

interface Props {
  closeBottomSheet: () => void;
  setStartDateFilter?: (data: string) => void;
  setEndDateFilter?: (date: string) => void;
}

// TODO: 값 설정을 버튼이 눌렸을 때로 수정 필요

const CalenderBottomSheet = ({ closeBottomSheet, setStartDateFilter, setEndDateFilter }: Props) => {
  const { setValue } = useFormContext<PostType>();
  const [range, setRange] = useState<DateRange | undefined>();

  useEffect(() => {
    if (range?.from) {
      if (!range.to) {
        if (setStartDateFilter) {
          setStartDateFilter(format(range.from, "PPP EE", { locale: ko }));
        }
        setValue("startDate", format(range.from, "yyyy-MM-dd"));
      } else if (range.to) {
        if (setStartDateFilter) {
          setStartDateFilter(format(range.from, "PPP EE", { locale: ko }));
        }
        if (setEndDateFilter) {
          setEndDateFilter(format(range.to, "PPP EE", { locale: ko }));
        }
        setValue("startDate", format(range.from, "yyyy-MM-dd"));
        setValue("endDate", format(range.to, "yyyy-MM-dd"));
        // closeBottomSheet();
      }
    }
  }, [range]);

  return (
    <>
      <style>{CALENDAR_STYLE}</style>
      <BottomSheet.Frame closeBottomSheet={closeBottomSheet}>
        <BottomSheet.Title>날짜 선택</BottomSheet.Title>
        <div className="flex w-full justify-center">
          <DayPicker
            weekStartsOn={1}
            id="test"
            mode="range"
            selected={range}
            onSelect={setRange}
            modifiersClassNames={{ selected: "my-selected", range_end: "my-day_range_end", range_start: "my-day_range_start" }}
          />
        </div>
        <BottomSheet.Button onClick={closeBottomSheet} />
      </BottomSheet.Frame>
    </>
  );
};

export default CalenderBottomSheet;
