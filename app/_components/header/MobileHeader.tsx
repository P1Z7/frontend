"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import useHeaderTitle from "@/hooks/useHeaderTitle";
import { useModal } from "@/hooks/useModal";
import ArrowLeft from "@/public/icon/arrow-left_lg.svg";
import KebabButton from "@/public/icon/kebab.svg";
import EventKebabBottomSheet from "../bottom-sheet/EventKebabBottomSheet";
import ReportModal from "../modal/ReportModal";

interface Props {
  handleClick?: () => void;
}

const MobileHeader = ({ handleClick }: Props) => {
  const { bottomSheet, openBottomSheet, closeBottomSheet, refs } = useBottomSheet();
  const { modal, openModal, closeModal } = useModal();

  const openKebabBottomSheet = () => {
    openBottomSheet("event-kebab");
  };

  const openKebabModal = () => {
    openModal("report");
  };

  const router = useRouter();
  const pathname = usePathname();
  const { eventId } = useParams();
  const title = useHeaderTitle();

  return (
    <>
      <header className="sticky left-0 top-0 z-nav flex h-72 w-full justify-between border-b border-gray-50 bg-white-white px-20 pb-12 pt-36 tablet:hidden">
        <button onClick={handleClick || (() => router.back())} className="z-nav">
          <ArrowLeft />
        </button>
        <h1 className="absolute left-0 w-full text-center text-16 font-600 text-gray-900">{title}</h1>
        {pathname === `/event/${eventId}` && (
          <button onClick={openKebabBottomSheet} className="z-nav">
            <KebabButton />
          </button>
        )}
      </header>
      {bottomSheet === "event-kebab" && <EventKebabBottomSheet closeBottomSheet={closeBottomSheet} refs={refs} openReportModal={openKebabModal} />}
      {modal === "report" && <ReportModal closeModal={closeModal} />}
    </>
  );
};

export default MobileHeader;
