import BottomSheet from "./BottomSheetMaterial";

interface Props {
  closeBottomSheet: () => void;
  setGiftsFilter: (gift: string) => void;
}

const GiftsBottomSheet = ({ closeBottomSheet, setGiftsFilter }: Props) => {
  return (
    <BottomSheet.Frame closeBottomSheet={closeBottomSheet}>
      <BottomSheet.Title>특전 선택</BottomSheet.Title>
      <button onClick={() => setGiftsFilter("포토카드")}>포토카드</button>
      <BottomSheet.Button onClick={closeBottomSheet} />
    </BottomSheet.Frame>
  );
};

export default GiftsBottomSheet;
