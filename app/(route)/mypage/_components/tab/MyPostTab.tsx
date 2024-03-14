"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import HorizontalEventCard from "@/components/card/HorizontalEventCard";
import { instance } from "@/api/api";
import { EventCardType } from "@/types/index";
import NoContent from "../NoContent";

interface Props {
  userId: string;
}

const MyPostTab = ({ userId }: Props) => {
  const [Dep, setDep] = useState("");
  const { data: myEventsData, isSuccess } = useQuery({
    queryKey: ["events", Dep],
    queryFn: async () => {
      return instance.get(`/event/user/${userId}`, { userId: userId });
    },
  });

  if (!isSuccess) return;
  return (
    <ul className="flex-center w-full flex-col px-20 pb-88 pt-8 pc:pb-16">
      {myEventsData.totalCount ? (
        myEventsData.eventList.map((event: EventCardType) => <HorizontalEventCard key={event.id} data={event} isGrow isMypage setDep={setDep} />)
      ) : (
        <NoContent type="MyPost" />
      )}
    </ul>
  );
};

export default MyPostTab;
