"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import HorizontalEventCard from "@/components/card/HorizontalEventCard";
import { ScheduleDataProps } from "../page";

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

    // 추후 장소 이름 말고 디자인으로 수정 예정
    if (eventsForDate.length > 0) {
      return (
        <div>
          {eventsForDate.map((event, index) => (
            <div key={index}>{event.placeName}</div>
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
    <div>
      <Calendar locale="en" onChange={handleClickToday} value={date} tileContent={tileContent} />
      <div>
        <ul>
          {/* 날짜를 선택하지 않았을 때 모든 Event를 보여줌 */}
          {scheduleData
            .filter((event) => !date || (new Date(event.startDate).getTime() <= date.getTime() && new Date(event.endDate).getTime() >= date.getTime()))
            .map((event, index) => (
              <HorizontalEventCard key={index} data={event} hasHeart onHeartClick={handleClick} />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default EventCalendar;
