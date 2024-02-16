"use client";

import { useQuery } from "@tanstack/react-query";
import { instance } from "app/_api/api";
import VerticalEventCard from "@/components/card/VerticalEventCard";
import { Res_Get_Type } from "@/types/getResType";
import Carousel from "./Carousel";

const PopularEventsCarousel = () => {
  return (
    <Carousel title="지금 가장 인기 있는 행사">
      <PopularEvents />
    </Carousel>
  );
};

const PopularEvents = () => {
  const {
    data: popularEvents,
    isSuccess,
    isLoading,
  } = useQuery<Res_Get_Type["eventList"]>({
    queryKey: ["event", "popular"],
    queryFn: async () => {
      return instance.get("/event/popularity");
    },
  });

  return (
    <>
      {isLoading && <div>로딩중</div>}
      {isSuccess && (
        <>
          {popularEvents?.map((event) => (
            <div key={event.id}>
              <VerticalEventCard data={event} />
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default PopularEventsCarousel;
