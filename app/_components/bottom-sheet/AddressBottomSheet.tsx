import { PostType } from "@/(route)/post/page";
import DaumPostcodeEmbed from "react-daum-postcode";
import { useFormContext } from "react-hook-form";
import BottomSheet from "./BottomSheetMaterial";

interface Props {
  closeBottomSheet: () => void;
}

const AddressBottomSheet = ({ closeBottomSheet }: Props) => {
  const { setValue } = useFormContext<PostType>();

  return (
    <BottomSheet.Frame closeBottomSheet={closeBottomSheet}>
      <BottomSheet.Title>주소 검색</BottomSheet.Title>
      <div className="w-full pt-8">
        <DaumPostcodeEmbed
          className="!h-[48rem]"
          animation
          onComplete={(data: any) => {
            setValue("address", data.address);
            closeBottomSheet();
          }}
          autoClose={false}
        />
      </div>
    </BottomSheet.Frame>
  );
};

export default AddressBottomSheet;
