"use client";

import SortButton from "@/(route)/search/_components/SortButton";
import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import HorizontalEventCard from "@/components/card/HorizontalEventCard";
import DottedLayout from "@/components/layout/DottedLayout";
import { instance } from "@/api/api";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { getSession } from "@/store/session/cookies";
import { getArtist, getGroup } from "@/utils/getArtist";
import { Res_Get_Type } from "@/types/getResType";
import { EventCardType } from "@/types/index";
import SortIcon from "@/public/icon/sort.svg";
import ChipButtons from "./_components/ChipButtons";

const SIZE = 12;

const SORT = ["최신순", "인기순"] as const;

type StatusType = "" | "예정" | "종료" | "진행중";

const ArtistIdPage = () => {
  const { artistId } = useParams() as { artistId: string }; // artists -> 멤버, 솔로 // groupId -> 그룹명

  const group = getGroup(instance, artistId);
  const artist = getArtist(instance, artistId);

  const name = group.groupName || artist.artistName;
  const image = group.groupImage || artist.artistImage;

  const [sort, setSort] = useState<(typeof SORT)[number]>(SORT[0]);
  const [status, setStatus] = useState<StatusType>("");

  const session = getSession();

  const getArtistData = async ({ pageParam = 1 }) => {
    const data: Res_Get_Type["eventSearch"] = await instance.get(`/event/artist/${artistId}`, {
      sort,
      size: SIZE,
      page: pageParam,
      status,
      userId: session?.user.userId ?? "",
      artistId,
    });
    return data;
  };

  const {
    data: artistData,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["events"],
    queryFn: getArtistData,
    getNextPageParam: (lastPage) => (lastPage.page * SIZE < lastPage.totalCount ? lastPage.page + 1 : null),
  });

  const containerRef = useInfiniteScroll({
    handleScroll: fetchNextPage,
    deps: [artistData],
  });

  const isEmpty = artistData?.pages[0].eventList.length === 0;

  useEffect(() => {
    refetch();
  }, [sort, status]);

  const [toggleTab, setToggleTab] = useState(true);

  const handleButtonClick = () => {
    setToggleTab((prev) => !prev);
  };

  return (
    <DottedLayout size="wide">
      <div className="relative pc:mb-128 pc:mt-48 pc:h-[84rem] pc:w-full pc:rounded-lg pc:border pc:border-gray-100">
        {/* 지도 영역 */}
        <div className="absolute left-0 top-0 bg-gray-50 pc:h-[84rem] pc:w-full"></div>

        <button onClick={handleButtonClick} className={`flex-center absolute top-24 z-nav rounded-r-sm bg-white-white pc:h-60 pc:w-24 ${toggleTab ? "left-400" : "left-0"}`}>
          <Image src="/icon/arrow-left.svg" width={20} height={20} alt="화살표" className={`${toggleTab || "scale-x-[-1]"}`} />
        </button>
        {toggleTab && (
          <div className="flex flex-col gap-20 bg-white-black pc:h-[84rem] pc:w-400 pc:rounded-lg pc:py-20">
            <div className="pc:flex pc:w-full pc:flex-row pc:items-center pc:justify-start pc:gap-12 pc:px-20">
              <div className="relative h-64 w-64">
                <Image src={image ? image : "/image/no-profile.png"} alt="아티스트 이미지" fill sizes="64px" className="rounded-full object-cover" />
              </div>
              <p className="text-gray-700 pc:text-16 pc:leading-[2.4rem]">
                <span className="font-600">{name}</span> 행사 보기
              </p>
            </div>
            <ChipButtons setStatus={setStatus} status={status} />
            <div className="flex items-center gap-8 px-20">
              <SortIcon />
              <SortButton onClick={() => setSort("최신순")} selected={sort === "최신순"}>
                최신순
              </SortButton>
              <SortButton onClick={() => setSort("인기순")} selected={sort === "인기순"}>
                인기순
              </SortButton>
            </div>
            <div className="overflow-scroll scrollbar-none pc:h-[66.4rem]">
              {isEmpty ? (
                <p className="flex-center w-full pt-20 text-14 font-500">행사가 없습니다.</p>
              ) : (
                <div className="px-20">{artistData?.pages.map((page) => page.eventList.map((event) => <HorizontalEventCard key={event.id} data={event} />))}</div>
              )}
              <div ref={containerRef} className="h-20 w-full" />
            </div>
          </div>
        )}
      </div>
    </DottedLayout>
  );
};

export default ArtistIdPage;
