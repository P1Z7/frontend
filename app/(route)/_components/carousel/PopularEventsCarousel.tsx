"use client";

import { useQuery } from "@tanstack/react-query";
import { instance } from "app/_api/api";
import dynamic from "next/dynamic";
import { Res_Get_Type } from "@/types/getResType";

const Carousel = dynamic(() => import("./Carousel"), { ssr: false });
const VerticalEventCardSkeleton = dynamic(() => import("@/components/skeleton/VerticalEventCardSkeleton"), { ssr: false });

const PopularEventsCarousel = () => {
  const {
    data: popularEvents,
    isLoading,
    isSuccess,
  } = useQuery<Res_Get_Type["eventList"]>({
    queryKey: ["event", "popular"],
    queryFn: async () => {
      return instance.get("/event/popularity");
    },
  });

  return (
    <div className="flex flex-col gap-16 pc:gap-24">
      <h2 className="px-20 text-20 font-700 text-gray-900 pc:px-48">지금 가장 인기 있는 행사</h2>
      {isLoading && <VerticalEventCardSkeleton />}
      {isSuccess &&
        (popularEvents.length ? (
          <Carousel cards={popularEvents} />
        ) : (
          <div className="flex-center h-272">
            <p className="text-16 font-600 text-gray-500">현재 행사 정보가 없습니다.</p>
          </div>
        ))}
    </div>
  );
};

export default PopularEventsCarousel;
