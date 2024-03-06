"use client";

import { addMonths, format, subMonths } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { instance } from "@/api/api";
import useFetchArtistOfMonth from "@/hooks/useFetchArtistOfMonth";
import useGetWindowWidth from "@/hooks/useGetWindowWidth";
import PrevIconMd from "@/public/icon/arrow-left_md.svg";
import PrevIconSm from "@/public/icon/arrow-left_sm.svg";
import NextIconMd from "@/public/icon/arrow-right_md.svg";
import NextIconSm from "@/public/icon/arrow-right_sm.svg";
import ArtistCard from "./artist-card/ArtistCard";

const SCROLLX = 14;

const ArtistOfMonth = () => {
  const router = useRouter();

  const { isPc } = useGetWindowWidth();

  const [slideIndex, setSlideIndex] = useState(0);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handleClickPrev = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
    setSlideIndex(0);
    setIsPrevDisabled(true);
  };

  const handleClickNext = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
    setSlideIndex(0);
    setIsPrevDisabled(true);
  };

  const formattedMonth = format(currentMonth, "M");

  const { data, isSuccess, isLoading } = useFetchArtistOfMonth(instance, formattedMonth);

  const handlePrevClick = () => {
    if (!isPc) return;
    const maxCardsToMove = Math.min(7, slideIndex);
    if (slideIndex <= 0) return;
    setSlideIndex((prev) => prev - maxCardsToMove);
    setIsNextDisabled(false);
    if (slideIndex - maxCardsToMove === 0) {
      setIsPrevDisabled(true);
    }
  };

  const handleNextClick = () => {
    if (!isPc) return;

    let next = Math.ceil((data?.length || 0) / 2) - slideIndex - 7;

    const maxCardsToMove = Math.min(7, next);
    setSlideIndex((prev) => prev + maxCardsToMove);
    setIsPrevDisabled(false);
    if (maxCardsToMove === next) {
      setIsNextDisabled(true);
    }
  };

  useEffect(() => {
    if (data && data.length <= 14) {
      setIsNextDisabled(true);
    } else {
      setIsNextDisabled(false);
    }
  }, [data]);

  return (
    <div className="flex w-full flex-col gap-16 pc:gap-24">
      <section className="flex gap-8 px-20 pc:gap-16 pc:px-48">
        <div className="flex-center gap-12 pc:gap-20">
          <PrevIconSm onClick={handleClickPrev} className="cursor-pointer" />
          <p className="pc:text-24 w-[3rem] text-center text-20 font-700 text-main-pink-500 pc:w-40">{formattedMonth}월</p>
          <NextIconSm onClick={handleClickNext} className="cursor-pointer" />
        </div>
        <p className="text-20 font-600 leading-[3.6rem] text-gray-900">생일 아티스트</p>
      </section>
      <section className="pc:flex-center pl-20 pc:gap-[4.55rem] pc:p-0">
        <div
          onClick={handlePrevClick}
          className={`pc:flex-center hidden h-40 w-40 cursor-pointer rounded-full bg-gray-50 pc:flex-shrink-0 ${isPrevDisabled && "pointer-events-none"}`}
        >
          <PrevIconMd className={`${isPrevDisabled && "opacity-30"}`} />
        </div>
        <ul className="flex h-236 flex-col flex-wrap justify-between gap-12 overflow-scroll pr-20 scrollbar-none pc:h-[32.5rem] pc:w-[101.2rem] pc:gap-x-32 pc:gap-y-20 pc:overflow-hidden pc:p-0">
          {data?.map((artist) => (
            <li key={artist.id} className="pc:transition-transform pc:duration-500 pc:ease-in-out" style={{ transform: `translateX(-${slideIndex * SCROLLX}rem)` }}>
              <ArtistCard profileImage={artist.image} onClick={() => router.push(`/artist/${artist.id}`)}>
                {artist.name}
              </ArtistCard>
            </li>
          ))}
        </ul>
        <div
          onClick={handleNextClick}
          className={`pc:flex-center hidden h-40 w-40 cursor-pointer rounded-full bg-gray-50 pc:flex-shrink-0 ${isNextDisabled && "pointer-events-none"}`}
        >
          <NextIconMd className={`${isNextDisabled && "opacity-30"}`} />
        </div>
      </section>
    </div>
  );
};

export default ArtistOfMonth;
