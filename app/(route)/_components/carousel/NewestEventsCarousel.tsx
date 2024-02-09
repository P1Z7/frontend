"use client";

import { useQuery } from "@tanstack/react-query";
import VerticalEventCard from "@/components/card/VerticalEventCard";
import { Api } from "@/api/api";
import { EventCardType } from "@/types/getBodyType";
import Carousel from "./Carousel";

const NewestEventsCarousel = () => {
  return (
    <Carousel title="새로 올라온 행사">
      <NewestEvents />
    </Carousel>
  );
};

const NewestEvents = () => {
  const instance = new Api(process.env.NEXT_PUBLIC_ACCESS_TOKEN);

  const {
    data: newestEvents,
    isSuccess,
    isLoading,
  } = useQuery<EventCardType[]>({
    queryKey: ["event", "new"],
    queryFn: async () => {
      return instance.get("/event/new");
    },
  });

  return (
    <>
      {isLoading && <div>로딩중</div>}
      {isSuccess && (
        <>
          {newestEvents?.map((event) => (
            <div key={event.id}>
              <VerticalEventCard data={event} />
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default NewestEventsCarousel;
