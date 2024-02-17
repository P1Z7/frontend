"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import HorizontalEventCard from "@/components/card/HorizontalEventCard";
import { instance } from "@/api/api";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { useSession } from "@/store/session/cookies";
import { Res_Get_Type } from "@/types/getResType";

const SIZE = 12;

const MyArtistEvent = () => {
  const session = useSession();

  if (!session) return;

  const getArtistEvents = async ({ pageParam = 1 }) => {
    const data: Res_Get_Type["eventSearch"] = await instance.get(`/event/${session.user.userId}/artist`, {
      size: SIZE,
      page: pageParam,
      userId: session.user.userId,
    });
    return data;
  };

  const { data: artistEvents, fetchNextPage } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["artistEvent"],
    queryFn: getArtistEvents,
    getNextPageParam: (lastPage) => (lastPage.page * SIZE < lastPage.totalCount ? lastPage.page + 1 : null),
  });

  const containerRef = useInfiniteScroll({
    handleScroll: fetchNextPage,
    deps: [artistEvents],
  });

  return (
    <>
      <div className="flex-center flex-wrap gap-x-24">
        {artistEvents?.pages.map((page) => page.eventList.map((event) => <HorizontalEventCard key={event.id} data={event} />))}
        <div ref={containerRef} className="h-16 w-full" />
      </div>
    </>
  );
};

export default MyArtistEvent;
