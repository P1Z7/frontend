"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { instance } from "@/api/api";
import { EventCardType } from "@/types/index";
import KakaoMap from "../../../../../_components/KakaoMap";
import FilteringButton from "./FilteringButton";
import MapInfoBox from "./MapInfoBox";
import ArtistIdPage from "@/(route)/artist/[artistId]/page";

interface Props {
  userId: string;
}

const MyLocationTab = ({ userId }: Props) => {
  const [mapBox, setMapBox] = useState(false);
  const [locationInfo, setLocationInfo] = useState<EventCardType | undefined>();
  const [isChecked, setIsChecked] = useState(false);

  const { data: myEventsData, isSuccess } = useQuery({
    queryKey: ["events", isChecked],
    queryFn: async () => {
      return instance.get(`/event/${userId}/like`, { status: isChecked ? "종료제외" : "" });
    },
  });

  if (!isSuccess) return;
  return (
    <div className="relative h-full w-full pc:h-fit pc:px-40 pc:py-56">
      <FilteringButton setIsChecked={setIsChecked} isChecked={isChecked} />
      <div className="h-full pc:h-[72.4rem]">
        <ArtistIdPage/>
      </div>
      {mapBox && <MapInfoBox locationInfo={locationInfo} closeMapBox={setMapBox} />}
    </div>
  );
};

export default MyLocationTab;
