import { ModalBaseType } from "@/types/index";
import InputArea from "../input/InputArea";
import ModalFrame from "./ModalFrame";
import { ModalButton, ModalTitle } from "./ModalMaterial";

interface Props extends ModalBaseType {
  title: string;
  btnText: string;
  handleBtnClick: () => void;
  textareaId: string;
  placeholder?: string;
}

/**
 * title과 textarea로 이루어진 모달
 */
const TextModal = ({ closeModal, handleBtnClick, title, btnText, textareaId, placeholder = "내용을 입력하세요." }: Props) => {
  return (
    <ModalFrame closeModal={closeModal}>
      <ModalTitle>{title}</ModalTitle>
      <InputArea name={textareaId} placeholder={placeholder} />
      <ModalButton handleYesClick={handleBtnClick}>{btnText}</ModalButton>
    </ModalFrame>
  );
};

export default TextModal;
