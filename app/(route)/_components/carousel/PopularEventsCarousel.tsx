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
  const instance = new Api("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE3MDcxMjgwNDF9.AR8YcpB9rBxRpk8DcWM-JvSbU9oPkLjPRXL7g5GwG8w");

  const { data: popularEvents } = useQuery<EventCardType[]>({
    queryKey: ["event"],
    queryFn: async () => {
      return await instance.get("/event/popularity");
    },
  });

  return (
    <>
      {popularEvents?.map((event) => (
        <div key={event.id}>
          <VerticalEventCard data={event} />
        </div>
      ))}
    </>
  );
};

export default PopularEventsCarousel;
