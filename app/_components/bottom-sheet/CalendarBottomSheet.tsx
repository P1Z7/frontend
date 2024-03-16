"use client";

import { useState } from "react";
import { BottomSheetBaseType } from "@/types/index";
import BottomSheet from "./BottomSheetMaterial";
import CalendarContent from "./content/CalendarContent";

interface Props extends BottomSheetBaseType {
  setStartDateFilter: (data: string) => void;
  setEndDateFilter: (date: string) => void;
}

const CalenderBottomSheet = ({ closeBottomSheet, refs, setStartDateFilter, setEndDateFilter }: Props) => {
  const [dateFilter, setDateFilter] = useState<[string, string]>(["", ""]);

  const setStartDate = (startDate: string) => {
    setDateFilter((prev) => [startDate, prev[1]]);
  };
  const setEndDate = (endDate: string) => {
    setDateFilter((prev) => [prev[0], endDate]);
  };

  const handleSubmit = () => {
    setStartDateFilter(dateFilter[0]);
    setEndDateFilter(dateFilter[1]);
    closeBottomSheet();
  };

  return (
    <>
      <BottomSheet.Frame closeBottomSheet={closeBottomSheet} ref={refs.sheet}>
        <BottomSheet.Title>날짜 선택</BottomSheet.Title>
        <CalendarContent type="bottomSheet" contentRef={refs.content} setStartDateFilter={setStartDate} setEndDateFilter={setEndDate} />
        <BottomSheet.Button onClick={handleSubmit} />
      </BottomSheet.Frame>
    </>
  );
};

export default CalenderBottomSheet;
