"use client";

import BottomSheetFrame from "@/components/bottom-sheet/BottomSheetFrame";
import { useBottomSheet } from "@/hooks/useBottomSheet";

const Header = () => {
  const { bottomSheet, openBottomSheet, closeBottomSheet } = useBottomSheet();

  const openKebeb = () => {
    openBottomSheet("event-kebab");
  };

  return (
    <>
      <header className="flex items-center justify-between">
        <span>파이키</span>
        <button onClick={openKebeb}>케밥 버튼</button>
      </header>
      {bottomSheet === "event-kebab" && (
        <BottomSheetFrame closeBottomSheet={closeBottomSheet}>
          <button>수정하기</button>
          <button>신고히기</button>
        </BottomSheetFrame>
      )}
    </>
  );
};

export default Header;
