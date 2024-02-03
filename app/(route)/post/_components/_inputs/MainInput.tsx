import { useFormContext } from "react-hook-form";
import AddressBottomSheet from "@/components/bottom-sheet/AddressBottomSheet";
import CalenderBottomSheet from "@/components/bottom-sheet/CalendarBottomSheet";
import InputText from "@/components/input/InputText";
import AddressModal from "@/components/modal/AddressModal";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import { useModal } from "@/hooks/useModal";
import { validateEdit } from "@/utils/editValidate";
import { PostType } from "../../page";

const MainInput = () => {
  const { modal, openModal, closeModal } = useModal();
  const { bottomSheet, openBottomSheet, closeBottomSheet } = useBottomSheet();
  const {
    formState: { defaultValues },
    watch,
    setValue,
  } = useFormContext<PostType>();
  const { title, address, detailAddress, startDate, endDate } = watch();

  return (
    <>
      <InputText name="title" placeholder="장소 이름을 입력하세요." rules={{ required: "제목을 입력해주세요." }} isEdit={validateEdit(defaultValues?.title !== title)}>
        장소 이름
      </InputText>
      <div className="flex flex-col">
        <InputText name="address" placeholder="도로명주소 검색" readOnly onClick={() => openBottomSheet("address")} isEdit={validateEdit(defaultValues?.address !== address)}>
          주소
        </InputText>
        <InputText name="detailAddress" placeholder="상세 주소 입력" isEdit={defaultValues?.detailAddress !== detailAddress} />
      </div>
      <div className="flex flex-col">
        기간
        <div className="flex">
          <div className="w-1/2">
            <InputText name="startDate" placeholder="날짜 선택" readOnly onClick={() => openBottomSheet("date")} isEdit={validateEdit(defaultValues?.startDate !== startDate)} />
          </div>
          <div className="flex items-center px-4">~</div>
          <div className="w-1/2">
            <InputText name="endDate" placeholder="날짜 선택" readOnly onClick={() => openBottomSheet("date")} isEdit={validateEdit(defaultValues?.endDate !== endDate)} />
          </div>
        </div>
      </div>
      {bottomSheet === "address" && <AddressBottomSheet closeBottomSheet={closeBottomSheet} />}
      {bottomSheet === "date" && <CalenderBottomSheet closeBottomSheet={closeBottomSheet} />}
    </>
  );
};

export default MainInput;