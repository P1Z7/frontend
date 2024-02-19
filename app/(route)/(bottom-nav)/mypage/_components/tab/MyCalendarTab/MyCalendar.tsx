import Calendar from "react-calendar";
import { EventCardType } from "@/types/index";
import NextIcon from "@/public/icon/arrow-left_lg.svg";
import PrevIcon from "@/public/icon/arrow-right_lg.svg";
import { tileContent } from "./tileContent";

interface Props {
  setSelectedDate: (date: Date | null) => void;
  selectedDate: Date | null;
  data: EventCardType[];
  isFold: boolean;
  lastDay: (EventCardType | "blank")[];
}

const MyCalendar = ({ setSelectedDate, selectedDate, data, isFold, lastDay }: Props) => {
  const handleClickToday = (date: any) => {
    if (selectedDate?.getTime() === date.getTime()) {
      setSelectedDate(null);
      return;
    }
    setSelectedDate(date);
  };

  return (
    <Calendar
      locale="ko"
      onChange={handleClickToday}
      value={selectedDate}
      tileContent={({ date }) => tileContent({ date, data, isFold, lastDay })}
      nextLabel={<PrevIcon onClick={() => (lastDay = [])} width={32} height={16} viewBox="0 0 24 24" stroke="#A2A5AA" aria-label="이전 달로 이동" />}
      prevLabel={<NextIcon onClick={() => (lastDay = [])} width={32} height={16} viewBox="0 0 24 24" stroke="#A2A5AA" aria-label="다음 달로 이동" />}
      next2Label={null}
      prev2Label={null}
      formatDay={(locale, date) => date.getDate().toString()}
      formatShortWeekday={(locale, date) => {
        const shortWeekdays = ["S", "M", "T", "W", "T", "F", "S"];
        return shortWeekdays[date.getDay()];
      }}
    />
  );
};

export default MyCalendar;
