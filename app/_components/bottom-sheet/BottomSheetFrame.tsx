"use client";

import { ReactNode } from "react";
import BottomSheetPortal from "./BottomSheetPortal";

interface Props {
  children: ReactNode;
  closeBottomSheet: () => void;
}

const BottomSheetFrame = ({ children, closeBottomSheet }: Props) => {
  return (
    <BottomSheetPortal>
      <div onClick={closeBottomSheet} className="fixed bottom-0 left-0 flex h-screen w-full items-end justify-center bg-black bg-opacity-70 text-center">
        <div className="flex w-full animate-slideUp flex-col rounded-t-md bg-white py-24">{children}</div>
      </div>
    </BottomSheetPortal>
  );
};

export default BottomSheetFrame;
