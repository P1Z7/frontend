"use client";

import BottomSheetFrame from "@/components/bottomSheet/BottomSheetFrame";
import { useStore } from "@/store/index";

const Header = () => {
  const { bottomSheet, openBottomSheet } = useStore((state) => ({ bottomSheet: state.bottomSheet, openBottomSheet: state.openBottomSheet }));

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
        <BottomSheetFrame>
          <button>수정하기</button>
          <button>신고히기</button>
        </BottomSheetFrame>
      )}
    </>
  );
};

export default Header;
