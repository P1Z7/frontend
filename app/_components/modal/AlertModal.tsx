import { ReactNode } from "react";
import { ModalBaseType } from "@/types/index";
import ModalFrame from "./ModalFrame";
import { ModalButton, ModalTitle } from "./ModalMaterial";

interface AlertModalType extends ModalBaseType {
  children: ReactNode;
  hasCancleBtn?: boolean;
}

/**
 * @param children 경고 문구
 * @param hasCancleBtn 취소버튼 유무
 */
const AlertModal = ({ children, hasCancleBtn, closeModal }: AlertModalType) => {
  return (
    <ModalFrame closeModal={closeModal}>
      <ModalTitle>{children}</ModalTitle>
      <ModalButton hasCancelBtn={hasCancleBtn} handleYesClick={closeModal}>
        확인
      </ModalButton>
    </ModalFrame>
  );
};

export default AlertModal;
