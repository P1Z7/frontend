"use client";

import EventCard from "@/(route)/artist/[artistId]/_components/EventCard";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import KakaoMap from "@/components/KakaoMap";
import TimeFilter from "@/components/TimeFilter";
import { instance } from "@/api/api";
import { EventCardType } from "@/types/index";
import { STATUS } from "@/constants/eventStatus";

interface Props {
  userId: string;
}

const MyLocationTab = ({ userId }: Props) => {
  const [status, setStatus] = useState(3);

  const { data: myEventsData } = useQuery<EventCardType[]>({
    queryKey: ["events", STATUS[status]],
    queryFn: async () => {
      return instance.get(`/event/${userId}/like`, { status: STATUS[status] });
    },
  });

  const [toggleTab, setToggleTab] = useState(true);

  const handleButtonClick = () => {
    setToggleTab((prev) => !prev);
  };

  const [selectedCard, setSelectedCard] = useState<EventCardType | null>(null);
  const scrollRef = useRef<HTMLDivElement>();

  const scrollRefCallback = (el: HTMLDivElement) => {
    scrollRef.current = el;
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [selectedCard?.id]);

  const handleCardClick = (select: EventCardType) => {
    setSelectedCard(select.id === selectedCard?.id ? null : select);
  };

  const isEmpty = myEventsData?.length === 0;

  return (
    <div className="relative h-full w-full pc:h-fit pc:py-56">
      <div className="h-full">
        <div className="relative h-[calc(100vh-7.2rem)] w-full overflow-hidden pc:h-[84rem]">
          <div className={`absolute left-0 top-0 z-zero h-full w-full ${toggleTab ? "pc:pl-400" : ""} pb-344 pc:h-[84rem] pc:rounded-lg pc:border pc:border-gray-100 pc:pb-0`}>
            <KakaoMap scheduleData={myEventsData ?? []} selectedCard={selectedCard} setSelectedCard={setSelectedCard} />
          </div>
          <button
            onClick={handleButtonClick}
            className={`pc:flex-center absolute z-nav hidden h-60 w-24 rounded-r-sm border border-gray-100 bg-white-white tablet:top-24 pc:top-44 ${toggleTab ? "border-l-white-white tablet:left-360 pc:left-400" : "left-0"}`}
          >
            <Image src="/icon/arrow-left.svg" width={20} height={20} alt="화살표" className={`${toggleTab || "scale-x-[-1]"}`} />
          </button>
          {toggleTab && (
            <div className="absolute bottom-0 flex max-h-344 min-h-84 w-full flex-col gap-16 rounded-t-lg bg-white-black pt-28 shadow-2xl tablet:w-full pc:top-0 pc:h-[84rem] pc:max-h-full pc:w-400 pc:rounded-none pc:rounded-l-lg pc:border pc:border-gray-100 pc:border-t-gray-100 pc:border-t-transparent pc:py-20 pc:shadow-none">
              <div className="absolute left-[calc((100%-64px)/2)] top-12 h-4 w-64 rounded-sm bg-gray-700 pc:hidden" />
              <TimeFilter setStatus={setStatus} status={status} />
              <div className="overflow-scroll scrollbar-none pc:h-[72rem]">
                {isEmpty ? (
                  <p className="flex-center h-[50rem] w-full pt-20 text-14 font-500">행사가 없습니다.</p>
                ) : (
                  <div className="px-20">
                    {myEventsData?.map((event) => (
                      <EventCard
                        key={event.id}
                        data={event}
                        isSelected={selectedCard?.id === event.id}
                        onCardClick={() => handleCardClick(event)}
                        scrollRef={selectedCard?.id === event.id ? scrollRefCallback : null}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyLocationTab;
