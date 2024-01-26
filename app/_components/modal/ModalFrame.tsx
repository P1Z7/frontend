"use client";

import { ReactNode } from "react";
import ModalPortal from "./ModalPortal";

interface Props {
  children: ReactNode;
  closeModal: () => void;
}

const ModalFrame = ({ children, closeModal }: Props) => {
  return (
    <ModalPortal>
      <div onClick={closeModal} className="fixed left-0 top-0 flex h-screen w-full items-center justify-center bg-black bg-opacity-70 text-center">
        <div className="w-[410px] bg-white">
          <div onClick={closeModal} className="cursor-pointer">
            닫기 버튼
          </div>
          <div>{children}</div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default ModalFrame;
