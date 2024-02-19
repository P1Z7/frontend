import { useEffect, useState } from "react";
import VerticalEventCard from "@/components/card/VerticalEventCard";
import useGetWindowWidth from "@/hooks/useGetWindowWidth";
import { Res_Get_Type } from "@/types/getResType";
import PrevButtonIcon from "@/public/icon/arrow-left_xl.svg";
import NextButtonIcon from "@/public/icon/arrow-right_xl.svg";

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
    <div className="flex flex-col gap-16 pc:gap-24">
      <div className="pc:flex pc:w-[112rem]">
        <div onClick={handlePrevClick} className={`relative top-76 hidden h-100 w-[5rem] cursor-pointer pc:block ${isPrevDisabled ? "pointer-events-none opacity-30" : ""}`}>
          <PrevButtonIcon />
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
          className={`relative top-76 hidden h-100 w-[5rem] cursor-pointer pc:flex pc:justify-end ${isNextDisabled ? "pointer-events-none opacity-50" : ""}`}
        >
          <NextButtonIcon />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
