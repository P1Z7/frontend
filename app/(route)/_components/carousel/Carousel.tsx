import { useState } from "react";
import VerticalEventCard from "@/components/card/VerticalEventCard";
import { Res_Get_Type } from "@/types/getResType";
import PrevButtonIcon from "@/public/icon/arrow-left_xl.svg";
import NextButtonIcon from "@/public/icon/arrow-right_xl.svg";

interface Props {
  title?: string;
  cards: Res_Get_Type["eventList"] | undefined;
}

const Carousel = ({ title, cards }: Props) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  const handlePrevClick = () => {
    if (slideIndex <= 0) return;
    setSlideIndex((prev) => prev - 1);
    setIsNextDisabled(false);
    if (slideIndex - 1 === 0) {
      setIsPrevDisabled(true);
    }
  };

  const handleNextClick = () => {
    if (slideIndex >= (cards?.length || 0) - 5) return;
    setSlideIndex((prev) => prev + 1);
    setIsPrevDisabled(false);
    if (slideIndex + 1 === (cards?.length || 0) - 5) {
      setIsNextDisabled(true);
    }
  };

  return (
    <div className="flex flex-col gap-16">
      {title && <h2 className="px-20 text-20 font-700 text-gray-900">{title}</h2>}
      <div className="pc:flex pc:w-[112rem]">
        <PrevButtonIcon onClick={handlePrevClick} className={`relative top-76 hidden cursor-pointer pc:block ${isPrevDisabled ? "pointer-events-none opacity-50" : ""}`} />
        <div className="flex gap-16 overflow-auto px-20 pc:overflow-hidden pc:transition-transform pc:duration-1000 pc:ease-in-out">
          {cards?.slice(slideIndex, slideIndex + 5).map((event) => (
            <div key={event.id}>
              <VerticalEventCard data={event} />
            </div>
          ))}
        </div>
        <NextButtonIcon onClick={handleNextClick} className={`relative top-76 hidden cursor-pointer pc:block ${isNextDisabled ? "pointer-events-none opacity-50" : ""}`} />
      </div>
    </div>
  );
};

export default Carousel;
