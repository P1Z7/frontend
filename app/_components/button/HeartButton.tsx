"use client";

import { MouseEvent, useEffect, useRef, useState } from "react";
import useGetWindowWidth from "@/hooks/useGetWindowWidth";
import { confettiHeart } from "@/constants/confetti";
import HeartIcon from "@/public/icon/heart-inside-circle.svg";

interface Props {
  isSmall?: boolean;
  isSelected?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const HeartButton = ({ isSmall = false, isSelected = false, onClick, ...props }: Props) => {
  const [selected, setSelected] = useState(isSelected);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setSelected(isSelected);
  }, [isSelected]);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setSelected((prev) => !prev);
    onClick?.(event);

    confettiHeart(buttonRef, selected);
  };

  const { isPc } = useGetWindowWidth();

  return (
    <div className="flex-center z-heart h-32 w-32">
      <button ref={isPc ? null : buttonRef} className="w-fit pc:hidden" onClick={handleClick} aria-label="이 행사를 마이페이지에 저장/삭제" {...props}>
        <HeartIcon width={isSmall ? "24" : "28"} height={isSmall ? "24" : "28"} viewBox="0 0 32 32" stroke={selected ? "#FF50AA" : "white"} fill={selected ? "#FF50AA" : "none"} />
      </button>
      <button ref={isPc ? buttonRef : null} className="hidden w-fit pc:inline" onClick={handleClick} aria-label="이 행사를 마이페이지에 저장/삭제" {...props}>
        <HeartIcon width={isSmall ? "24" : "32"} height={isSmall ? "24" : "32"} viewBox="0 0 32 32" stroke={selected ? "#FF50AA" : "white"} fill={selected ? "#FF50AA" : "none"} />
      </button>
    </div>
  );
};

export default HeartButton;
