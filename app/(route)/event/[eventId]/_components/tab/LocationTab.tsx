"use client";

import { useRouter } from "next/navigation";
import { openToast } from "@/utils/toast";
import { MapType } from "@/types/index";
import KakaoMap from "../KakaoMap";

const getPlaceId = async (name: string, address: string) => {
  const data = await fetch(`https://dapi.kakao.com/v2/local/search/keyword.json?query=${address}${name}`, {
    headers: { Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}` },
  });
  const ret = await data.json();
  if (!ret.documents?.[0]) return;
  return ret.documents?.[0].id;
};

const LocationTab = ({ name, address }: MapType) => {
  const router = useRouter();

  const handleRedirectToMap = async () => {
    const placeId = await getPlaceId(name, address);
    if (!placeId) {
      openToast.error(TOAST_MESSAGE.kakaoMap);
      return;
    }
    router.push(`https://map.kakao.com/link/map/${placeId}`);
  };

  return (
    <div className="pc:px-40 pc:py-32">
      <KakaoMap name={name} address={address} />
      <div className="mb-40 flex w-full flex-col gap-4 border-t border-gray-100 px-20 pb-32 pt-16 pc:px-24">
        <h3 className="text-20 font-500">{name}</h3>
        <h4 className="text-14 font-500 text-gray-500 pc:text-16">{address}</h4>
        <button onClick={handleRedirectToMap} className="text-left text-14 font-500 text-blue">
          지도 앱으로 연결
        </button>
      </div>
    </div>
  );
};

export default LocationTab;
