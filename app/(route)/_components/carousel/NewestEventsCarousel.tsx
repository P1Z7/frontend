"use client";

import { useQuery } from "@tanstack/react-query";
import { instance } from "app/_api/api";
import VerticalEventCardSkeleton from "@/components/skeleton/VerticalEventCardSkeleton";
import { Res_Get_Type } from "@/types/getResType";
import Carousel from "./Carousel";

const NewestEventsCarousel = () => {
  const {
    data: newestEvents,
    isLoading,
    isSuccess,
  } = useQuery<Res_Get_Type["eventList"]>({
    queryKey: ["event", "new"],
    queryFn: async () => {
      return instance.get("/event/new");
    },
  });

  return (
    <div className="flex flex-col gap-16 pc:gap-24">
      <h2 className="px-20 text-20 font-700 text-gray-900 pc:px-48">새로 올라온 행사</h2>
      {!isSuccess && <VerticalEventCardSkeleton />}
      {isSuccess &&
        (newestEvents.length ? (
          <Carousel cards={newestEvents} />
        ) : (
          <div className="flex-center h-272">
            <p className="text-16 font-600 text-gray-400">현재 행사 정보가 없습니다.</p>
          </div>
        ))}
    </div>
  );
};

export default NewestEventsCarousel;
