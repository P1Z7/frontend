"use client";

import { useEffect, useState } from "react";
import VerticalEventCard from "@/components/card/VerticalEventCard";
import useGetWindowWidth from "@/hooks/useGetWindowWidth";
import { Res_Get_Type } from "@/types/getResType";
import PrevButtonIcon from "@/public/icon/arrow-left_sm.svg";
import NextButtonIcon from "@/public/icon/arrow-right_sm.svg";

const SCROLLX = 20.8;

interface Props {
  cards: Res_Get_Type["eventList"] | undefined;
}

const Carousel = ({ cards }: Props) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const { isPc } = useGetWindowWidth();

  const handlePrevClick = () => {
    if (!isPc) return;
    const maxCardsToMove = Math.min(5, slideIndex);
    if (slideIndex <= 0) return;
    setSlideIndex((prev) => prev - maxCardsToMove);
    setIsNextDisabled(false);
    if (slideIndex - maxCardsToMove === 0) {
      setIsPrevDisabled(true);
    }
  };

  const handleNextClick = () => {
    if (!isPc) return;
    const maxCardsToMove = Math.min(5, (cards?.length || 0) - slideIndex - 5);
    setSlideIndex((prev) => prev + maxCardsToMove);
    setIsPrevDisabled(false);
    if (slideIndex + maxCardsToMove === (cards?.length || 0) - 5) {
      setIsNextDisabled(true);
    }
  };

  useEffect(() => {
    if (cards && cards.length <= 5) {
      setIsNextDisabled(true);
    } else {
      setIsNextDisabled(false);
    }
  }, [cards]);

  return (
    <div className="pc:flex pc:w-[112rem] pc:gap-[1rem]">
      <div
        onClick={handlePrevClick}
        className={`pc:flex-center hidden h-40 w-40 cursor-pointer rounded-full bg-gray-50 pc:relative pc:top-108 pc:flex-shrink-0 ${isPrevDisabled && "pointer-events-none"}`}
      >
        <PrevButtonIcon className={`${isPrevDisabled && "opacity-30"}`} />
      </div>
      <div className="flex w-full gap-16 overflow-auto px-20 scrollbar-hide pc:gap-20 pc:overflow-hidden pc:p-0">
        {cards?.map((event) => (
          <div key={event.id} className="pc:transition-transform pc:duration-500 pc:ease-in-out" style={{ transform: `translateX(-${slideIndex * SCROLLX}rem)` }}>
            <VerticalEventCard data={event} />
          </div>
        ))}
      </div>
      <div
        onClick={handleNextClick}
        className={`pc:flex-center hidden h-40 w-40 cursor-pointer rounded-full bg-gray-50 pc:relative pc:top-108 pc:flex-shrink-0 ${isNextDisabled && "pointer-events-none opacity-30"}`}
      >
        <NextButtonIcon className={`${isNextDisabled ? "pointer-events-none opacity-30" : ""}`} />
      </div>
    </div>
  );
};

export default Carousel;
