"use client";

import { useQuery } from "@tanstack/react-query";
import { Api } from "app/_api/api";
import VerticalEventCard from "@/components/card/VerticalEventCard";
import { Res_Get_Type } from "@/types/getResType";
import Carousel from "./Carousel";

const NewestEventsCarousel = () => {
  const instance = new Api();

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
    <>
      {isLoading && <div>로딩중</div>}
      {isSuccess && <Carousel title="새로 올라온 행사" cards={newestEvents} />}
    </>
  );
};

export default NewestEventsCarousel;
