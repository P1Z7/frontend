"use client";

import { MouseEvent, useEffect, useState } from "react";
import HeartIcon from "./HeartIcon";

interface Props {
  isSmall?: boolean;
  isSelected?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const HeartButton = ({ isSmall = false, isSelected = false, onClick, ...props }: Props) => {
  const [selected, setSelected] = useState(isSelected);

  useEffect(() => {
    setSelected(isSelected);
  }, [isSelected]);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setSelected((prev) => !prev);
    onClick?.(event);
  };

  return (
    <div className="flex-center z-heart h-32 w-32">
      <button className="w-fit pc:hidden" onClick={handleClick} aria-label="이 행사를 마이페이지에 저장/삭제" {...props}>
        <HeartIcon
          width={isSmall ? "24" : "28"}
          height={isSmall ? "24" : "28"}
          viewBox="0 0 24 24"
          stroke={selected ? "#FF50AA" : isSmall ? "#A0A5B1" : "white"}
          fill={selected ? "#FF50AA" : "none"}
          isSelected={selected ? true : false}
        />
      </button>
      <button className="hidden w-fit pc:inline" onClick={handleClick} aria-label="이 행사를 마이페이지에 저장/삭제" {...props}>
        <HeartIcon
          width={isSmall ? "24" : "32"}
          height={isSmall ? "24" : "32"}
          viewBox="0 0 24 24"
          stroke={selected ? "#FF50AA" : isSmall ? "#A0A5B1" : "white"}
          fill={selected ? "#FF50AA" : "none"}
          isSelected={selected ? true : false}
        />
      </button>
    </div>
  );
};

export default HeartButton;
