import { BottomSheetBaseType } from "@/types/index";
import BottomSheet from "./BottomSheetMaterial";
import EventTypeList from "./content/EventTypeList";

const EventTypeBottomSheet = ({ closeBottomSheet, refs }: BottomSheetBaseType) => {
  return (
    <BottomSheet.Frame closeBottomSheet={closeBottomSheet} ref={refs.sheet}>
      <BottomSheet.Title>행사 유형 선택</BottomSheet.Title>
      <EventTypeList handleClickFunc={closeBottomSheet} contentRef={refs.content} />
    </BottomSheet.Frame>
  );
};

export default EventTypeBottomSheet;
