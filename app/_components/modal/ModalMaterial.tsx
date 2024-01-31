import React, { ReactNode } from "react";

interface ModalTitleProps {
  children: ReactNode;
}

export const ModalTitle = ({ children }: ModalTitleProps) => {
  return <div className="text-center font-500">{children}</div>;
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
    <div className="flex justify-center gap-[10px]">
      <button className="bg-main-purple" onClick={handleYesClick}>
        {children}
      </button>
      {hasCancelBtn && (
        <button className="bg-main-purple" onClick={handleNoClick}>
          취소
        </button>
      )}
    </div>
  );
};
