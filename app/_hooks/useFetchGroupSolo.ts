import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Api } from "@/api/api";
import useInfiniteScroll from "./useInfiniteScroll";

const SIZE = 24;

export const useFetchGroupSolo = (instance: Api) => {
  const [groupList, setGroupList] = useState<any[]>([]);
  const [keyword, setKeyword] = useState("");
  const { data, fetchNextPage, isSuccess, isLoading } = useInfiniteQuery({
    queryKey: ["group", keyword],
    queryFn: async ({ pageParam }) => {
      const res = await instance.get("/group/solo", { size: SIZE, page: pageParam, keyword: keyword });
      pageParam === 1 ? setGroupList(res.groupAndSoloList) : setGroupList((prev) => [...prev, ...res.groupAndSoloList]);
      return res;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.page * SIZE < lastPage.totalCount ? lastPage.page + 1 : null),
  });

  const containerRef = useInfiniteScroll({ handleScroll: fetchNextPage, deps: [data] });

  return { setKeyword, groupList, containerRef, isSuccess, isLoading };
};
