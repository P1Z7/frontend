import { ModalBaseType } from "@/types/index";
import InputText from "../input/InputText";
import ModalFrame from "./ModalFrame";
import { ModalButton, ModalTitle } from "./ModalMaterial";

interface Props extends ModalBaseType {
  title: string;
  label: string;
  btnText: string;
  handleBtnClick?: () => void;
}

/**
 * title과 input으로 이루어진 모달 컴포넌트
 * @param title Modal의 title
 * @param label input 컴포넌트의 label
 */
const InputModal = ({ title, label, closeModal, handleBtnClick, btnText, ...props }: Props) => {
  return (
    <ModalFrame closeModal={closeModal}>
      <ModalTitle>{title}</ModalTitle>
      <InputText name={label} {...props}>
        {label}
      </InputText>
      <ModalButton handleYesClick={handleBtnClick || closeModal}>{btnText}</ModalButton>
    </ModalFrame>
  );
};

export default InputModal;
