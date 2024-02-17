"use client";

import { useQuery } from "@tanstack/react-query";
import { SyntheticEvent, useState } from "react";
import toast from "react-hot-toast";
import HorizontalEventCard from "@/components/card/HorizontalEventCard";
import { instance } from "@/api/api";
import { EventCardType } from "@/types/index";
import CheckIcon from "@/public/icon/check.svg";
import MapIcon from "@/public/icon/map.svg";
import MyKakaoMap from "../MyKaKaoMap";
import { useMapBox } from "../useMapBox";

const ButtonColor = {
  checked: "bg-sub-pink text-white-white",
  notChecked: "bg-white-white border border-gray-100 text-gray-900",
};

interface Props {
  userId: string;
}

const MyLocationTab = ({ userId }: Props) => {
  const [locationInfo, setLocationInfo] = useState<EventCardType | undefined>();
  const { mapBox, openMapBox, closeMapBox } = useMapBox();
  const [inChecked, setIsChecked] = useState(false);

  const { data: myEventsData, isSuccess } = useQuery({
    queryKey: ["events", inChecked],
    queryFn: async () => {
      return instance.get(`/event/${userId}/like`, { status: inChecked ? "종료제외" : "" });
    },
  });

  if (!isSuccess) return;
  return (
    <div className="relative h-full w-full pc:h-fit pc:px-40 pc:pt-56">
      <button
        onClick={() => setIsChecked((prev) => !prev)}
        className={`flex-center fixed bottom-100 left-1/2 z-nav w-fit -translate-x-1/2 rounded-full px-12 py-4 text-14 font-500 shadow-hero ${inChecked ? ButtonColor.checked : ButtonColor.notChecked} py-4 pc:absolute pc:bottom-32 pc:text-16`}
      >
        종료된 행사 제외
        <CheckIcon width={20} height={20} viewBox="0 0 24 24" stroke={inChecked ? "white" : "#1C1E22"} />
      </button>
      <MyKakaoMap scheduleData={myEventsData} setLocationInfo={setLocationInfo} openBottomSheet={openMapBox} />
      {mapBox === "location_detail" && <MapInfoBox locationInfo={locationInfo} closeMapBox={closeMapBox} />}
    </div>
  );
};

export default MyLocationTab;

const getPlaceId = async (address: string, placeName: string) => {
  const data = await fetch(`https://dapi.kakao.com/v2/local/search/keyword.json?query=${address}${placeName}`, {
    headers: { Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}` },
  });
  const ret = await data.json();
  if (!ret.documents?.[0]) return;
  return ret.documents?.[0].id;
};

const MapInfoBox = ({ locationInfo, closeMapBox }: { locationInfo: EventCardType | undefined; closeMapBox: () => void }) => {
  if (!locationInfo) {
    return <p>위치 정보를 찾을 수 없습니다</p>;
  }

  const handleRedirectToMap = async () => {
    const placeId = await getPlaceId(locationInfo.address, locationInfo.placeName);
    if (!placeId) {
      toast.error("카카오 맵과 연동되지 않은 주소입니다🥹", {
        className: "text-14 font-600",
      });
      return;
    }
    window.open(`https://map.kakao.com/link/map/${placeId}`);
  };

  return (
    <div onClick={() => closeMapBox()} className="fixed bottom-0 left-0 z-popup flex h-full w-full flex-col items-end justify-end gap-4 pt-16 pc:absolute pc:px-[3.8rem]">
      <div
        onClick={(e: SyntheticEvent) => e.stopPropagation()}
        className="flex max-h-[55.6rem] w-full transform animate-slideUp flex-col overflow-hidden border-t bg-white-black px-8 transition duration-150 ease-out"
      >
        <button onClick={handleRedirectToMap} className="flex-center w-fit gap-4 pt-20 text-14 font-500 text-gray-900 hover:underline">
          <MapIcon width={20} height={20} viewBox="0 0 24 24" stroke="#A0A5B1" />
          {locationInfo.address}
        </button>
        <HorizontalEventCard data={locationInfo} isGrow />
      </div>
    </div>
  );
};
