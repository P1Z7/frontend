import SearchInput from "../input/SearchInput";
import BottomSheetFrame from "./BottomSheetFrame";

interface Props {
  closeBottomSheet: () => void;
}
const StarBottomSheet = ({ closeBottomSheet }: Props) => {
  //group데이터 API 콜

  return (
    <BottomSheetFrame closeBottomSheet={closeBottomSheet}>
      <div className="flex flex-col gap-20 p-20 text-16" onClick={(event) => event.stopPropagation()}>
        <SearchInput />
        <div>안녕 연예인 목록이야!!</div>
        <button className="flex h-48 items-center justify-center rounded-sm border-2 p-16">선택완료</button>
      </div>
    </BottomSheetFrame>
  );
};

export default StarBottomSheet;
