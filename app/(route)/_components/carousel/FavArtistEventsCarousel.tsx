"use client";

import Link from "next/link";
import { useState } from "react";
import Carousel from "@/components/Carousel";
import VerticalEventCard from "@/components/card/VerticalEventCard";
import { MOCK_EVENTS } from "@/constants/mock";

const FavArtistEventsCarousel = () => {
  // 추후 next auth로 변경 예정
  const [status, setStatus] = useState(true);

  // 목업의 길이를 기반으로 좋아요한 이벤트의 수 확인
  // 추후 수정 예정
  const hasFavoriteEvents = MOCK_EVENTS.length > 0;
  // const hasFavoriteEvents = false;

  const renderContent = () => {
    if (!status) {
      return <NoFavCard buttonName="로그인 하기" href={"/signin"} />;
    }

    if (!hasFavoriteEvents) {
      <NoFavCard buttonName="아티스트 둘러보기" href={"/setting/artist"} />;
    }

    return (
      <Carousel customSettings={{ infinite: false }}>
        {MOCK_EVENTS.map((event, index) => (
          <div key={index}>
            <VerticalEventCard data={event} />
          </div>
        ))}
      </Carousel>
    );
  };

  return (
    <div className="flex flex-col gap-16">
      <div className="flex items-center justify-between self-stretch">
        <h2 className="text-20 font-700 text-gray-900">좋아요한 아티스트의 새 행사</h2>
        <Link href="/my-artist-event" className="text-12 font-600 text-blue">
          전체보기
        </Link>
      </div>
      {renderContent()}
    </div>
  );
};

interface NoFavCardProps {
  href: string;
  buttonName: string;
}

const NoFavCard = ({ href, buttonName }: NoFavCardProps) => {
  return (
    <div className="flex h-148 w-320 items-center justify-center bg-[#EFEFEF]">
      <Link href={href} className="text-white block h-32 w-120 rounded-[4px] bg-[#676767] text-center text-14 leading-[32px]">
        {buttonName}
      </Link>
    </div>
  );
};

export default FavArtistEventsCarousel;
