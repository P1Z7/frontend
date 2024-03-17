"use client";

import MyKakaoMap from "@/(route)/mypage/_components/tab/MyLocationTab/MyKaKaoMap";
import SortButton from "@/(route)/search/_components/SortButton";
import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import DottedLayout from "@/components/layout/DottedLayout";
import { instance } from "@/api/api";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { useScrollBottomSheet } from "@/hooks/useScrollBottomSheet";
import { getSession } from "@/store/session/cookies";
import { getArtist, getGroup } from "@/utils/getArtist";
import { Res_Get_Type } from "@/types/getResType";
import { EventCardType } from "@/types/index";
import SortIcon from "@/public/icon/sort.svg";
import ArtistMap from "./_components/ArtistMap";
import ChipButtons from "./_components/ChipButtons";
import EventCard from "./_components/EventCard";

const SIZE = 9999;

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
    isSuccess,
    refetch,
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["events", artistId],
    queryFn: getArtistData,
    getNextPageParam: (lastPage) => (lastPage.page * SIZE < lastPage.totalCount ? lastPage.page + 1 : null),
  });

  const containerRef = useInfiniteScroll({
    handleScroll: fetchNextPage,
    deps: [artistData],
  });

  useEffect(() => {
    refetch();
  }, [sort, status]);

  const [toggleTab, setToggleTab] = useState(true);

  const handleButtonClick = () => {
    setToggleTab((prev) => !prev);
  };

  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  const [locationInfo, setLocationInfo] = useState<EventCardType | undefined>();

  const handleCardClick = (id: string) => {
    setSelectedCardId(id === selectedCardId ? null : id);
  };

  if (!isSuccess) return;

  const isEmpty = artistData.pages[0].eventList.length === 0;
  const mapData = artistData.pages[0].eventList;

  return (
    <DottedLayout size="wide">
      <div className="relative h-[calc(100vh-7.2rem)] w-full overflow-hidden pc:mb-128 pc:mt-48 pc:h-[84rem]">
        <div className="absolute left-0 top-0 z-zero h-full w-full pc:h-[84rem] pc:rounded-lg pc:border pc:border-gray-100">
          <ArtistMap scheduleData={mapData} setLocationInfo={setLocationInfo} setSelectedCardId={setSelectedCardId} />
        </div>
        <button
          onClick={handleButtonClick}
          className={`tablet:flex-center absolute z-nav hidden h-60 w-24 rounded-r-sm border border-gray-100 bg-white-white tablet:top-44 pc:top-24 ${toggleTab ? "border-l-white-white tablet:left-360 pc:left-400" : "left-0"}`}
        >
          <Image src="/icon/arrow-left.svg" width={20} height={20} alt="화살표" className={`${toggleTab || "scale-x-[-1]"}`} />
        </button>
        {toggleTab && (
          <div className="absolute bottom-0 flex max-h-344 min-h-84 w-full flex-col gap-16 rounded-t-lg bg-white-black pt-28 shadow-2xl tablet:top-0 tablet:max-h-full tablet:w-360 tablet:rounded-none tablet:border tablet:border-gray-100 tablet:border-t-transparent tablet:pt-20 tablet:shadow-none pc:top-0 pc:h-[84rem] pc:w-400 pc:rounded-l-lg pc:border-t-gray-100 pc:py-20">
            <div className="absolute left-[calc((100%-64px)/2)] top-12 h-4 w-64 rounded-sm bg-gray-700 tablet:hidden" />
            <div className="flex flex-row items-center justify-start gap-12 px-20 pc:w-full">
              <div className="relative h-36 w-36 pc:h-64 pc:w-64">
                <Image src={image ? image : "/image/no-profile.png"} alt="아티스트 이미지" fill sizes="64px" className="rounded-full object-cover" />
              </div>
              <p className="text-16 leading-[2.4rem] text-gray-700">
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
            <div className="overflow-scroll scrollbar-none pc:h-[65rem]">
              {isEmpty ? (
                <p className="flex-center w-full pt-20 text-14 font-500">행사가 없습니다.</p>
              ) : (
                <div className="px-20">
                  {artistData.pages.map((page) =>
                    page.eventList.map((event) => <EventCard key={event.id} data={event} isSelected={selectedCardId === event.id} onCardClick={() => handleCardClick(event.id)} />),
                  )}
                </div>
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
