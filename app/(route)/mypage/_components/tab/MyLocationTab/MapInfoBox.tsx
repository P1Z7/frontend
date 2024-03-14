import { SyntheticEvent } from "react";
import HorizontalEventCard from "@/components/card/HorizontalEventCard";
import { openToast } from "@/utils/toast";
import { EventCardType } from "@/types/index";
import { TOAST_MESSAGE } from "@/constants/toast";
import MapIcon from "@/public/icon/map.svg";

const getPlaceId = async (address: string, placeName: string) => {
  const data = await fetch(`https://dapi.kakao.com/v2/local/search/keyword.json?query=${address}${placeName}`, {
    headers: { Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}` },
  });
  const ret = await data.json();
  if (!ret.documents?.[0]) return;
  return ret.documents?.[0].id;
};

const MapInfoBox = ({ locationInfo, closeMapBox }: { locationInfo: EventCardType | undefined; closeMapBox: (close: false) => void }) => {
  if (!locationInfo) {
    return <p>위치 정보를 찾을 수 없습니다</p>;
  }

  const handleRedirectToMap = async () => {
    const placeId = await getPlaceId(locationInfo.address, locationInfo.placeName);
    if (!placeId) {
      openToast.error(TOAST_MESSAGE.kakaoMap);
      return;
    }
    window.open(`https://map.kakao.com/link/map/${placeId}`);
  };

  return (
    <div onClick={() => closeMapBox(false)} className="fixed bottom-0 left-0 z-popup flex h-full w-full flex-col items-end justify-end gap-4 pt-16 pc:absolute pc:px-[3.8rem]">
      <div
        onClick={(e: SyntheticEvent) => e.stopPropagation()}
        className="flex max-h-[55.6rem] w-full transform animate-slideUp flex-col overflow-hidden border-t bg-white-black px-20 transition duration-150 ease-out pc:px-8"
      >
        <button onClick={handleRedirectToMap} className="flex-center w-fit gap-4 pt-20 text-14 font-500 text-gray-900 hover:underline" aria-label="카카오 맵으로 이동">
          <MapIcon width={20} height={20} viewBox="0 0 24 24" stroke="#A0A5B1" />
          {locationInfo.address}
        </button>
        <HorizontalEventCard data={locationInfo} isGrow />
      </div>
    </div>
  );
};

export default MapInfoBox;
