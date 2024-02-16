"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BottomSheetBaseType } from "@/types/index";
import BottomSheet from "./BottomSheetMaterial";

interface Props extends BottomSheetBaseType {
  openReportModal: () => void;
}

const EventKebabBottomSheet = ({ closeBottomSheet, refs, openReportModal }: Props) => {
  const pathname = usePathname();
  const editEventUrl = pathname + "/edit";

  const handleReportClick = () => {
    closeBottomSheet();
    openReportModal();
  };

  return (
    <BottomSheet.Frame closeBottomSheet={closeBottomSheet} ref={refs.sheet}>
      <div className="h-20" />
      <div ref={refs.content} className="flex flex-col pb-40">
        <Link href={editEventUrl} onClick={closeBottomSheet} className="h-60 w-full border-b border-gray-50 px-24 py-20 text-left text-16 font-500">
          수정하기
        </Link>
        <button onClick={handleReportClick} className="h-60 w-full border-b border-gray-50 px-24 py-20 text-left text-16 font-500">
          신고하기
        </button>
      </div>
    </BottomSheet.Frame>
  );
};

export default EventKebabBottomSheet;
