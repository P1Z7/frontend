"use client";

import { useQuery } from "@tanstack/react-query";
import { Api } from "app/_api/api";
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
    <>
      {isLoading && <div>로딩중</div>}
      {isSuccess && <Carousel title="지금 가장 인기 있는 행사" cards={popularEvents} />}
    </>
  );
};

export default PopularEventsCarousel;
