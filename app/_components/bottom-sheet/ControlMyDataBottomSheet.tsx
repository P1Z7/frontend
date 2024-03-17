import { BottomSheetBaseType } from "@/types/index";
import KebabContents from "../card/KebabContents";
import BottomSheet from "./BottomSheetMaterial";

interface Props extends BottomSheetBaseType {
  refs: {
    sheet: (node: HTMLElement | null) => void;
    content: (node: HTMLElement | null) => void;
  };
  eventId: string;
  setDep?: (dep: string) => void;
  type: "event" | "review";
}

const ControlMyDataBottomSheet = ({ closeBottomSheet, refs, eventId, setDep, type }: Props) => {
  return (
    <BottomSheet.Frame closeBottomSheet={closeBottomSheet} ref={refs.sheet}>
      <KebabContents id={eventId} setDep={setDep} type={type} />
    </BottomSheet.Frame>
  );
};

export default ControlMyDataBottomSheet;
