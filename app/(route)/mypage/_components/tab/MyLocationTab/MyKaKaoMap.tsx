import useKakaoMap from "@/hooks/useKakaoMap";
import { EventCardType } from "@/types/index";

interface Props {
  scheduleData: EventCardType[];
  setLocationInfo: (data: EventCardType) => void;
  openMapBox: (open: true) => void;
}

const MyKakaoMap = ({ scheduleData, setLocationInfo, openMapBox }: Props) => {
  const onLoadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
        level: 7,
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOption);
      const geocoder = new window.kakao.maps.services.Geocoder();

      const myMarker = (data: EventCardType) => {
        const { address, placeName, eventType } = data;

        geocoder.addressSearch(address, (result: any, status: any) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

            const imageSrc = IMAGE_EVENT[eventType];
            const imageSize = new window.kakao.maps.Size(48, 48);
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
              yAnchor: 2.5,
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

            clusterer.addMarker(marker);
          }
        });
      };

      const clusterer = new window.kakao.maps.MarkerClusterer({
        map: map,
        gridSize: 60,
        averageCenter: true,
        minLevel: 3,
        minClusterSize: 3,
        styles: [
          {
            width: "60px",
            height: "60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "url(cluster.png) no-repeat",
            color: "#fff",
            fontSize: "18px",
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

  useKakaoMap({ callbackFn: onLoadKakaoMap, deps: [] });

  return <div id="map" className="h-full w-full pc:h-[72.4rem]" />;
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
