"use client";

import { useQuery } from "@tanstack/react-query";
import { Api } from "app/api/api";
import VerticalEventCard from "@/components/card/VerticalEventCard";
import { Res_Get_Type } from "@/types/getResType";
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
  } = useQuery<Res_Get_Type["eventList"]>({
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
