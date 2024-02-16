"use client";

import confetti from "canvas-confetti";
import { useRef, useState } from "react";
import Heart from "@/public/icon/heart.svg";

interface Props {
  isSmall?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
}

const ConfettiButton = ({ isSmall = false, isSelected = false, onClick, ...props }: Props) => {
  const [selected, setSelected] = useState(isSelected);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    setSelected((prev) => !prev);
    onClick?.();

    const rect = buttonRef.current?.getBoundingClientRect();
    const { innerWidth, innerHeight } = window;
    if (rect && selected === true) {
      confetti({
        particleCount: 1,
        scalar: 3,
        spread: 50,
        startVelocity: 10,
        shapes: [heart],
        colors: ["#EB278C", "#ff008480", "#e11e831f"],
        origin: { x: (rect.left + rect.right) / 2 / innerWidth, y: (rect.top + rect.bottom) / 2 / innerHeight },
      });
    }
  };

  return (
    <button ref={buttonRef} className="w-fit" onClick={handleClick} {...props}>
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

export default ConfettiButton;

const heart = confetti.shapeFromPath({
  path: "M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z",
});
