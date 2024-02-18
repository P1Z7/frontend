"use client";

import SortButton from "@/(route)/(bottom-nav)/search/_components/SortButton";
import { useInfiniteQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import HorizontalEventCard from "@/components/card/HorizontalEventCard";
import { instance } from "@/api/api";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { useSession } from "@/store/session/cookies";
import { Res_Get_Type } from "@/types/getResType";
import ResetIcon from "@/public/icon/reset.svg";
import SortIcon from "@/public/icon/sort.svg";

const SIZE = 12;

const SORT = ["최신순", "인기순"] as const;

const MyArtistEvent = () => {
  const session = useSession();

  if (!session) return;

  const getArtistEvents = async ({ pageParam = 1 }) => {
    const data: Res_Get_Type["artistEvent"] = await instance.get(`/event/${session.user.userId}/artist`, {
      sort,
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

  const [sort, setSort] = useState<(typeof SORT)[number]>(SORT[0]);

  const pathname = usePathname();
  const router = useRouter();

  const resetFilter = () => {
    setSort(SORT[0]);
  };

  useEffect(() => {
    router.push(`${pathname}?sort=${sort}`);
  }, [sort]);

  return (
    <>
      <div className="flex items-center gap-8">
        <SortIcon />
        <SortButton onClick={() => setSort("최신순")} selected={sort === "최신순"}>
          최신순
        </SortButton>
        <SortButton onClick={() => setSort("인기순")} selected={sort === "인기순"}>
          인기순
        </SortButton>
        <button onClick={resetFilter} type="button" className="ml-auto flex gap-[0.3rem] text-14 text-gray-400">
          초기화
          <ResetIcon />
        </button>
      </div>
      <div className="flex-center flex-wrap gap-x-24">
        {artistEvents?.pages.map((page) => page.eventList.map((event) => <HorizontalEventCard key={event.id} data={event} />))}
        <div ref={containerRef} className="h-16 w-full" />
      </div>
    </>
  );
};

export default MyArtistEvent;
