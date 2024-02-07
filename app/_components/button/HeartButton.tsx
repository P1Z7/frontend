"use client";

import { useState } from "react";
import Heart from "@/public/icon/heart.svg";

interface Props {
  isSmall?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
}

const HeartButton = ({ isSmall = false, isSelected = false, onClick, ...props }: Props) => {
  const [selected, setSelected] = useState(isSelected);

  const handleClick = () => {
    setSelected((prev) => !prev);
    onClick?.();
  };

  return (
    <button className="w-fit" onClick={handleClick} {...props}>
      <Heart
        width={isSmall ? "24" : "28"}
        height={isSmall ? "24" : "28"}
        viewBox="0 0 24 24"
        stroke={selected ? "#FF50AA" : isSmall ? "#A0A5B1" : "white"}
        fill={selected ? "#FF50AA" : "none"}
      />
    </button>
  );
};

export default HeartButton;
