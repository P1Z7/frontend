import { BottomSheetBaseType } from "@/types/index";
import BottomSheet from "./BottomSheetMaterial";
import ArtistContent from "./content/ArtistContent";

interface Props extends BottomSheetBaseType {
  isFirst?: boolean;
}

const StarBottomSheet = ({ closeBottomSheet, refs, isFirst = false }: Props) => {
  return (
    <BottomSheet.Frame closeBottomSheet={closeBottomSheet} ref={refs.sheet}>
      <BottomSheet.Title>아티스트 선택</BottomSheet.Title>
      <ArtistContent isFirst={isFirst} contentRef={refs.content} />
      <BottomSheet.Button onClick={closeBottomSheet} />
    </BottomSheet.Frame>
  );
};

export default StarBottomSheet;
