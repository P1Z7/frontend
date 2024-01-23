"use client";

import { useEffect } from "react";

const KakaoMap = () => {
  useEffect(() => {
    if (window.kakao) {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById("map");
        const mapOption = {
          // 초기 중심 좌표 설정
          center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
          // 줌 레벨 설정
          level: 3,
        };
        new window.kakao.maps.Map(mapContainer, mapOption);
      });
    }
  }, []);

  return <div id="map" className="h-400 w-400" />;
};

export default KakaoMap;
