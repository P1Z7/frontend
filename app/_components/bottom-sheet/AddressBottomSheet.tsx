import { PostType } from "@/(route)/post/page";
import DaumPostcodeEmbed from "react-daum-postcode";
import { useFormContext } from "react-hook-form";
import { BottomSheetBaseType } from "@/types/index";
import BottomSheet from "./BottomSheetMaterial";

const AddressBottomSheet = ({ closeBottomSheet, refs }: BottomSheetBaseType) => {
  const { setValue } = useFormContext<PostType>();

  return (
    <BottomSheet.Frame closeBottomSheet={closeBottomSheet} ref={refs.sheet}>
      <BottomSheet.Title>주소 검색</BottomSheet.Title>
      <div ref={refs.content} className="w-full pt-8">
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
