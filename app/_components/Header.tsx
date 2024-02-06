"use client";

import classNames from "classnames";
import { useParams, usePathname, useRouter } from "next/navigation";
import BottomSheet from "@/components/bottom-sheet/BottomSheetMaterial";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import useHeaderTitle from "@/hooks/useHeaderTitle";
import ArrowLeft from "@/public/icon/arrow-left_lg.svg";
import KebabButton from "@/public/icon/kebab.svg";

interface Props {
  handleClick?: () => void;
}

const Header = ({ handleClick }: Props) => {
  const { bottomSheet, openBottomSheet, closeBottomSheet, refs } = useBottomSheet();

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
        <button onClick={handleClick || (() => router.back())} className="z-nav">
          <ArrowLeft />
        </button>
        <h1 className="absolute left-0 w-full text-center text-16 font-600 text-gray-900">{title}</h1>
        {pathname === `/event/${id}` && (
          <button onClick={openKebeb} className="z-nav">
            <KebabButton />
          </button>
        )}
      </header>
      {bottomSheet === "event-kebab" && (
        <BottomSheet.Frame closeBottomSheet={closeBottomSheet} ref={refs.sheet}>
          <div ref={refs.content}>
            <button>수정하기</button>
            <button>신고히기</button>
          </div>
        </BottomSheet.Frame>
      )}
    </>
  );
};

export default Header;
