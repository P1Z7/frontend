"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import LocationDetailBottomSheet from "@/components/bottom-sheet/LocationDetailBottomSheet";
import { instance } from "@/api/api";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import { EventCardType } from "@/types/index";
import CheckIcon from "@/public/icon/check.svg";
import MyKakaoMap from "../MyKaKaoMap";

const ButtonColor = {
  checked: "bg-sub-pink text-white-white",
  notChecked: "bg-white-white border border-gray-100 text-gray-900",
};

const MyLocationTab = () => {
  const [locationInfo, setLocationInfo] = useState<EventCardType | undefined>();
  const { bottomSheet, openBottomSheet, closeBottomSheet } = useBottomSheet();
  const [inChecked, setIsChecked] = useState(false);

  const ID = "f14ab7e7-ee5c-4707-b68e-ddb6cf8b0f00";

  const { data: myEventsData, isSuccess } = useQuery({
    queryKey: ["events", inChecked],
    queryFn: async () => {
      return instance.get(`/event/${ID}/like`, { status: inChecked ? "종료제외" : "" });
    },
  });

  if (!isSuccess) return;
  return (
    <div className="relative h-screen">
      <button
        onClick={() => setIsChecked((prev) => !prev)}
        className={`flex-center fixed bottom-100 left-1/2 z-nav h-28 w-fit -translate-x-1/2 rounded-full px-12 py-4 text-14 font-500 shadow-hero ${inChecked ? ButtonColor.checked : ButtonColor.notChecked}`}
      >
        종료된 행사 제외
        <CheckIcon width={20} height={20} viewBox="0 0 24 24" stroke={inChecked ? "white" : "#1C1E22"} />
      </button>
      <MyKakaoMap scheduleData={myEventsData} setLocationInfo={setLocationInfo} openBottomSheet={openBottomSheet} />
      {bottomSheet === "location_detail" && <LocationDetailBottomSheet closeBottomSheet={closeBottomSheet} locationInfo={locationInfo} />}
    </div>
  );
};

export default MyLocationTab;
