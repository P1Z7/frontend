"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import EventCard from "@/components/card/EventCard";

interface ScheduleData {
  placeName: string;
  artistName: string;
  eventType: string;
  address: string;
  startDate: string;
  endDate: string;
}

const mockData: ScheduleData[] = [
  {
    placeName: "윤정한 카페",
    artistName: "윤정한",
    eventType: "생일카페",
    address: "마포구",
    startDate: "2024-01-25T00:00:00",
    endDate: "2024-02-01T00:00:00",
  },

  {
    placeName: "김정우 카페",
    artistName: "김정우",
    eventType: "생일카페",
    address: "마포구",
    startDate: "2024-01-28T00:00:00",
    endDate: "2024-01-31T00:00:00",
  },
  {
    placeName: "김민지 카페",
    artistName: "김민지",
    eventType: "생일카페",
    address: "마포구",
    startDate: "2024-01-26T00:00:00",
    endDate: "2024-01-28T00:00:00",
  },
];

const EventCalendar = () => {
  const [date, setDate] = useState<Date | null>(null);

  // 계속 selectedDate의 type은 Date가 될 수 없고 Value여야한다는 오류 발생... 하지만 Value라는 type은 존재하지 않는데.. ㄷㄷ
  const handleClickToday = (selectedDate: any) => {
    setDate(selectedDate);
  };

  const tileContent = ({ date }: { date: Date }) => {
    const eventsForDate = mockData.filter((event) => new Date(event.startDate).getTime() <= date.getTime() && new Date(event.endDate).getTime() >= date.getTime());

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

  return (
    <div>
      <Calendar onChange={handleClickToday} value={date} tileContent={tileContent} />
      <div>
        <ul>
          {/* 날짜를 선택하지 않았을 때 모든 Event를 보여줌 */}
          {mockData
            .filter((event) => !date || (new Date(event.startDate).getTime() <= date.getTime() && new Date(event.endDate).getTime() >= date.getTime()))
            .map((event, index) => (
              <EventCard
                key={index}
                placeName={event.placeName}
                artistName={event.artistName}
                eventType={event.eventType}
                address={event.address}
                startDate={event.startDate}
                endDate={event.endDate}
              />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default EventCalendar;
