import { ModalBaseType } from "@/types/index";
import InputArea from "../input/InputArea";
import ModalFrame from "./ModalFrame";
import { ModalButton, ModalTitle } from "./ModalMaterial";

interface Props extends ModalBaseType {
  title: string;
  btnText: string;
  handleBtnClick?: () => void;
  textareaId: string;
}

/**
 * title과 textarea로 이루어진 모달
 */
const TextModal = ({ closeModal, handleBtnClick, title, btnText, textareaId, ...props }: Props) => {
  return (
    <ModalFrame closeModal={closeModal}>
      <ModalTitle>{title}</ModalTitle>
      <InputArea name={textareaId} {...props} />
      <ModalButton handleYesClick={handleBtnClick || closeModal}>{btnText}</ModalButton>
    </ModalFrame>
  );
};

export default TextModal;
