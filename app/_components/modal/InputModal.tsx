import { ModalBaseType } from "@/types/index";
import InputText from "../input/InputText";
import Modal from "./ModalMaterial";

interface Props extends ModalBaseType {
  title: string;
  label?: string;
  btnText: string;
  handleBtnClick?: () => void;
  name: string;
}

/**
 * title과 input으로 이루어진 모달 컴포넌트
 * @param title Modal의 title
 * @param label input 컴포넌트의 label
 */
const InputModal = ({ title, label, closeModal, handleBtnClick, btnText, ...props }: Props) => {
  return (
    <Modal.Frame closeModal={closeModal}>
      <Modal.Title>{title}</Modal.Title>
      <InputText {...props}>{label}</InputText>
      <Modal.Button handleYesClick={handleBtnClick || closeModal}>{btnText}</Modal.Button>
    </Modal.Frame>
  );
};

export default InputModal;
