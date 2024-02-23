"use client";

import { ButtonHTMLAttributes } from "react";
import useLikeEvent from "@/hooks/useLikeEvent";
import HeartIcon from "@/public/icon/heart.svg";

interface HeartButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  eventId: string;
  initialLike: boolean;
  initialLikeCount: number;
}

const HeartButton = ({ eventId, initialLike, initialLikeCount }: HeartButtonProps) => {
  const { liked, likeCount, handleLikeEvent } = useLikeEvent({ eventId, initialLike, initialLikeCount });

  return (
    <button onClick={handleLikeEvent} className="absolute right-20 top-24 text-center text-12 font-600 pc:right-0 pc:top-0 pc:text-14">
      <div className="pc:hidden">
        <HeartIcon stroke={liked ? "#FF50AA" : "#1C1E22"} fill={liked ? "#FF50AA" : "none"} strokeWidth={1.7} />
      </div>
      <div className="hidden pc:block">
        <HeartIcon stroke={liked ? "#FF50AA" : "#1C1E22"} fill={liked ? "#FF50AA" : "none"} width={32} height={32} viewBox="0 0 24 24" strokeWidth={1.4} />
      </div>
      {likeCount}
    </button>
  );
};

export default HeartButton;
