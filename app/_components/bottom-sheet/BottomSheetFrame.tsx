"use client";

import { ReactNode } from "react";
import { useStore } from "@/store/index";
import BottomSheetPortal from "./BottomSheetPortal";

const BottomSheetFrame = ({ children }: { children: ReactNode }) => {
  const { closeBottomSheet } = useStore((state) => ({ closeBottomSheet: state.closeBottomSheet }));

  return (
    <BottomSheetPortal>
      <div onClick={closeBottomSheet} className="fixed bottom-0 left-0 flex h-screen w-full items-end justify-center bg-black bg-opacity-70 text-center">
        <div className="animate-slideUp flex w-full flex-col rounded-t-md bg-white py-24">{children}</div>
      </div>
    </BottomSheetPortal>
  );
};

export default BottomSheetFrame;
