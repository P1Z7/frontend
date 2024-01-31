"use client";

import { ReactNode, SyntheticEvent } from "react";
import BottomSheetPortal from "./BottomSheetPortal";

interface Props {
  children: ReactNode;
  closeBottomSheet: () => void;
}

const BottomSheetFrame = ({ children, closeBottomSheet }: Props) => {
  return (
    <BottomSheetPortal>
      <div onClick={closeBottomSheet} className="fixed bottom-0 left-0 flex h-screen w-full items-end justify-center bg-black bg-opacity-70 text-center">
        <div onClick={(e: SyntheticEvent) => e.stopPropagation()} className="flex max-h-[55.6rem] w-full animate-slideUp flex-col overflow-y-auto rounded-t-md bg-white py-24">
          {children}
        </div>
      </div>
    </BottomSheetPortal>
  );
};

export default BottomSheetFrame;
