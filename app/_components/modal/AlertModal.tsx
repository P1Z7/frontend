import { ReactNode } from "react";
import { ModalBaseType } from "@/types/index";
import ModalFrame from "./ModalFrame";
import { ModalButton, ModalTitle } from "./ModalMaterial";

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
    <ModalFrame closeModal={closeModal}>
      <ModalTitle>{children}</ModalTitle>
      <ModalButton hasCancelBtn={hasCancelBtn} handleYesClick={handleBtnClick || closeModal} handleNoClick={closeModal}>
        확인
      </ModalButton>
    </ModalFrame>
  );
};

export default AlertModal;
