import { ReactNode } from "react";
import { ModalBaseType } from "@/types/index";
import Modal from "./ModalMaterial";

interface AlertModalType extends ModalBaseType {
  children: ReactNode;
  hasCancelBtn?: boolean;
  handleBtnClick?: () => void;
  handleCancelClick?: () => void;
}

/**
 * @param children 경고 문구
 * @param hasCancleBtn 취소버튼 유무
 */
const AlertModal = ({ children, hasCancelBtn, closeModal, handleBtnClick, handleCancelClick }: AlertModalType) => {
  return (
    <Modal.Frame closeModal={closeModal} hasNotCloseBtn>
      <Modal.Title>{children}</Modal.Title>
      <Modal.Button hasCancelBtn={hasCancelBtn} handleYesClick={handleBtnClick || closeModal} handleNoClick={handleCancelClick || closeModal}>
        확인
      </Modal.Button>
    </Modal.Frame>
  );
};

export default AlertModal;
