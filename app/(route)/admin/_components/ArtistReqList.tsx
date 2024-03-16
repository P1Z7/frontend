import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { instance } from "@/api/api";

const SIZE = 12;

const ArtistReqList = () => {
  // const [artistList, setArtistList] = useState<any[]>([]);
  // const { data, fetchNextPage, isSuccess, isLoading } = useInfiniteQuery({
  //   queryKey: ["admin_artist"],
  //   queryFn: async ({ pageParam }) => {
  //     const res = await instance.get("/reviews/claims/all", { size: SIZE, cursorId: pageParam });
  //     pageParam === 1 ? setArtistList(res) : setArtistList((prev) => [...prev, ...res]);
  //     return res;
  //   },
  //   initialPageParam: 1,
  //   getNextPageParam: (lastPage) => (lastPage.length < SIZE ? null : lastPage.at(-1)?.cursorId),
  // });
  // const containerRef = useInfiniteScroll({ handleScroll: fetchNextPage, deps: [data] });

  // const session = getSession();
  // const deleteReview = async (id: string) => {
  //   await instance.delete(`/reviews/${id}/users/${session?.user.userId}`);
  // };
  return <div>api가 업슈.......</div>;
};

export default ArtistReqList;
