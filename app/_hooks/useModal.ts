import { useState } from "react";

/**
 * 모달 호출하는 커스텀 훅
 *
 * modal을 string으로 관리하기 때문에 한 페이지에서 여러 모달을 부를 수 있습니다.
 */
export const useModal = () => {
  const [modal, setModal] = useState("");

  const openModal = (type: string) => {
    setModal(type);
  };

  const closeModal = () => {
    setModal("");
  };

  return { modal, openModal, closeModal };
};
