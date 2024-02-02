import { useEffect, useMemo, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import HorizontalEventCard from "@/components/card/HorizontalEventCard";
import { MYPAGE_CALENDAR_STYLE } from "@/constants/calendarStyle";
import NextIcon from "@/public/icon/arrow-left_lg.svg";
import PrevIcon from "@/public/icon/arrow-right_lg.svg";
import { ScheduleDataProps } from "../page";

const EventCalendar = ({ scheduleData }: { scheduleData: ScheduleDataProps[] }) => {
  const [date, setDate] = useState<Date | null>(null);
  const [calendarStyle, setCalendarStyle] = useState("");

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
        const startDateA = new Date(a.startDate).getTime();
        const startDateB = new Date(b.startDate).getTime();

        if (startDateA === startDateB) {
          const endDateA = new Date(a.endDate).getTime();
          const endDateB = new Date(b.endDate).getTime();

          return endDateB - endDateA;
        }

        return startDateA - startDateB;
      });

      return (
        <div>
          {sortedEvents.map((event) => {
            let type;
            if (event.startDate === event.endDate) {
              type = SHAPE_TYPE.oneDay;
            } else if (new Date(event.startDate).getTime() === date.getTime()) {
              type = SHAPE_TYPE.firstDay;
            } else if (new Date(event.endDate).getTime() === date.getTime()) {
              type = SHAPE_TYPE.lastDay;
            } else {
              type = SHAPE_TYPE.middleDay;
            }

            return <span key={event.id} className={`h-4 rounded-sm ${type} ${COLOR_TYPE[(event.id + 1) % 6]}`} />;
          })}
        </div>
      );
    }

    return null;
  };

  const handleClick = () => {
    console.log("내 행사 데이터 다시 받아오기");
  };

  useEffect(() => {
    setCalendarStyle(MYPAGE_CALENDAR_STYLE);
  }, []);

  return (
    <>
      <div>
        <style>{calendarStyle}</style>
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

const COLOR_TYPE: Record<number, string> = {
  1: `bg-sub-pink`,
  2: `bg-sub-yellow`,
  3: `bg-sub-skyblue`,
  4: `bg-sub-blue`,
  5: `bg-sub-purple`,
  6: `bg-sub-red`,
};

const SHAPE_TYPE = {
  oneDay: "w-36",
  firstDay: "ml-8 w-44",
  lastDay: "mr-8 w-44",
  middleDay: "w-52",
};
