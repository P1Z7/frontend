"use client";

import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useEffect, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { FieldValues, UseFormSetValue } from "react-hook-form";
import ModalFrame from "../ModalFrame";

interface Props {
  setValue: UseFormSetValue<FieldValues>;
}

const CalendarModal = ({ setValue }: Props) => {
  const [range, setRange] = useState<DateRange | undefined>();

  useEffect(() => {
    if (range?.from) {
      if (!range.to) {
        setValue("start_date", format(range.from, "PPP EE", { locale: ko }));
      } else if (range.to) {
        setValue("start_date", format(range.from, "PPP EE", { locale: ko }));
        setValue("end_date", format(range.to, "PPP EE", { locale: ko }));
      }
    }
  }, [range]);

  return (
    <ModalFrame>
      <div onClick={(event) => event.stopPropagation()}>
        <DayPicker id="test" mode="range" selected={range} onSelect={setRange} />
      </div>
    </ModalFrame>
  );
};

export default CalendarModal;
