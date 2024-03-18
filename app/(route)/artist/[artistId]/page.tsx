"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import KakaoMap from "@/components/KakaoMap";
import DottedLayout from "@/components/layout/DottedLayout";
import { instance } from "@/api/api";
import useCustomMap from "@/hooks/useCustomMap";
import { getArtist, getGroup } from "@/utils/getArtist";
import { Res_Get_Type } from "@/types/getResType";
import { SORT, STATUS, SortItem } from "@/constants/eventStatus";
import MobileTab from "./_components/MobileTab";
import PcTab from "./_components/PcTab";

const SIZE = 9999;

const ArtistIdPage = () => {
  const { artistId } = useParams() as { artistId: string }; // artists -> 멤버, 솔로 // groupId -> 그룹명

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

  if (!isSuccess) return;

  const eventData = artistData.eventList;

  return (
    <DottedLayout size="wide">
      <div className="relative h-[calc(100vh-7.2rem)] w-full overflow-hidden pc:mb-128 pc:mt-48 pc:h-[84rem]">
        <div
          className={`z-zero absolute left-0 top-0 h-full w-full ${mapVar.toggleTab ? "tablet:pl-360 pc:pl-400" : ""} pb-344 tablet:pb-0 pc:h-[84rem] pc:rounded-lg pc:border pc:border-gray-100`}
        >
          <KakaoMap scheduleData={eventData} {...mapVar} />
        </div>
        <button
          onClick={mapCallback.handleButtonClick}
          className={`tablet:flex-center absolute z-nav hidden h-60 w-24 rounded-r-sm border border-gray-100 bg-white-white tablet:top-44 pc:top-24 ${mapVar.toggleTab ? "border-l-white-white tablet:left-360 pc:left-400" : "left-0"}`}
        >
          <Image src="/icon/arrow-left.svg" width={20} height={20} alt="화살표" className={`${mapVar.toggleTab || "scale-x-[-1]"}`} />
        </button>
        <PcTab mapVar={mapVar} mapCallback={mapCallback} eventData={eventData} name={name} image={image} sort={sort} setSort={setSort} status={status} setStatus={setStatus} />
        <MobileTab mapVar={mapVar} mapCallback={mapCallback} eventData={eventData} name={name} image={image} sort={sort} setSort={setSort} status={status} setStatus={setStatus} />
      </div>
    </DottedLayout>
  );
};

export default ArtistIdPage;
