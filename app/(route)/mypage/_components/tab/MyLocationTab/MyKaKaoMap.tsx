import { useState } from "react";
import useKakaoMap from "@/hooks/useKakaoMap";
import { EventCardType } from "@/types/index";

interface Props {
  scheduleData: EventCardType[];
  setLocationInfo: (data: EventCardType) => void;
  openMapBox: (open: true) => void;
}

const MyKakaoMap = ({ scheduleData, setLocationInfo, openMapBox }: Props) => {
  const [mapInstance, setMapInstance] = useState<any>(null);

  const onLoadKakaoMap = () => {
    const kakaoMap = window.kakao.maps;
    kakaoMap.load(() => {
      this;
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new kakaoMap.LatLng(37.566826, 126.9786567),
        level: 7,
      };
      const map = new kakaoMap.Map(mapContainer, mapOption);
      setMapInstance(map);

      const geocoder = new kakaoMap.services.Geocoder();

      const myMarker = (data: EventCardType) => {
        const { address, placeName, eventType } = data;

        geocoder.addressSearch(address, (result: any, status: any) => {
          if (status === kakaoMap.services.Status.OK) {
            const coords = new kakaoMap.LatLng(result[0].y, result[0].x);

            const imageSrc = IMAGE_EVENT[eventType];
            const imageSize = new kakaoMap.Size(48, 48);
            const markerImage = new kakaoMap.MarkerImage(imageSrc, imageSize);

            const marker = new kakaoMap.Marker({
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

            const customOverlay = new kakaoMap.CustomOverlay({
              position: coords,
              content: content,
              yAnchor: 2.5,
            });

            kakaoMap.event.addListener(marker, "mouseover", () => {
              customOverlay.setMap(map);
            });
            kakaoMap.event.addListener(marker, "mouseout", () => {
              customOverlay.setMap(null);
            });

            kakaoMap.event.addListener(marker, "click", () => {
              setLocationInfo(data);
              openMapBox(true);
            });

            map.setCenter(coords);

            clusterer.addMarker(marker);
          }
        });
      };

      const clusterer = new kakaoMap.MarkerClusterer({
        map: map,
        gridSize: 60,
        averageCenter: true,
        minLevel: 3,
        minClusterSize: 3,
        styles: [
          {
            width: "48px",
            height: "48px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "url(cluster.png) no-repeat",
            color: "#fff",
            fontSize: "24px",
            backgroundColor: "#FF50AA",
            border: "solid 4px #fff",
            borderRadius: "9999px",
            lineHeight: "48px",
            filter: "drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25))",
          },
        ],
      });

      for (let i = 0; i < scheduleData.length; i++) {
        myMarker(scheduleData[i]);
      }
    });
  };

  useKakaoMap({ callbackFn: onLoadKakaoMap, deps: [scheduleData] });

  const zoom = (scale: number) => () => {
    const level = mapInstance.getLevel();
    mapInstance.setLevel(level + scale);
  };

  return (
    <div className="relative h-full">
      <div id="map" className="h-full w-full pc:h-[72.4rem]" />
      <button onClick={zoom(-1)} className="absolute bottom-88 right-20 z-floating h-48 w-48 rounded-full bg-gray-900/60 text-[24px] text-white-white">
        +
      </button>
      <button onClick={zoom(+1)} className="absolute bottom-20 right-20 z-floating h-48 w-48 rounded-full bg-gray-900/60 text-[24px] text-white-white">
        -
      </button>
    </div>
  );
};

export default MyKakaoMap;

const IMAGE_EVENT = {
  카페: "/image/marker-cafe.png",
  꽃집: "/image/marker-flower.png",
  팬광고: "/image/marker-ads.png",
  포토부스: "/image/marker-photo.png",
  상영회: "/image/marker-screen.png",
  기타: "/image/marker-etc.png",
};
