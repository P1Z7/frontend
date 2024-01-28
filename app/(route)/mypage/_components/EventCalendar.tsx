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
  startDate: Date;
  endDate: Date;
}

const mockData: ScheduleData[] = [
  // new Date("2024-01-28") -> 이런식으로 작성하면 startDate가 포함이 안되는 문제 발생... 왜그런지 아직 해결방법 찾지 못함 ㅠㅠ
  // new Date(2024, 0, 28) -> 이런식으로 작성하면 해결 가능..
  {
    placeName: "윤정한 카페",
    artistName: "윤정한",
    eventType: "생일카페",
    address: "마포구",
    startDate: new Date(2024, 0, 25),
    endDate: new Date(2024, 1, 1),
  },

  {
    placeName: "김정우 카페",
    artistName: "김정우",
    eventType: "생일카페",
    address: "마포구",
    startDate: new Date(2024, 0, 26),
    endDate: new Date(2024, 0, 29),
  },
  {
    placeName: "김민지 카페",
    artistName: "김민지",
    eventType: "생일카페",
    address: "마포구",
    startDate: new Date(2024, 0, 29),
    endDate: new Date(2024, 0, 31),
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
