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
import SortIcon from "@/public/icon/sort.svg";

const SIZE = 20;

const SORT = ["최신순", "인기순"] as const;

const MyArtistEvent = () => {
  const session = useSession();

  const [sort, setSort] = useState<(typeof SORT)[number]>(SORT[0]);

  const getArtistEvents = async ({ pageParam = 1 }) => {
    if (!session) {
      return;
    }

    const data: Res_Get_Type["artistEvent"] = await instance.get(`/event/${session.user.userId}/artist`, {
      sort,
      size: SIZE,
      page: pageParam,
      userId: session.user.userId,
    });
    return data;
  };

  const {
    data: artistEvents,
    fetchNextPage,
    refetch,
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

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    refetch();
    router.push(`${pathname}?sort=${sort}`);
  }, [sort]);

  return (
    <div className="">
      <h2 className="mb-24 hidden text-20 font-600 text-gray-900 pc:block">내 아티스트의 행사</h2>
      <div className="flex items-center gap-8">
        <SortIcon />
        <SortButton onClick={() => setSort("최신순")} selected={sort === "최신순"}>
          최신순
        </SortButton>
        <SortButton onClick={() => setSort("인기순")} selected={sort === "인기순"}>
          인기순
        </SortButton>
      </div>
      <div className="flex flex-wrap items-center gap-x-24">
        {artistEvents?.pages.map((page) => page?.eventList.map((event) => <HorizontalEventCard key={event.id} data={event} />))}
        <div ref={containerRef} className="h-16 w-full" />
      </div>
    </div>
  );
};

export default MyArtistEvent;
