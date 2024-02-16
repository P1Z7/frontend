"use client";

import { useQuery } from "@tanstack/react-query";
import { Api } from "@/api/api";
import { Res_Get_Type } from "@/types/getResType";
import Carousel from "./Carousel";

const PopularEventsCarousel = () => {
  const instance = new Api();

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
      {isLoading && <div>로딩중</div>}
      {isSuccess && <Carousel cards={popularEvents} />}
    </div>
  );
};

export default PopularEventsCarousel;
