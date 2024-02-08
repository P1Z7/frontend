"use client";

import { useQuery } from "@tanstack/react-query";
import VerticalEventCard from "@/components/card/VerticalEventCard";
import { Api } from "@/api/api";
import { EventCardType } from "@/types/index";
import Carousel from "./Carousel";

const PopularEventsCarousel = () => {
  return (
    <Carousel title="지금 가장 인기 있는 행사">
      <PopularEvents />
    </Carousel>
  );
};

const PopularEvents = () => {
  const instance = new Api(process.env.NEXT_PUBLIC_ACCESS_TOKEN);

  const {
    data: popularEvents,
    isSuccess,
    isLoading,
  } = useQuery<EventCardType[]>({
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
