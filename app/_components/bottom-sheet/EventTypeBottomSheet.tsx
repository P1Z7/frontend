import { PostType } from "@/(route)/post/page";
import { useFormContext } from "react-hook-form";
import { BottomSheetBaseType } from "@/types/index";
import BottomSheet from "./BottomSheetMaterial";

const EVENT_TYPE_LIST = ["카페", "나눔", "팬광고", "팝업스토어", "상영회", "기타"];

const EventTypeBottomSheet = ({ closeBottomSheet, refs }: BottomSheetBaseType) => {
  const { setValue } = useFormContext<PostType>();

  const handleEventClick = (type: string) => {
    setValue("eventType", type);
    closeBottomSheet();
  };

  return (
    <BottomSheet.Frame closeBottomSheet={closeBottomSheet} ref={refs.sheet}>
      <BottomSheet.Title>행사 유형 선택</BottomSheet.Title>
      <ul className="pb-40" ref={refs.content}>
        {EVENT_TYPE_LIST.map((event) => (
          <li
            key={event}
            onClick={() => handleEventClick(event)}
            className="hover:bg-main-pink-50 cursor-pointer border-b border-gray-50 px-24 py-20 text-16 font-500 text-gray-900"
          >
            {event}
          </li>
        ))}
      </ul>
    </BottomSheet.Frame>
  );
};

export default EventTypeBottomSheet;
