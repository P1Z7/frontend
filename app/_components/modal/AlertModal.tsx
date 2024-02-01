import { ReactNode } from "react";
import { ModalBaseType } from "@/types/index";
import Modal from "./ModalMaterial";

interface AlertModalType extends ModalBaseType {
  children: ReactNode;
  hasCancelBtn?: boolean;
  handleBtnClick?: () => void;
}

/**
 * @param children 경고 문구
 * @param hasCancleBtn 취소버튼 유무
 */
const AlertModal = ({ children, hasCancelBtn, closeModal, handleBtnClick }: AlertModalType) => {
  return (
    <Modal.Frame closeModal={closeModal}>
      <Modal.Title>{children}</Modal.Title>
      <Modal.Button hasCancelBtn={hasCancelBtn} handleYesClick={handleBtnClick || closeModal} handleNoClick={closeModal}>
        확인
      </Modal.Button>
    </Modal.Frame>
  );
};

export default AlertModal;
