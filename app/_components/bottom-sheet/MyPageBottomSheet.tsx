import SettingList from "@/(route)/(bottom-nav)/mypage/_components/SettingList";
import BottomSheet from "./BottomSheetMaterial";

interface Props {
  closeBottomSheet: () => void;
  refs: {
    sheet: (node: HTMLElement | null) => void;
    content: (node: HTMLElement | null) => void;
  };
  isOpener: boolean;
}

const MyPageBottomSheet = ({ closeBottomSheet, refs, isOpener }: Props) => {
  return (
    <>
      <BottomSheet.Frame closeBottomSheet={closeBottomSheet} ref={refs.sheet}>
        <SettingList isOpener={isOpener} />
      </BottomSheet.Frame>
    </>
  );
};

export default MyPageBottomSheet;
