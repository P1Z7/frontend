import { ModalBaseType } from "@/types/index";
import InputArea from "../input/InputArea";
import Modal from "./ModalMaterial";

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
    <Modal.Frame closeModal={closeModal}>
      <Modal.Title>{title}</Modal.Title>
      <InputArea name={textareaId} {...props} />
      <Modal.Button handleYesClick={handleBtnClick || closeModal}>{btnText}</Modal.Button>
    </Modal.Frame>
  );
};

export default TextModal;
