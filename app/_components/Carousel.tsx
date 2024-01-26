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
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    ...customSettings,
  };
  return (
    <div className="w-400">
      <h2>{title}</h2>
      <Slider {...settings} className="w-[600px]">
        {children}
      </Slider>
    </div>
  );
};

export default Carousel;
