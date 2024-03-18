import SortButton from "@/(route)/search/_components/SortButton";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import TimeFilter from "@/components/TimeFilter";
import { MapCallbackType, MapVarType } from "@/hooks/useCustomMap";
import { EventCardType } from "@/types/index";
import SortIcon from "@/public/icon/sort.svg";
import EventCard from "./EventCard";

interface Props {
  mapVar: MapVarType;
  mapCallback: MapCallbackType;
  image: string;
  name: string;
  status: number;
  setStatus: Dispatch<SetStateAction<number>>;
  sort: "최신순" | "인기순";
  setSort: Dispatch<SetStateAction<"최신순" | "인기순">>;
  eventData: EventCardType[];
}

const PcTab = ({ mapVar, mapCallback, image, name, status, setStatus, sort, setSort, eventData }: Props) => {
  const isEmpty = eventData.length === 0;

  return (
    <>
      {mapVar.toggleTab && (
        <div className="tablet:rounded-none absolute bottom-0 top-0 hidden max-h-full min-h-84 w-360 flex-col gap-16 rounded-t-lg border border-gray-100 border-t-transparent bg-white-black pt-20 shadow-none tablet:flex pc:top-0 pc:h-[84rem] pc:w-400 pc:rounded-l-lg pc:border-t-gray-100 pc:py-20">
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
          <div className="min-h-200 overflow-scroll scrollbar-none pc:h-[65rem]">
            {isEmpty ? (
              <p className="flex-center w-full pt-20 text-14 font-500">행사가 없습니다.</p>
            ) : (
              <div className="px-20">
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
    </>
  );
};

export default PcTab;