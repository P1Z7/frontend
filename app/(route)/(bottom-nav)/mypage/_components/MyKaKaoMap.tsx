import { useEffect } from "react";
import { ScheduleDataProps } from "../page";

interface Props {
  scheduleData: ScheduleDataProps[];
  setLocationInfo: ({ placeName, address }: { placeName: string; address: string }) => void;
  openBottomSheet: (name: string) => void;
}

const getPlaceId = async (address: string) => {
  const data = await fetch(`https://dapi.kakao.com/v2/local/search/keyword.json?query=${address}`, {
    headers: { Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}` },
  });
  const ret = await data.json();
  return ret.documents?.[0].id;
};

const MyKakaoMap = ({ scheduleData, setLocationInfo, openBottomSheet }: Props) => {
  useEffect(() => {
    if (window.kakao) {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById("map");
        const mapOption = {
          center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
          level: 10,
        };
        const map = new window.kakao.maps.Map(mapContainer, mapOption);
        const geocoder = new window.kakao.maps.services.Geocoder();

        const myMarker = (address: string, placeName: string, eventType: string) => {
          geocoder.addressSearch(address, (result: any, status: any) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

              const imageSrc = "/icon/marker.svg";
              const imageSize = new window.kakao.maps.Size(20, 20);
              const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

              const marker = new window.kakao.maps.Marker({
                map: map,
                position: coords,
                image: markerImage,
              });
              marker.setMap(map);

              const content =
                '<div class="relative w-fit rounded-full bg-gray-900 px-12 py-8 text-center text-14 font-600 text-white-black">' +
                placeName +
                '<div class="absolute -bottom-12 right-1/2 translate-x-1/2">' +
                '<img src="/icon/marker-bottom.svg" />' +
                "</div>" +
                "</div>";

              const customOverlay = new window.kakao.maps.CustomOverlay({
                position: coords,
                content: content,
                yAnchor: 1.9,
              });

              window.kakao.maps.event.addListener(marker, "mouseover", () => {
                customOverlay.setMap(map);
              });
              window.kakao.maps.event.addListener(marker, "mouseout", () => {
                customOverlay.setMap(null);
              });

              window.kakao.maps.event.addListener(marker, "click", () => {
                setLocationInfo({ placeName: placeName, address: address });
                openBottomSheet("location_detail");
              });

              map.setCenter(coords);
            }
          });
        };
        for (let i = 0; i < scheduleData.length; i++) {
          myMarker(scheduleData[i].address, scheduleData[i].placeName, scheduleData[i].eventType);
        }
      });
    }
  }, []);

  return <div id="map" className="h-full w-full" />;
};

export default MyKakaoMap;
