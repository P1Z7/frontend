"use client";

import classNames from "classnames";
import React, { ReactNode } from "react";
import useNotScroll from "@/hooks/useNotScroll";
import { ModalBaseType } from "@/types/index";
import CloseIcon from "@/public/icon/close.svg";
import Button from "../button";
import ModalPortal from "./ModalPortal";

const FRAME_STYLE = {
  bg: {
    mobile: "relative w-[30.8rem] rounded-md bg-white-black px-20 pb-20 pt-40 text-16",
    pc: "relative w-[54.8rem] rounded-md bg-white-black p-32 text-16",
  },
  closeBtn: {
    mobile: "absolute right-12 top-12",
    pc: "absolute right-32 top-32",
  },
};

interface ModalFrameProps extends ModalBaseType {
  children: ReactNode;
  hasNotCloseBtn?: boolean;
  type?: "mobile" | "pc";
}

const ModalFrame = ({ children, closeModal, type = "mobile", hasNotCloseBtn = false }: ModalFrameProps) => {
  useNotScroll();

  return (
    <ModalPortal>
      <div onClick={closeModal} className="fixed left-0 top-0 z-popup flex h-screen w-full items-center justify-center bg-gray-900 bg-opacity-70 text-center">
        <div className={FRAME_STYLE.bg[type]}>
          {hasNotCloseBtn || (
            <button onClick={closeModal} className={FRAME_STYLE.closeBtn[type]}>
              <CloseIcon stroke="#C1C5CC" width={24} height={24} />
            </button>
          )}
          <div className="flex flex-col gap-20" onClick={(event) => event.stopPropagation()}>
            {children}
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

interface ModalTitleProps {
  children: ReactNode;
}

const ModalTitle = ({ children }: ModalTitleProps) => {
  return <div className="px-20 text-center font-500">{children}</div>;
};

interface ModalButtonProps {
  hasCancelBtn?: boolean;
  handleYesClick: () => void;
  handleNoClick?: () => void;
  children: ReactNode;
}

const ModalButton = ({ hasCancelBtn = false, handleYesClick, handleNoClick, children }: ModalButtonProps) => {
  return (
    <div className={classNames("justify-center px-20", { "grid grid-cols-2 gap-[10px]": hasCancelBtn })}>
      <Button type="lined" onClick={handleYesClick}>
        {children}
      </Button>
      {hasCancelBtn && (
        <Button type="lined" onClick={handleNoClick}>
          취소
        </Button>
      )}
    </div>
  );
};

const Modal = Object.assign(ModalFrame, {
  Frame: ModalFrame,
  Title: ModalTitle,
  Button: ModalButton,
});

export default Modal;
