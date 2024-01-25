"use client";

import { MapType } from "@/types/index";
import KakaoMap from "../KakaoMap";

const LocationTab = ({ name, address }: MapType) => {
  return (
    <div className="h-400 w-full">
      <KakaoMap name={name} address={address} />
    </div>
  );
};

export default LocationTab;
