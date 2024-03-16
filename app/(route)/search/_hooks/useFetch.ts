import { keepPreviousData, useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();

  const getEvents = async ({ pageParam = 1 }) => {
    const data: Res_Get_Type["eventSearch"] = await instance.get("/event", {
      size: EVENT_SIZE,
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
    refetch: refetchEvents,
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["search-event"],
    queryFn: getEvents,
    getNextPageParam: (lastPage) => (lastPage.page * EVENT_SIZE < lastPage.totalCount ? lastPage.page + 1 : null),
    placeholderData: keepPreviousData,
  });

  const containerRef = useInfiniteScroll({
    handleScroll: fetchNextPage,
    deps: [events],
  });

  const { data: artists, refetch: refetchArtists } = useQuery<Res_Get_Type["artistGroup"]>({
    queryKey: ["search-artist"],
    queryFn: () => instance.get("/artist/group", { keyword: keyword ? keyword : "null", page: 1, size: ARTIST_SIZE }),
    enabled: !!keyword,
  });

  useEffect(() => {
    queryClient.removeQueries({ queryKey: ["search-event"] });
    refetchEvents();
  }, [keyword, sort, status, filter]);

  useEffect(() => {
    queryClient.removeQueries({ queryKey: ["search-artist"] });
    refetchArtists();
  }, [keyword]);

  return { events, artists, containerRef };
};

export default useFetch;

const EVENT_SIZE = 20;
const ARTIST_SIZE = 9999;
