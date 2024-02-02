"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import BottomSheetFrame from "@/components/bottom-sheet/BottomSheetFrame";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import useHeaderTitle from "@/hooks/useHeaderTitle";
import ArrowLeft from "@/public/icon/arrow-left_lg.svg";
import KebabButton from "@/public/icon/kebab.svg";

const Header = () => {
  const { bottomSheet, openBottomSheet, closeBottomSheet } = useBottomSheet();

  const openKebeb = () => {
    openBottomSheet("event-kebab");
  };

  const router = useRouter();
  const pathname = usePathname();
  const { id } = useParams();
  const title = useHeaderTitle();

  return (
    <>
      <header className="sticky left-0 top-0 z-nav flex h-72 w-full justify-between border-b border-gray-50 bg-white-white px-20 pb-12 pt-36">
        <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
        <h1 className="w-full text-center text-16 font-500 text-gray-900">{title}</h1>
        {pathname === `/event/${id}` && <KebabButton onClick={openKebeb} className="cursor-pointer" />}
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
