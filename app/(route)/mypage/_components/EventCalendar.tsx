"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface ScheduleData {
  startDate: Date;
  endDate: Date;
  eventName: string;
}

const mockData: ScheduleData[] = [
  // new Date("2024-01-28") -> 이런식으로 작성하면 startDate가 포함이 안되는 문제 발생... 왜그런지 아직 해결방법 찾지 못함 ㅠㅠ
  {
    startDate: new Date(2024, 0, 25),
    endDate: new Date(2024, 1, 2),
    eventName: "정한 생일카페",
  },
  {
    startDate: new Date(2024, 0, 27),
    endDate: new Date(2024, 0, 29),
    eventName: "정우 생일카페",
  },
  {
    startDate: new Date(2024, 0, 25),
    endDate: new Date(2024, 0, 27),
    eventName: "민지 생일카페",
  },
];

const EventCalendar = () => {
  const [date, setDate] = useState<Date | null>(null);

  // 계속 selectedDate의 type은 Date가 될 수 없고 Value여야한다는 오류 발생... 하지만 Value라는 type은 존재하지 않는데.. ㄷㄷ
  const handleClickToday = (selectedDate: any) => {
    setDate(selectedDate);
  };

  const tileContent = ({ date }: { date: Date }) => {
    // 날짜를 선택하지 않았을 때 모든 Event를 보여줌
    if (date === null) {
      return (
        <div>
          {mockData.map((event, index) => (
            <div key={index}>{event.eventName}</div>
          ))}
        </div>
      );
    }

    const eventsForDate = mockData.filter((event) => event.startDate.getTime() <= date.getTime() && event.endDate.getTime() >= date.getTime());

    if (eventsForDate.length > 0) {
      return (
        <div>
          {eventsForDate.map((event, index) => (
            <div key={index}>{event.eventName}</div>
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
          {mockData
            .filter((event) => !date || (event.startDate.getTime() <= date.getTime() && event.endDate.getTime() >= date.getTime()))
            .map((event, index) => (
              <li key={index}>{event.eventName}</li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default EventCalendar;
