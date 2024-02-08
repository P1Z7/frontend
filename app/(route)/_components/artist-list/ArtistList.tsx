"use client";

import { useQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroller";
import ArtistCard from "@/components/ArtistCard";
import { Api } from "@/api/api";
import { ArtistAndGroupListType } from "@/types/index";

const ArtistList = () => {
  const instance = new Api(process.env.NEXT_PUBLIC_ACCESS_TOKEN);

  const {
    data: artistData,
    isSuccess,
    isLoading,
  } = useQuery<ArtistAndGroupListType>({
    queryKey: ["artist"],
    queryFn: async () => {
      return instance.get("/artist/group", { size: 12, page: 1 });
    },
  });

  return (
    <div className="flex flex-col gap-16 px-20">
      <h2 className="text-20 font-700 text-gray-900">아티스트로 찾아보기</h2>
      {/* <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={hasMore}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
        className="flex flex-col items-center"
      > */}
      <div className="flex flex-col items-center">
        <div className="flex w-full max-w-[52rem] flex-col items-center">
          {isLoading && <div>로딩중</div>}
          {isSuccess && (
            <ul className="flex flex-wrap justify-center gap-20">
              {artistData?.artistAndGroupList.map((artist) => (
                <li key={artist.id} className="w-88">
                  <ArtistCard profileImage={artist.image}>{artist.name}</ArtistCard>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {/* </InfiniteScroll> */}
    </div>
  );
};

export default ArtistList;
