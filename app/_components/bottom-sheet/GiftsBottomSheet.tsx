import { BottomSheetBaseType, GiftType } from "@/types/index";
import ChipButton from "../chip/ChipButton";
import BottomSheet from "./BottomSheetMaterial";

const GIFTS = ["컵홀더", "포스터", "포토카드", "굿즈", "엽서", "스티커", "티켓", "기타"] as const;

interface Props extends BottomSheetBaseType {
  setGiftsFilter: (gift: GiftType) => void;
  selected: GiftType[];
}

const GiftsBottomSheet = ({ closeBottomSheet, refs, setGiftsFilter, selected }: Props) => {
  return (
    <BottomSheet.Frame closeBottomSheet={closeBottomSheet} ref={refs.sheet}>
      <BottomSheet.Title>특전 선택</BottomSheet.Title>
      <div ref={refs.content}>
        <div className="flex flex-wrap gap-x-8 gap-y-12 px-24 py-20">
          {GIFTS.map((gift) => (
            <ChipButton label={gift} onClick={() => setGiftsFilter(gift)} selected={selected.includes(gift)} />
          ))}
        </div>
        <BottomSheet.Button onClick={closeBottomSheet} />
      </div>
    </BottomSheet.Frame>
  );
};

export default GiftsBottomSheet;
