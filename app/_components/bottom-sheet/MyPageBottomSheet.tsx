import SettingList from "@/(route)/mypage/_components/SettingList";
import BottomSheet from "./BottomSheetMaterial";

interface Props {
  closeBottomSheet: () => void;
  refs: {
    sheet: (node: HTMLElement | null) => void;
    content: (node: HTMLElement | null) => void;
  };
  isOpener: boolean;
  openModal: (modal: string) => void;
}

const MyPageBottomSheet = ({ closeBottomSheet, refs, isOpener, openModal }: Props) => {
  return (
    <>
      <BottomSheet.Frame closeBottomSheet={closeBottomSheet} ref={refs.sheet}>
        <SettingList isOpener={isOpener} closeBottomSheet={closeBottomSheet} openModal={openModal} />
      </BottomSheet.Frame>
    </>
  );
};

export default MyPageBottomSheet;
