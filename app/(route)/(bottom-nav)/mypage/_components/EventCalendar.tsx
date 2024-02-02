"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import HorizontalEventCard from "@/components/card/HorizontalEventCard";
import { MYPAGE_CALENDAR_STYLE } from "@/constants/calendarStyle";
import NextIcon from "@/public/icon/arrow-left_lg.svg";
import PrevIcon from "@/public/icon/arrow-right_lg.svg";
import { ScheduleDataProps } from "../page";

const COLOR_TYPE: Record<number, string> = {
  1: `bg-sub-pink`,
  2: `bg-sub-yellow`,
  3: `bg-sub-skyblue`,
  4: `bg-sub-blue`,
  5: `bg-sub-purple`,
  6: `bg-sub-red`,
};

const EventCalendar = ({ scheduleData }: { scheduleData: ScheduleDataProps[] }) => {
  const [date, setDate] = useState<Date | null>(null);

  const handleClickToday = (selectedDate: any) => {
    if (date?.getTime() === selectedDate.getTime()) {
      setDate(null);
      return;
    }
    setDate(selectedDate);
  };

  const tileContent = ({ date }: { date: Date }) => {
    const eventsForDate = scheduleData.filter((event) => new Date(event.startDate).getTime() <= date.getTime() && new Date(event.endDate).getTime() >= date.getTime());

    if (eventsForDate.length > 0) {
      const sortedEvents = eventsForDate.sort((a, b) => {
        const startDateA = new Date(a.startDate);
        const startDateB = new Date(b.startDate);

        return startDateA.getTime() - startDateB.getTime();
      });

      return (
        <div>
          {sortedEvents.map((event, index) => (
            <span key={index} className={`h-4 w-36 rounded-sm ${COLOR_TYPE[(event.id + 1) % 6]}`} />
          ))}
        </div>
      );
    }

    return null;
  };

  const handleClick = () => {
    console.log("내 행사 데이터 다시 받아오기");
  };

  return (
    <>
      <style>{MYPAGE_CALENDAR_STYLE}</style>
      <div>
        <Calendar
          locale="ko"
          onChange={handleClickToday}
          value={date}
          tileContent={tileContent}
          nextLabel={<PrevIcon width={16} height={16} viewBox="0 0 24 24" stroke="#A2A5AA" />}
          prevLabel={<NextIcon width={16} height={16} viewBox="0 0 24 24" stroke="#A2A5AA" />}
          next2Label={null}
          prev2Label={null}
          formatDay={(locale, date) => date.getDate().toString()}
          formatShortWeekday={(locale, date) => {
            const shortWeekdays = ["S", "M", "T", "W", "T", "F", "S"];
            return shortWeekdays[date.getDay()];
          }}
        />
        <div>
          <ul>
            {/* 날짜를 선택하지 않았을 때 모든 Event를 보여줌 */}
            {scheduleData
              .filter((event) => !date || (new Date(event.startDate).getTime() <= date.getTime() && new Date(event.endDate).getTime() >= date.getTime()))
              .map((event) => (
                <HorizontalEventCard key={event.id} data={event} hasHeart onHeartClick={handleClick} />
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default EventCalendar;
