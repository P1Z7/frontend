import classNames from "classnames";
import React, { ReactNode } from "react";
import Button from "../button";

interface ModalTitleProps {
  children: ReactNode;
}

export const ModalTitle = ({ children }: ModalTitleProps) => {
  return <div className="px-20 text-center font-500">{children}</div>;
};

interface ModalButtonProps {
  hasCancelBtn?: boolean;
  handleYesClick: () => void;
  handleNoClick?: () => void;
  children: ReactNode;
}

export const ModalButton = ({ hasCancelBtn = false, handleYesClick, handleNoClick, children }: ModalButtonProps) => {
  //다시 레이아웃 예정
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
