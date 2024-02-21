"use client";

import FadingDot from "@/(route)/(bottom-nav)/signin/_components/FadingDot";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import HorizontalEventCard from "@/components/card/HorizontalEventCard";
import { instance } from "@/api/api";
import { getCalendarTime } from "@/utils/getCalendarTime";
import { EventCardType } from "@/types/index";
import { MYPAGE_CALENDAR_STYLE } from "@/constants/calendarStyle";
import ChipButtons from "./ChipButtons";
import FoldButton from "./FoldButton";
import MyCalendar from "./MyCalendar";
import NoContentsInCalendar from "./NoContentsInCalendar";

interface Props {
  userId: string;
}

type StatusType = "" | "예정" | "종료" | "진행중" | "종료제외";

const MyCalendarTab = ({ userId }: Props) => {
  const [data, setData] = useState<EventCardType[] | []>([]);
  const [isFold, setIsFold] = useState(true);
  const [status, setStatus] = useState<StatusType>("");
  const [calendarStyle, setCalendarStyle] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const { data: myEventsData, isSuccess } = useQuery({
    queryKey: ["events", status],
    queryFn: async () => {
      return instance.get(`/event/${userId}/like`, { status });
    },
  });

  const handleHeartClick = async (eventId: string) => {
    const res = await instance.post("/event/like", {
      userId: userId,
      eventId: eventId,
    });

    if (res.error) {
      throw new Error(res.error);
    }

    setData(
      data.filter((event) => {
        return event.id !== eventId;
      }),
    );
  };

  useEffect(() => {
    if (isSuccess) {
      setData(myEventsData);
    }
  }, [myEventsData]);

  useEffect(() => {
    setCalendarStyle(MYPAGE_CALENDAR_STYLE);
  }, []);

  return (
    <div className="flex flex-col items-center justify-stretch gap-16 px-20 pb-88 pt-72 tablet:pb-16">
      <div className="flex-center flex-col gap-8 rounded-sm border border-gray-50 pb-8 pt-16">
        <style>{calendarStyle}</style>
        {calendarStyle === "" ? (
          <div className="flex-center h-308 w-308 pc:h-400 pc:w-[75.8rem]">
            <FadingDot />
          </div>
        ) : (
          <>
            <MyCalendar setSelectedDate={setSelectedDate} selectedDate={selectedDate} data={data} isFold={isFold} />
            <FoldButton setIsFold={setIsFold} isFold={isFold} />
          </>
        )}
      </div>
      <div className="w-full">
        <ChipButtons setStatus={setStatus} status={status} />
        <section>
          {data
            .filter(
              (event: EventCardType) =>
                !selectedDate || (getCalendarTime(event.startDate) <= getCalendarTime(selectedDate) && getCalendarTime(event.endDate) >= getCalendarTime(selectedDate)),
            )
            .map((event: EventCardType) => (
              <HorizontalEventCard key={event.id} data={event} onHeartClick={() => handleHeartClick(event.id)} isGrow />
            ))}
        </section>
        {!data.length && <NoContentsInCalendar />}
      </div>
    </div>
  );
};

export default MyCalendarTab;
