"use client";

import SortButton from "@/(route)/(bottom-nav)/search/_components/SortButton";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import HorizontalEventCard from "@/components/card/HorizontalEventCard";
import DeferredSuspense from "@/components/skeleton/DeferredSuspense";
import HorizontalEventCardSkeleton from "@/components/skeleton/HorizontalEventCardSkeleton";
import { instance } from "@/api/api";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { Res_Get_Type } from "@/types/getResType";
import SortIcon from "@/public/icon/sort.svg";
import NoContent from "../../NoContent";

const SIZE = 20;

const SORT = ["최신순", "인기순"] as const;

interface Props {
  userId: string;
}

const MyArtistEvent = ({ userId }: Props) => {
  const [sort, setSort] = useState<(typeof SORT)[number]>(SORT[0]);

  const getArtistEvents = async ({ pageParam = 1 }) => {
    const data: Res_Get_Type["artistEvent"] = await instance.get(`/event/${userId}/artist`, {
      sort,
      size: SIZE,
      page: pageParam,
      userId: userId,
    });
    return data;
  };

  const {
    data: artistEvents,
    fetchNextPage,
    refetch,
    isFetching,
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["artistEvent"],
    queryFn: getArtistEvents,
    getNextPageParam: (lastPage) => lastPage && (lastPage.page * SIZE < lastPage.totalCount ? lastPage.page + 1 : null),
  });

  const containerRef = useInfiniteScroll({
    handleScroll: fetchNextPage,
    deps: [artistEvents],
  });

  useEffect(() => {
    refetch();
  }, [sort]);

  return (
    <>
      <div className="flex-center w-full flex-col pb-88 pc:pb-16">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-16 font-600">내 아티스트 이벤트</h1>
          <div className="flex w-fit items-center gap-8">
            <SortIcon />
            <SortButton onClick={() => setSort("최신순")} selected={sort === "최신순"}>
              최신순
            </SortButton>
            <SortButton onClick={() => setSort("인기순")} selected={sort === "인기순"}>
              인기순
            </SortButton>
          </div>
        </div>
        {artistEvents?.pages[0].totalCount ? (
          <div className="flex w-full flex-wrap items-center gap-x-24">
            {artistEvents?.pages.map((page) => page?.eventList.map((event) => <HorizontalEventCard key={event.id} data={event} isGrow />))}
            <DeferredSuspense fallback={<HorizontalEventCardSkeleton />} isFetching={isFetching} />
            <div ref={containerRef} className="h-16 w-full" />
          </div>
        ) : (
          <NoContent type="MyPost" />
        )}
      </div>
    </>
  );
};

export default MyArtistEvent;
