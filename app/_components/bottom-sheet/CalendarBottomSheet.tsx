"use client";

import { BottomSheetBaseType } from "@/types/index";
import BottomSheet from "./BottomSheetMaterial";
import CalendarContent from "./content/CalendarContent";

interface Props extends BottomSheetBaseType {
  setStartDateFilter: (data: string) => void;
  setEndDateFilter: (date: string) => void;
}

// TODO: 값 설정을 버튼이 눌렸을 때로 수정 필요

const CalenderBottomSheet = ({ closeBottomSheet, refs, setStartDateFilter, setEndDateFilter }: Props) => {
  return (
    <>
      <BottomSheet.Frame closeBottomSheet={closeBottomSheet} ref={refs.sheet}>
        <BottomSheet.Title>날짜 선택</BottomSheet.Title>
        <CalendarContent type="bottomSheet" contentRef={refs.content} setStartDateFilter={setStartDateFilter} setEndDateFilter={setEndDateFilter} />
        <BottomSheet.Button onClick={closeBottomSheet} />
      </BottomSheet.Frame>
    </>
  );
};

export default CalenderBottomSheet;
