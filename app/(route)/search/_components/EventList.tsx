import { InfiniteData } from "@tanstack/react-query";
import Link from "next/link";
import { MutableRefObject } from "react";
import HorizontalEventCard from "@/components/card/HorizontalEventCard";
import { Res_Get_Type } from "@/types/getResType";

interface Props {
  events: InfiniteData<Res_Get_Type["eventSearch"], unknown> | undefined;
  containerRef: MutableRefObject<null>;
}

const EventList = ({ events, containerRef }: Props) => {
  const isEventEmpty = events?.pages[0].eventList.length === 0;

  return (
    <section className="flex flex-wrap items-center gap-x-24 px-20 pc:px-0">
      {isEventEmpty ? (
        <Link href={"/post"} className="flex-center mx-auto mt-60 px-12 py-4 text-14 font-500 text-gray-700 underline underline-offset-2">
          내 최애의 행사를 직접 등록해 보세요!
        </Link>
      ) : (
        <>
          {events?.pages[0].totalCount && (
            <div className="w-full pt-12 text-12 font-500 text-gray-800 pc:pt-24 pc:text-14">{events?.pages[0].totalCount}개의 검색결과가 있습니다.</div>
          )}
          {events?.pages.map((page) => page.eventList.map((event) => <HorizontalEventCard key={event.id} data={event} />))}
        </>
      )}
      <div ref={containerRef} className="h-20 w-full" />
    </section>
  );
};

export default EventList;
