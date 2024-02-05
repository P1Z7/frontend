import { BottomSheetBaseType } from "@/types/index";
import BottomSheet from "./BottomSheetMaterial";

interface Props extends BottomSheetBaseType {
  setGiftsFilter: (gift: string) => void;
}

const GiftsBottomSheet = ({ closeBottomSheet, refs, setGiftsFilter }: Props) => {
  return (
    <BottomSheet.Frame closeBottomSheet={closeBottomSheet} ref={refs.sheet}>
      <BottomSheet.Title>특전 선택</BottomSheet.Title>
      <div ref={refs.content}>
        <button onClick={() => setGiftsFilter("포토카드")}>포토카드</button>
        <BottomSheet.Button onClick={closeBottomSheet} />
      </div>
    </BottomSheet.Frame>
  );
};

export default GiftsBottomSheet;
