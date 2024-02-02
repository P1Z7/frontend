"use client";

import { usePathname, useRouter } from "next/navigation";
import BottomSheetFrame from "@/components/bottom-sheet/BottomSheetFrame";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import ArrowLeft from "@/public/icon/arrow-left_lg.svg";
import KebabButton from "@/public/icon/kebab.svg";

interface Props {
  params: { id: number };
}

const Header = ({ params }: Props) => {
  const { bottomSheet, openBottomSheet, closeBottomSheet } = useBottomSheet();

  const openKebeb = () => {
    openBottomSheet("event-kebab");
  };

  const router = useRouter();
  const pathname = usePathname();

  let title = "카페 이름"; // 기본값

  if (pathname === `/event/${params.id}`) {
    title = "카페 이름"; // 추후 id에 따른 카페 이름으로 변경
  } else if (pathname === `/event/${params.id}/post`) {
    title = "후기 작성하기";
  } else if (pathname === `/event/${params.id}/edit`) {
    title = "수정 등록하기";
  } else if (pathname === `/event/${params.id}/approve`) {
    title = "수정 승인하기";
  }

  return (
    <>
      <header className="fixed left-0 top-0 z-nav flex h-72 w-360 gap-16 border-b border-gray-50 bg-white-white px-20 pb-12 pt-36">
        <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
        <h1 className="w-240 text-center text-16 font-500 text-gray-900">{title}</h1>
        {pathname === `/event/${params.id}` && <KebabButton onClick={openKebeb} className="cursor-pointer" />}
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
