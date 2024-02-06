"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import LocationDetailBottomSheet from "@/components/bottom-sheet/LocationDetailBottomSheet";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import { ScheduleDataProps } from "../../page";
import MyKakaoMap from "../MyKaKaoMap";

const MyLocationTab = ({ scheduleData }: { scheduleData: ScheduleDataProps[] }) => {
  const [locationInfo, setLocationInfo] = useState({ placeName: "", address: "" });
  const { bottomSheet, openBottomSheet, closeBottomSheet } = useBottomSheet();

  return (
    <div className="relative h-screen">
      <MyKakaoMap scheduleData={scheduleData} setLocationInfo={setLocationInfo} openBottomSheet={openBottomSheet} />
      {bottomSheet === "location_detail" && <LocationDetailBottomSheet closeBottomSheet={closeBottomSheet} locationInfo={locationInfo} />}
    </div>
  );
};

export default MyLocationTab;
