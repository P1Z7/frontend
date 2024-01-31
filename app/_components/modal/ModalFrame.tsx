"use client";

import { ReactNode } from "react";
import { ModalBaseType } from "@/types/index";
import CloseIcon from "@/public/icon/close.svg";
import ModalPortal from "./ModalPortal";

interface Props extends ModalBaseType {
  children: ReactNode;
}

const ModalFrame = ({ children, closeModal }: Props) => {
  return (
    <ModalPortal>
      <div onClick={closeModal} className="fixed left-0 top-0 z-popup flex h-screen w-full items-center justify-center bg-gray-900 bg-opacity-70 text-center">
        <div className="bg-white-black relative w-[308px] rounded-md px-20 pb-20 pt-40 text-16">
          <button onClick={closeModal} className="absolute right-12 top-12">
            <CloseIcon stroke="#C1C5CC" />
          </button>
          <div className="flex flex-col gap-20" onClick={(event) => event.stopPropagation()}>
            {children}
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default ModalFrame;
