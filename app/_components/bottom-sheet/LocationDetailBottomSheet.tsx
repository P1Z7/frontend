import BottomSheet from "./BottomSheetMaterial";

const getPlaceId = async (address: string, placeName: string) => {
  const data = await fetch(`https://dapi.kakao.com/v2/local/search/keyword.json?query=${address}${placeName}`, {
    headers: { Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}` },
  });
  const ret = await data.json();
  console.log(ret.documents?.[0].id);
  return ret.documents?.[0].id;
};

interface Props {
  closeBottomSheet: () => void;
  locationInfo: { placeName: string; address: string };
}

const LocationDetailBottomSheet = ({ closeBottomSheet, locationInfo }: Props) => {
  const handleRedirectToMap = async () => {
    const placeId = await getPlaceId(locationInfo.address, locationInfo.placeName);
    if (!placeId) return;
    window.open(`https://map.kakao.com/link/map/${placeId}`);
  };

  return (
    <>
      <BottomSheet.Frame closeBottomSheet={closeBottomSheet}>
        <div className="mb-40 flex w-full flex-col gap-4 px-20 pb-32 pt-16">
          <h3 className="text-20 font-500">{locationInfo.placeName}</h3>
          <h4 className="text-14 font-500 text-gray-500">{locationInfo.address}</h4>
          <button onClick={handleRedirectToMap} className="text-left text-14 font-500 text-blue">
            지도 앱으로 연결
          </button>
        </div>
      </BottomSheet.Frame>
    </>
  );
};

export default LocationDetailBottomSheet;
