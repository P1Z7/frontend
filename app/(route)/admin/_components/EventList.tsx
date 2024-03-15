import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import HorizontalEventCard from "@/components/card/HorizontalEventCard";
import { instance } from "@/api/api";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { getSession } from "@/store/session/cookies";

const SIZE = 12;

const EventList = () => {
  const [eventList, setEventList] = useState<any[]>([]);
  const { data, fetchNextPage, isSuccess, isLoading } = useInfiniteQuery({
    queryKey: ["admin_event"],
    queryFn: async ({ pageParam }) => {
      const res = await instance.get("/event", { sort: "최신순", status: "종료", size: SIZE, page: pageParam });
      pageParam === 1 ? setEventList(res.eventList) : setEventList((prev) => [...prev, ...res.eventList]);
      return res;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.page * SIZE < lastPage.totalCount ? lastPage.page + 1 : null),
  });
  const containerRef = useInfiniteScroll({ handleScroll: fetchNextPage, deps: [data] });

  const [delList, setDelList] = useState<string[]>([]);
  const session = getSession();

  const handlePushDel = (id: string) => {
    setDelList([...delList, id]);
  };

  const handlePopDel = (id: string) => {
    setDelList(delList.filter((item) => item !== id));
  };

  const submitDelList = async () => {
    for (const id of delList) {
      await instance.delete(`/event/${id}`, { userId: session?.user.userId, eventId: id });
    }
    setDelList([]);
  };

  return (
    <div className="h-full w-full overflow-y-scroll">
      <button onClick={submitDelList} className="absolute right-20 top-12 rounded-sm bg-red px-12 py-8">
        삭제하기
      </button>
      {isSuccess &&
        eventList.map((data) => (
          <div key={data.id} className="flex justify-between gap-12 text-gray-900">
            <HorizontalEventCard data={data} />
            {delList.includes(data.id) ? (
              <button onClick={() => handlePopDel(data.id)} className="w-48 text-red">
                선택됨
              </button>
            ) : (
              <button onClick={() => handlePushDel(data.id)} className="w-48 text-white-white">
                선택
              </button>
            )}
          </div>
        ))}
      {isLoading && <p>로딩중</p>}
      <div ref={containerRef} className="h-8" />
    </div>
  );
};

export default EventList;
