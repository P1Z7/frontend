"use client";

import { useQuery } from "@tanstack/react-query";
import VerticalEventCard from "@/components/card/VerticalEventCard";
import { Api } from "@/api/api";
import { EventCardType } from "@/types/index";
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

  const { data: newestEvents } = useQuery<EventCardType[]>({
    queryKey: ["event"],
    queryFn: async () => {
      return await instance.get("/event/new");
    },
  });

  return (
    <>
      {newestEvents?.map((event) => (
        <div key={event.id}>
          <VerticalEventCard data={event} />
        </div>
      ))}
    </>
  );
};

export default NewestEventsCarousel;
