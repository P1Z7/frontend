"use client";

import { useEffect } from "react";

export interface MapProps {
  name: string;
  address: string;
}

const KakaoMap = ({ name, address }: MapProps) => {
  useEffect(() => {
    if (window.kakao) {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById("map");
        const mapOption = {
          center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
          level: 3,
        };
        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch(address, function (result: any, status: any) {
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

            const marker = new window.kakao.maps.Marker({
              map: map,
              position: coords,
            });

            const infowindow = new window.kakao.maps.InfoWindow({
              content: `<div style="width:150px;text-align:center;padding:6px 0;">${name}</div>`,
            });
            infowindow.open(map, marker);

            map.setCenter(coords);
          }
        });
      });
    }
  }, []);

  return <div id="map" className="h-400 w-400" />;
};

export default KakaoMap;
