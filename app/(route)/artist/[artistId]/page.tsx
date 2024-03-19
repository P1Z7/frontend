"use client";

import SortButton from "@/(route)/search/_components/SortButton";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import KakaoMap from "@/components/KakaoMap";
import MetaTag from "@/components/MetaTag";
import TimeFilter from "@/components/TimeFilter";
import DottedLayout from "@/components/layout/DottedLayout";
import { instance } from "@/api/api";
import useCustomMap from "@/hooks/useCustomMap";
import { getArtist, getGroup } from "@/utils/getArtist";
import { Res_Get_Type } from "@/types/getResType";
import { SORT, STATUS, SortItem } from "@/constants/eventStatus";
import SortIcon from "@/public/icon/sort.svg";
import EventCard from "./_components/EventCard";
import MobileTab from "./_components/MobileTab";
import useArtistSheet from "./_hooks/useArtistSheet";

const SIZE = 9999;

const ArtistIdPage = () => {
  const { artistId } = useParams() as { artistId: string };

  const group = getGroup(instance, artistId);
  const artist = getArtist(instance, artistId);

  const name = group.groupName || artist.artistName;
  const image = group.groupImage || artist.artistImage;

  const [sort, setSort] = useState<SortItem>(SORT[0]);
  const [status, setStatus] = useState(3);

  const {
    data: artistData,
    isSuccess,
    refetch,
  } = useQuery<Res_Get_Type["eventSearch"]>({
    queryKey: ["events", artistId],
    queryFn: () =>
      instance.get(`/event/artist/${artistId}`, {
        sort,
        size: SIZE,
        status: STATUS[status],
        artistId,
      }),
  });

  useEffect(() => {
    refetch();
  }, [sort, status]);

  const { mapVar, mapCallback } = useCustomMap();
  const { sheet, content } = useArtistSheet();

  if (!isSuccess) return;

  const eventData = artistData.eventList;
  const isEmpty = eventData.length === 0;

  return (
    <>
      <MetaTag title={`${name}`} imgUrl={image} description={`${name}의 행사 정보들을 지도를 통해 쉽게 확인해 보세요.`} />
      <DottedLayout size="wide">
        <div className="relative h-[calc(100vh-7.2rem)] w-full overflow-hidden pc:mb-128 pc:mt-48 pc:h-[84rem]">
          <div
            className={`absolute left-0 top-0 z-zero h-full w-full ${mapVar.toggleTab ? "tablet:pl-360 pc:pl-400" : ""} tablet:pb-0 pc:h-[84rem] pc:rounded-lg pc:border pc:border-gray-100`}
          >
            <KakaoMap scheduleData={eventData} {...mapVar} />
          </div>
          <button
            onClick={mapCallback.handleButtonClick}
            className={`tablet:flex-center absolute z-nav hidden h-60 w-24 rounded-r-sm border border-gray-100 bg-white-white tablet:top-44 pc:top-24 ${mapVar.toggleTab ? "border-l-white-white tablet:left-360 pc:left-400" : "left-0"}`}
          >
            <Image src="/icon/arrow-left.svg" width={20} height={20} alt="화살표" className={`${mapVar.toggleTab || "scale-x-[-1]"}`} />
          </button>
          {mapVar.toggleTab && (
            <div
              ref={sheet}
              className="fixed top-[calc(100vh-384px)] flex min-h-84 w-full flex-col gap-16 rounded-t-lg bg-white-black pt-28 shadow-2xl tablet:absolute tablet:bottom-0 tablet:top-0 tablet:max-h-full tablet:w-360 tablet:rounded-none tablet:border tablet:border-gray-100 tablet:border-t-transparent tablet:pt-20 tablet:shadow-none pc:top-0 pc:h-[84rem] pc:w-400 pc:rounded-l-lg pc:border-t-gray-100 pc:py-20"
            >
              <div className="absolute left-[calc((100%-64px)/2)] top-12 h-4 w-64 rounded-sm bg-gray-700 tablet:hidden" />
              <div className="flex flex-row items-center justify-start gap-12 px-20 pc:w-full">
                <div className="relative h-36 w-36 pc:h-64 pc:w-64">
                  <Image src={image ?? "/image/no-profile.png"} alt="아티스트 이미지" fill sizes="64px" className="rounded-full object-cover" />
                </div>
                <p className="text-16 leading-[2.4rem] text-gray-700">
                  <span className="font-600">{name}</span> 행사 보기
                </p>
              </div>
              <TimeFilter setStatus={setStatus} status={status} />
              <div className="flex items-center gap-8 px-20">
                <SortIcon />
                <SortButton onClick={() => setSort("최신순")} selected={sort === "최신순"}>
                  최신순
                </SortButton>
                <SortButton onClick={() => setSort("인기순")} selected={sort === "인기순"}>
                  인기순
                </SortButton>
              </div>
              <div className="max-h-[80rem] min-h-200 overflow-scroll pb-[70rem] scrollbar-none tablet:max-h-none tablet:pb-0 pc:h-[65rem]">
                {isEmpty ? (
                  <p className="flex-center w-full pt-20 text-14 font-500">행사가 없습니다.</p>
                ) : (
                  <div ref={content} className="px-20">
                    {eventData.map((event) => (
                      <EventCard
                        key={event.id}
                        data={event}
                        isSelected={mapVar.selectedCard?.id === event.id}
                        onCardClick={() => mapCallback.handleCardClick(event)}
                        scrollRef={mapVar.selectedCard?.id === event.id ? mapCallback.scrollRefCallback : null}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </DottedLayout>
    </>
  );
};

export default ArtistIdPage;
