"use client";

import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useEffect, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import BottomSheetFrame from "./BottomSheetFrame";

interface Props {
  closeBottomSheet: () => void;
  setStartDateFilter: (data: string) => void;
  setEndDateFilter: (date: string) => void;
}

const CalenderBottomSheet = ({ closeBottomSheet, setStartDateFilter, setEndDateFilter }: Props) => {
  const [range, setRange] = useState<DateRange | undefined>();

  useEffect(() => {
    if (range?.from) {
      if (!range.to) {
        setStartDateFilter(format(range.from, "PPP EE", { locale: ko }));
      } else if (range.to) {
        setStartDateFilter(format(range.from, "PPP EE", { locale: ko }));
        setEndDateFilter(format(range.to, "PPP EE", { locale: ko }));
        closeBottomSheet();
      }
    }
  }, [range]);

  return (
    <BottomSheetFrame closeBottomSheet={closeBottomSheet}>
      <h1 className="px-20 text-start text-14">시/도 선택</h1>
      <DayPicker id="test" mode="range" selected={range} onSelect={setRange} />
    </BottomSheetFrame>
  );
};

export default CalenderBottomSheet;
