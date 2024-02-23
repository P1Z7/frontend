"use client";

import { usePathname } from "next/navigation";
import { ButtonHTMLAttributes, useEffect, useRef, useState } from "react";
import useLikeEvent from "@/hooks/useLikeEvent";
import { confettiHeart } from "@/constants/confetti";
import HeartIcon from "@/public/icon/heart.svg";

interface HeartButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  eventId: string;
  initialLike: boolean;
  initialLikeCount: number;
}

const HeartButton = ({ eventId, initialLike, initialLikeCount }: HeartButtonProps) => {
  const [selected, setSelected] = useState(initialLike);
  const { liked, likeCount, handleLikeEvent } = useLikeEvent({ eventId, initialLike, initialLikeCount });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setSelected(liked);
  }, [liked]);

  const handleClick = () => {
    setSelected((prev) => !prev);
    handleLikeEvent();

    confettiHeart(buttonRef, selected, pathname);
  };

  return (
    <button ref={buttonRef} onClick={handleClick} className="absolute right-20 top-24 text-center text-12 font-600 pc:right-0 pc:top-0 pc:text-14">
      <div className="pc:hidden">
        <HeartIcon stroke={selected ? "#FF50AA" : "#1C1E22"} fill={selected ? "#FF50AA" : "none"} strokeWidth={1.7} />
      </div>
      <div className="hidden pc:block">
        <HeartIcon stroke={selected ? "#FF50AA" : "#1C1E22"} fill={selected ? "#FF50AA" : "none"} width={32} height={32} viewBox="0 0 24 24" strokeWidth={1.4} />
      </div>
      {likeCount}
    </button>
  );
};

export default HeartButton;
