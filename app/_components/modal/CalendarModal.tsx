"use client";

import { PostType } from "@/(route)/post/page";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { UseFormSetValue } from "react-hook-form";
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
    <Modal.Frame closeModal={closeModal}>
      <div onClick={(event) => event.stopPropagation()}>
        <DayPicker id="test" mode="range" selected={range} onSelect={setRange} />
      </div>
    </Modal.Frame>
  );
};

export default CalendarModal;
