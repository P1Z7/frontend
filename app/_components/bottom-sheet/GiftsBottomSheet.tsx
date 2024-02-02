import BottomSheetFrame from "./BottomSheetMaterial";

interface Props {
  closeBottomSheet: () => void;
  setGiftsFilter: (gift: string) => void;
}

const GiftsBottomSheet = ({ closeBottomSheet, setGiftsFilter }: Props) => {
  return (
    <BottomSheetFrame closeBottomSheet={closeBottomSheet}>
      <button onClick={() => setGiftsFilter("포토카드")}>포토카드</button>
    </BottomSheetFrame>
  );
};

export default GiftsBottomSheet;
