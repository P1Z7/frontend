"use client";

import { PostType } from "@/(route)/post/page";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useEffect, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { UseFormSetValue } from "react-hook-form";
import ModalFrame from "./ModalFrame";

interface Props {
  setValue: UseFormSetValue<PostType>;
  closeModal: () => void;
}

const CalendarModal = ({ setValue, closeModal }: Props) => {
  const [range, setRange] = useState<DateRange | undefined>();

  useEffect(() => {
    if (range?.from) {
      if (!range.to) {
        setValue("startDate", format(range.from, "PPP EE", { locale: ko }));
      } else if (range.to) {
        setValue("startDate", format(range.from, "PPP EE", { locale: ko }));
        setValue("endDate", format(range.to, "PPP EE", { locale: ko }));
      }
    }
  }, [range]);

  return (
    <ModalFrame closeModal={closeModal}>
      <div onClick={(event) => event.stopPropagation()}>
        <DayPicker id="test" mode="range" selected={range} onSelect={setRange} />
      </div>
    </ModalFrame>
  );
};

export default CalendarModal;
