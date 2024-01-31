import { ModalBaseType } from "@/types/index";
import InputText from "../input/InputText";
import ModalFrame from "./ModalFrame";
import { ModalButton, ModalTitle } from "./ModalMaterial";

interface Props extends ModalBaseType {
  title: string;
  label: string;
  btnText: string;
  placeholder?: string;
  isRequired?: boolean;
  handleBtnClick: () => void;
}

/**
 * title과 input으로 이루어진 모달 컴포넌트
 */
const InputModal = ({ title, label, closeModal, handleBtnClick, btnText, placeholder = "내용을 입력하세요.", isRequired = false }: Props) => {
  return (
    <ModalFrame closeModal={closeModal}>
      <ModalTitle>{title}</ModalTitle>
      <InputText name={label} placeholder={placeholder} rules={{ required: isRequired }}>
        {label}
      </InputText>
      <ModalButton handleYesClick={handleBtnClick}>{btnText}</ModalButton>
    </ModalFrame>
  );
};

export default InputModal;
