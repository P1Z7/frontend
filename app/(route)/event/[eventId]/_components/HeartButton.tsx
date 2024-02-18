"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ButtonHTMLAttributes, useState } from "react";
import { instance } from "@/api/api";
import { useSession } from "@/store/session/cookies";
import { Res_Get_Type } from "@/types/getResType";
import HeartIcon from "@/public/icon/heart.svg";

const DEFAULT_USER_ID = "default";

interface HeartButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  eventId: string;
  initialLikeCount: number;
}

const HeartButton = ({ eventId, initialLikeCount }: HeartButtonProps) => {
  const session = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();

  const userId = session?.user.userId ?? DEFAULT_USER_ID;

  const { data: likeData } = useQuery<Res_Get_Type["eventLike"]>({
    queryKey: ["like", eventId, userId],
    queryFn: () => instance.get("/event/like", { eventId, userId }),
  });

  const likeMutation = useMutation({
    mutationFn: () => instance.post("/event/like", { eventId, userId }),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["like", eventId, userId],
      });

      const prevStatus = queryClient.getQueryData(["like", eventId, userId]);

      queryClient.setQueryData(["like", eventId, userId], (prev: Res_Get_Type["eventLike"]) => ({
        status: !prev.status,
        likeCount: prev.status ? prev.likeCount - 1 : prev.likeCount + 1,
      }));

      return prevStatus;
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(["like", eventId, userId], context);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["like", eventId, userId],
      });
    },
  });

  const handleLikeEvent = () => {
    if (!session) {
      router.push("/signin");
    }
    likeMutation.mutate();
  };

  const liked = likeData?.status ?? false;
  const likeCount = likeData?.likeCount ?? initialLikeCount;

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
