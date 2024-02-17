"use client";

import { ReactNode, SyntheticEvent, forwardRef } from "react";
import Button from "@/components/button";
import CloseIcon from "@/public/icon/close.svg";
import BottomSheetPortal from "./BottomSheetPortal";

interface BottomSheetFrameProps {
  children: ReactNode;
  closeBottomSheet: () => void;
}

const BottomSheetFrame = forwardRef<HTMLDivElement, BottomSheetFrameProps>(({ children, closeBottomSheet }, ref) => {
  return (
    <BottomSheetPortal>
      <div onClick={closeBottomSheet} className="fixed bottom-0 left-0 z-popup flex h-screen w-full items-end justify-center bg-gray-900 bg-opacity-70">
        <div
          ref={ref}
          onClick={(e: SyntheticEvent) => e.stopPropagation()}
          className="relative flex max-h-[55.6rem] w-full transform animate-slideUp flex-col overflow-hidden rounded-t-md bg-white-black pt-16 transition duration-150 ease-out"
        >
          <button onClick={closeBottomSheet} className="fixed right-20 top-16 z-nav">
            <CloseIcon stroke="#C1C5CC" width="24" height="24" />
          </button>
          <div className="overflow-y-auto">{children}</div>
        </div>
      </div>
    </BottomSheetPortal>
  );
});
BottomSheetFrame.displayName = "BottomSheetFrame";

interface BottomSheetTitleProps {
  children: ReactNode;
}

const BottomSheetTitle = ({ children }: BottomSheetTitleProps) => {
  return <div className="sticky top-0 bg-white-black px-20 text-14 font-500">{children}</div>;
};

interface BottomSheetButtonProps {
  onClick: () => void;
}

const BottomSheetButton = ({ onClick }: BottomSheetButtonProps) => {
  return (
    <div className="border-t border-gray-50 px-20 pb-24 pt-12">
      <Button onClick={onClick} type="lined">
        선택 완료
      </Button>
    </div>
  );
};

const BottomSheet = Object.assign(BottomSheetFrame, {
  Frame: BottomSheetFrame,
  Title: BottomSheetTitle,
  Button: BottomSheetButton,
});

export default BottomSheet;
