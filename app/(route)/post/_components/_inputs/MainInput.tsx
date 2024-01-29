import { usePathname } from "next/navigation";
import { UseFormSetValue, useFormContext } from "react-hook-form";
import InputText from "@/components/input/InputText";
import AddressModal from "@/components/modal/AddressModal";
import CalendarModal from "@/components/modal/CalendarModal";
import { useModal } from "@/hooks/useModal";
import { useStore } from "@/store/index";
import { validateEdit } from "@/utils/editValidate";
import { PostType } from "../../page";

interface Props {
  setValue: UseFormSetValue<PostType>;
}

const MainInput = ({ setValue }: Props) => {
  const { modal, openModal, closeModal } = useModal();
  const {
    formState: { defaultValues },
    watch,
  } = useFormContext<PostType>();
  const { title, address, detailAddress, startDate, endDate } = watch();

  return (
    <>
      <InputText name="title" placeholder="카페 이름" rules={{ required: "제목을 입력해주세요." }} isEdit={validateEdit(defaultValues?.title !== title)}>
        제목
      </InputText>
      <InputText name="address" placeholder="도로명주소 검색" readOnly onClick={() => openModal("address")} isEdit={validateEdit(defaultValues?.address !== address)}>
        주소
      </InputText>
      <InputText name="detailAddress" placeholder="상세주소 입력" isEdit={defaultValues?.detailAddress !== detailAddress} />
      <InputText name="startDate" placeholder="날짜 선택" readOnly onClick={() => openModal("date")} isEdit={validateEdit(defaultValues?.startDate !== startDate)}>
        기간
      </InputText>
      <InputText name="endDate" placeholder="날짜 선택" readOnly onClick={() => openModal("date")} isEdit={validateEdit(defaultValues?.endDate !== endDate)} />
      {modal === "address" && <AddressModal setValue={setValue} closeModal={closeModal} />}
      {modal === "date" && <CalendarModal setValue={setValue} closeModal={closeModal} />}
    </>
  );
};

export default MainInput;
