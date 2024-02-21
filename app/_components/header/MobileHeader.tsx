"use client";

import dynamic from "next/dynamic";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ToTopButton from "@/components/button/ToTopButton";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import useGetWindowWidth from "@/hooks/useGetWindowWidth";
import useHeaderTitle from "@/hooks/useHeaderTitle";
import { useModal } from "@/hooks/useModal";
import ArrowLeft from "@/public/icon/arrow-left_lg.svg";
import KebabButton from "@/public/icon/kebab.svg";

const EventKebabBottomSheet = dynamic(() => import("../bottom-sheet/EventKebabBottomSheet"), { ssr: false });
const ReportModal = dynamic(() => import("../modal/ReportModal"), { ssr: false });

interface Props {
  handleClick?: () => void;
  topButton?: boolean;
}

const MobileHeader = ({ handleClick, topButton }: Props) => {
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

  const { isPc } = useGetWindowWidth();

  return (
    <>
      <header
        className={`sticky left-0 top-0 z-nav flex h-60 w-full justify-between border-b border-gray-50 bg-white-white px-20 pb-12 pt-24 ${pathname === `/event/${eventId}` || pathname === "/my-artist-event" ? "pc:hidden" : ""}`}
      >
        <button onClick={handleClick || (() => router.back())} className="z-nav">
          <ArrowLeft />
        </button>
        <h1 className="absolute left-0 w-full truncate px-60 text-center text-16 font-600 text-gray-900">{title}</h1>
        {pathname === `/event/${eventId}` && (
          <button onClick={openKebabBottomSheet} className="z-nav">
            <KebabButton />
          </button>
        )}
        {topButton && (
          <ToTopButton
            containerId={isPc ? "pinkContainer" : undefined}
            className="right-24 top-36 z-nav rounded-full bg-white-white px-12 text-16 text-gray-600 hover:bg-sub-pink hover:text-white-white"
          >
            위로 가기 ↑
          </ToTopButton>
        )}
      </header>
      {bottomSheet === "event-kebab" && <EventKebabBottomSheet closeBottomSheet={closeBottomSheet} refs={refs} openReportModal={openKebabModal} />}
      {modal === "report" && <ReportModal closeModal={closeModal} type="event" />}
    </>
  );
};

export default MobileHeader;
