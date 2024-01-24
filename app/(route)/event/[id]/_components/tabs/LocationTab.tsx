"use client";

import KakaoMap, { MapProps } from "../KakaoMap";

const LocationTab = ({ name, address }: MapProps) => {
  return (
    <div className="h-400 w-full">
      <KakaoMap name={name} address={address} />
    </div>
  );
};

export default LocationTab;
