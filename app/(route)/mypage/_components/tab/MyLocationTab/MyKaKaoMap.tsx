import { useEffect } from "react";
import { EventCardType } from "@/types/index";

interface Props {
  scheduleData: EventCardType[];
  setLocationInfo: (data: EventCardType) => void;
  openMapBox: (open: true) => void;
}

const MyKakaoMap = ({ scheduleData, setLocationInfo, openMapBox }: Props) => {
  useEffect(() => {
    if (window.kakao) {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById("map");
        const mapOption = {
          center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
          level: 9,
        };
        const map = new window.kakao.maps.Map(mapContainer, mapOption);
        const geocoder = new window.kakao.maps.services.Geocoder();

        const myMarker = (data: EventCardType) => {
          const { address, placeName } = data;

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
                setLocationInfo(data);
                openMapBox(true);
              });

              map.setCenter(coords);
            }
          });
        };
        for (let i = 0; i < scheduleData.length; i++) {
          myMarker(scheduleData[i]);
        }
      });
    }
  }, [scheduleData]);

  return <div id="map" className="h-full w-full pc:rounded-lg" />;
};

export default MyKakaoMap;
