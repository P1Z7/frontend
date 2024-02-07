"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import VerticalEventCard from "@/components/card/VerticalEventCard";
import { MOCK_EVENTS } from "@/constants/mock";
import Hero from "@/public/icon/hero.svg";
import Carousel from "./Carousel";

const FavArtistEventsCarousel = () => {
  // 추후 next auth로 변경 예정
  const [status, setStatus] = useState(false);

  // 목업의 길이를 기반으로 좋아요한 이벤트의 수 확인
  // 추후 수정 예정
  const hasFavoriteEvents = MOCK_EVENTS.length > 0;

  const renderContent = () => {
    if (!status) {
      return <NoFavCard buttonName="로그인 하기" href={"/signin"} />;
    }

    if (!hasFavoriteEvents) {
      return <NoFavCard buttonName="아티스트 둘러보기" href={"/setting/artist"} />;
    }

    return (
      <Carousel>
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
      <div className="flex items-center justify-between self-stretch px-20">
        <h2 className="text-20 font-700 text-gray-900">내 아티스트의 새 행사</h2>
        {hasFavoriteEvents && (
          <Link href="/my-artist-event" className="text-12 font-600 text-blue">
            전체보기
          </Link>
        )}
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
  const router = useRouter();

  return (
    <div className="px-20">
      <div className="flex-center relative h-160 overflow-hidden rounded-lg">
        <Hero className="absolute left-1/2 top-0 -translate-x-1/2" />
        <div className="flex-center absolute top-96 w-full flex-col gap-16">
          <div onClick={() => router.push(href)} className="h-32 cursor-pointer rounded-full bg-gray-900 px-16 text-14 font-600 leading-loose text-white-white ">
            {buttonName}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavArtistEventsCarousel;
