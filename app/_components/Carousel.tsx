"use client";

import { ReactNode } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

interface CarouselProps {
  customSettings?: Settings;
  title?: string;
  children: ReactNode;
}

const Carousel = ({ customSettings, title, children }: CarouselProps) => {
  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    ...customSettings,
  };

  return (
    <div className="flex w-[480px] flex-col gap-16">
      {title && <h2 className="text-20 font-700 text-gray-900">{title}</h2>}
      <Slider {...settings}>{children}</Slider>
    </div>
  );
};

export default Carousel;
