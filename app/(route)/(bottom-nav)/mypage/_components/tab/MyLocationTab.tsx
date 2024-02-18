"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { instance } from "@/api/api";
import { EventCardType } from "@/types/index";
import CheckIcon from "@/public/icon/check.svg";
import MyKakaoMap from "../MyKaKaoMap";
import MapInfoBox from "../useMapBox";

const ButtonColor = {
  checked: "bg-sub-pink text-white-white",
  notChecked: "bg-white-white border border-gray-100 text-gray-900",
};

interface Props {
  userId: string;
}

const MyLocationTab = ({ userId }: Props) => {
  const [mapBox, setMapBox] = useState(false);
  const [locationInfo, setLocationInfo] = useState<EventCardType | undefined>();
  const [inChecked, setIsChecked] = useState(false);

  const { data: myEventsData, isSuccess } = useQuery({
    queryKey: ["events", inChecked],
    queryFn: async () => {
      return instance.get(`/event/${userId}/like`, { status: inChecked ? "종료제외" : "" });
    },
  });

  if (!isSuccess) return;
  return (
    <div className="relative h-full w-full pc:h-fit pc:px-40 pc:py-56">
      <button
        onClick={() => setIsChecked((prev) => !prev)}
        className={`flex-center fixed bottom-100 left-1/2 z-nav w-fit -translate-x-1/2 rounded-full px-12 py-4 text-14 font-500 shadow-hero ${inChecked ? ButtonColor.checked : ButtonColor.notChecked} py-4 pc:absolute pc:bottom-80 pc:text-16`}
      >
        종료된 행사 제외
        <CheckIcon width={20} height={20} viewBox="0 0 24 24" stroke={inChecked ? "white" : "#1C1E22"} />
      </button>
      <MyKakaoMap scheduleData={myEventsData} setLocationInfo={setLocationInfo} openMapBox={setMapBox} />
      {mapBox && <MapInfoBox locationInfo={locationInfo} closeMapBox={setMapBox} />}
    </div>
  );
};

export default MyLocationTab;
