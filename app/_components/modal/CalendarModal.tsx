"use client";

import { PostType } from "@/(route)/post/page";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { UseFormSetValue } from "react-hook-form";
import { CALENDAR_STYLE } from "@/constants/calendarStyle";
import Modal from "./ModalMaterial";

interface Props {
  setValue: UseFormSetValue<PostType> | any;
  closeModal: () => void;
}

/**
 * TODO: 바텀시트로 변경 예정
 */
const CalendarModal = ({ setValue, closeModal }: Props) => {
  const [range, setRange] = useState<DateRange | undefined>();

  useEffect(() => {
    if (range?.from) {
      if (!range.to) {
        setValue("startDate", format(range.from, "yyyy-MM-dd"));
      } else if (range.to) {
        setValue("startDate", format(range.from, "yyyy-MM-dd"));
        setValue("endDate", format(range.to, "yyyy-MM-dd"));
      }
    }
  }, [range]);

  return (
    <>
      <style>{CALENDAR_STYLE}</style>
      <Modal.Frame closeModal={closeModal}>
        <div onClick={(event) => event.stopPropagation()}>
          <DayPicker
            id="test"
            mode="range"
            selected={range}
            onSelect={setRange}
            modifiersClassNames={{ today: "my-today", selected: "my-selected", range_end: "my-day_range_end", range_start: "my-day_range_end" }}
          />
        </div>
      </Modal.Frame>
    </>
  );
};

export default CalendarModal;
