import { ButtonHTMLAttributes, ReactNode } from "react";
import { BottomSheetBaseType, EventType } from "@/types/index";
import BottomSheet from "./BottomSheetMaterial";

interface Props extends BottomSheetBaseType {
  setEventFilter: (event: EventType | "") => void;
  selected: EventType | "";
}

const EventBottomSheet = ({ closeBottomSheet, refs, setEventFilter, selected }: Props) => {
  const handleClick = (event: EventType | "") => {
    if (selected === event) {
      setEventFilter("");
      closeBottomSheet();
      return;
    }
    setEventFilter(event);
    closeBottomSheet();
  };

  return (
    <BottomSheet.Frame closeBottomSheet={closeBottomSheet} ref={refs.sheet}>
      <BottomSheet.Title>행사유형</BottomSheet.Title>
      <div ref={refs.content} className="w-full pb-12 pt-8">
        {EVENTS.map((event) => (
          <EventButton onClick={() => handleClick(event)} selected={selected === event} key={event}>
            {event}
          </EventButton>
        ))}
      </div>
    </BottomSheet.Frame>
  );
};

export default EventBottomSheet;

export const EVENTS = ["카페", "꽃집", "팬광고", "포토부스", "상영회", "기타"] as const;

interface EventButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  selected: boolean;
}

const EventButton = ({ children, onClick, selected }: EventButtonProps) => {
  return (
    <button onClick={onClick} className={`w-full py-8 text-14 font-400 hover:bg-gray-50 ${selected ? "bg-gray-50" : "bg-white-black"}`}>
      {children}
    </button>
  );
};
