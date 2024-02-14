"use client";

import { useState } from "react";
import LocationDetailBottomSheet from "@/components/bottom-sheet/LocationDetailBottomSheet";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import CheckIcon from "@/public/icon/check.svg";
import { ScheduleDataProps } from "../../page";
import MyKakaoMap from "../MyKaKaoMap";

const ButtonColor = {
  checked: "bg-sub-pink text-white-white",
  notChecked: "bg-white-white border border-gray-100 text-gray-900",
};

const MyLocationTab = ({ scheduleData }: { scheduleData: ScheduleDataProps[] }) => {
  const [locationInfo, setLocationInfo] = useState<ScheduleDataProps | undefined>();
  const { bottomSheet, openBottomSheet, closeBottomSheet } = useBottomSheet();
  const [inChecked, setIsChecked] = useState(false);

  const comingScheduleData = scheduleData.filter((event) => {
    return new Date(event.endDate) >= new Date();
  });

  return (
    <div className="relative h-screen">
      <button
        onClick={() => setIsChecked((prev) => !prev)}
        className={`flex-center fixed bottom-100 left-1/2 z-nav h-28 w-fit -translate-x-1/2 rounded-full px-12 py-4 text-14 font-500 shadow-hero ${inChecked ? ButtonColor.checked : ButtonColor.notChecked}`}
      >
        종료된 행사 제외
        <CheckIcon width={20} height={20} viewBox="0 0 24 24" stroke={inChecked ? "white" : "#1C1E22"} />
      </button>
      <MyKakaoMap scheduleData={inChecked ? comingScheduleData : scheduleData} setLocationInfo={setLocationInfo} openBottomSheet={openBottomSheet} />
      {bottomSheet === "location_detail" && <LocationDetailBottomSheet closeBottomSheet={closeBottomSheet} locationInfo={locationInfo} />}
    </div>
  );
};

export default MyLocationTab;
