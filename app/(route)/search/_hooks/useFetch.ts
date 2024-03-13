import { keepPreviousData, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { instance } from "@/api/api";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { getSession } from "@/store/session/cookies";
import { Res_Get_Type } from "@/types/getResType";
import { StatusType } from "@/types/index";
import { TAG } from "@/constants/post";
import { FilterType, SortType } from "./useSearch";

interface Props {
  keyword: string;
  sort: SortType;
  status: StatusType;
  filter: FilterType;
}

const useFetch = ({ keyword, sort, status, filter }: Props) => {
  const session = getSession();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const getEvents = async ({ pageParam = 1 }) => {
    const data: Res_Get_Type["eventSearch"] = await instance.get("/event", {
      size: SIZE,
      page: pageParam,
      sort,
      keyword,
      sido: filter.bigRegion,
      gungu: filter.smallRegion === "전지역" ? "" : filter.smallRegion,
      ...{ startDate: filter.startDate || "" },
      ...{ endDate: filter.endDate || "" },
      tags: filter.gifts.map((gift) => TAG[gift]).join(","),
      type: filter.event,
      userId: session?.user.userId ?? "",
      status,
    });
    return data;
  };

  const {
    data: events,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["search"],
    queryFn: getEvents,
    getNextPageParam: (lastPage) => (lastPage.page * SIZE < lastPage.totalCount ? lastPage.page + 1 : null),
    placeholderData: keepPreviousData,
  });

  // useEffect(() => {
  //   queryClient.removeQueries({ queryKey: ["search"] });
  //   refetch();
  // }, [searchParams]);

  const containerRef = useInfiniteScroll({
    handleScroll: fetchNextPage,
    deps: [events],
  });

  return { events, containerRef };
};

export default useFetch;

const SIZE = 20;
