"use client";

import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useEffect, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import BottomSheet from "./BottomSheetMaterial";

interface Props {
  closeBottomSheet: () => void;
  setStartDateFilter: (data: string) => void;
  setEndDateFilter: (date: string) => void;
}

// TODO: 값 설정을 버튼이 눌렸을 때로 수정 필요

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
    <BottomSheet.Frame closeBottomSheet={closeBottomSheet}>
      <BottomSheet.Title>날짜 선택</BottomSheet.Title>
      <DayPicker id="test" mode="range" selected={range} onSelect={setRange} />
      <BottomSheet.Button onClick={closeBottomSheet} />
    </BottomSheet.Frame>
  );
};

export default CalenderBottomSheet;
