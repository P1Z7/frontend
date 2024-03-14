"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import HorizontalEventCard from "@/components/card/HorizontalEventCard";
import { instance } from "@/api/api";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { Res_Get_Type } from "@/types/getResType";
import { EventCardType } from "@/types/index";
import NoContent from "../NoContent";

interface Props {
  userId: string;
}

const SIZE = 12;

const MyPostTab = ({ userId }: Props) => {
  const [Dep, setDep] = useState("");

  const getMyEventsData = async ({ pageParam = 1 }) => {
    const data: Res_Get_Type["postedEvent"] = await instance.get(`/event/user/${userId}`, {
      userId: userId,
      size: SIZE,
      page: pageParam,
    });
    return data;
  };

  const { data: myEventsData, fetchNextPage } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["myPost", Dep],
    queryFn: getMyEventsData,
    getNextPageParam: (lastPage) => lastPage && (lastPage.page * SIZE < lastPage.totalCount ? lastPage.page + 1 : null),
  });

  const containerRef = useInfiniteScroll({
    handleScroll: fetchNextPage,
    deps: [myEventsData],
  });

  return (
    <ul className="flex-center w-full flex-col px-20 pb-88 pt-8 pc:pb-16">
      {myEventsData?.pages[0].totalCount ? (
        <>
          {myEventsData?.pages.map((page) => page.eventList.map((event) => <HorizontalEventCard key={event.id} data={event} isGrow isMypage setDep={setDep} />))}
          <div ref={containerRef} className="h-16 w-full" />
        </>
      ) : (
        <NoContent type="MyPost" />
      )}
    </ul>
  );
};

export default MyPostTab;
