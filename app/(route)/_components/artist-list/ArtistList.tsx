"use client";

import LoadingDot from "@/(route)/(bottom-nav)/signin/_components/LoadingDot";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import ArtistCard from "@/components/ArtistCard";
import DeferredSuspense from "@/components/skeleton/DeferredSuspense";
import { instance } from "@/api/api";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { Res_Get_Type } from "@/types/getResType";

const SIZE = 24;

const ArtistList = () => {
  const router = useRouter();

  const getArtists = async ({ pageParam = 1 }) => {
    const data: Res_Get_Type["artistGroup"] = await instance.get("/artist/group", {
      size: SIZE,
      page: pageParam,
    });
    return data;
  };

  const {
    data: artistData,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["artist"],
    queryFn: getArtists,
    getNextPageParam: (lastPage) => (lastPage.page * SIZE < lastPage.totalCount ? lastPage.page + 1 : null),
  });

  const containerRef = useInfiniteScroll({
    handleScroll: fetchNextPage,
    deps: [artistData],
  });

  return (
    <div className="flex flex-col gap-16 px-20 pc:px-40">
      <h2 className="text-20 font-700 text-gray-900">아티스트로 찾아보기</h2>
      <div className="flex flex-col items-center">
        <div className="flex w-full max-w-[52rem] flex-col items-center pc:max-w-full">
          <ul className="flex flex-wrap justify-center gap-20 pc:gap-32">
            {artistData?.pages.map((page) =>
              page.artistAndGroupList.map((artist) => (
                <li key={artist.id} className="w-88 pc:w-120">
                  <ArtistCard profileImage={artist.image} onClick={() => router.push(`/artist/${artist.id}`)}>
                    {artist.name}
                  </ArtistCard>
                </li>
              )),
            )}
            <li ref={containerRef} className="h-16 w-full" />
          </ul>
          <DeferredSuspense fallback={<LoadingDot />} isFetching={isFetching} />
        </div>
      </div>
    </div>
  );
};

export default ArtistList;
