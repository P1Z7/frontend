import { useState } from "react";
import Heart from "@/public/icon/heart.svg";

interface Props {
  isSmall?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
}

const HeartButton = ({ isSmall = false, isSelected = false, onClick, ...props }: Props) => {
  return (
    <button className="w-fit" onClick={onClick} {...props}>
      <Heart
        width={isSmall ? "20" : "24"}
        height={isSmall ? "20" : "24"}
        viewBox="0 0 24 24"
        stroke={isSelected ? "#FF50AA" : isSmall ? "#A0A5B1" : "white"}
        fill={isSelected ? "#FF50AA" : "none"}
      />
    </button>
  );
};

export default HeartButton;
