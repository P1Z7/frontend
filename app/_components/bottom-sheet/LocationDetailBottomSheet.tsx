import toast from "react-hot-toast";
import { EventCardType } from "@/types/index";
import MapIcon from "@/public/icon/map.svg";
import HorizontalEventCard from "../card/HorizontalEventCard";
import BottomSheet from "./BottomSheetMaterial";

const getPlaceId = async (address: string, placeName: string) => {
  const data = await fetch(`https://dapi.kakao.com/v2/local/search/keyword.json?query=${address}${placeName}`, {
    headers: { Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}` },
  });
  const ret = await data.json();
  if (!ret.documents?.[0]) return;
  return ret.documents?.[0].id;
};

interface Props {
  closeBottomSheet: () => void;
  locationInfo: EventCardType | undefined;
}

const LocationDetailBottomSheet = ({ closeBottomSheet, locationInfo }: Props) => {
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
    <>
      <BottomSheet.MapFrame closeBottomSheet={closeBottomSheet}>
        <div className="flex w-full flex-col gap-4 px-20 pt-16">
          <button onClick={handleRedirectToMap} className="flex-center w-fit gap-4 text-14 font-500 text-gray-900 hover:underline">
            <MapIcon width={20} height={20} viewBox="0 0 24 24" stroke="#A0A5B1" />
            {locationInfo.address}
          </button>
          <HorizontalEventCard data={locationInfo} />
        </div>
      </BottomSheet.MapFrame>
    </>
  );
};

export default LocationDetailBottomSheet;
