import { BottomSheetBaseType } from "@/types/index";
import BottomSheet from "./BottomSheetMaterial";

interface Props extends BottomSheetBaseType {
  refs: {
    sheet: (node: HTMLElement | null) => void;
    content: (node: HTMLElement | null) => void;
  };
}

const MyPostsBottomSheet = ({ closeBottomSheet, refs }: Props) => {
  return (
    <BottomSheet.Frame closeBottomSheet={closeBottomSheet} ref={refs.sheet}>
      <ul className="flex h-fit w-full flex-col items-start pb-32 pt-16 text-16 text-gray-900">
        <li className="w-full cursor-pointer border-b border-gray-50 px-24 py-20">수정하기</li>
        <li className="w-full cursor-pointer border-b border-gray-50 px-24 py-20">삭제하기</li>
      </ul>
    </BottomSheet.Frame>
  );
};

export default MyPostsBottomSheet;
