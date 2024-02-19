import { getCalendarTime } from "@/utils/getCalendarTime";
import { sortEvents } from "@/utils/sortEventList";
import { EventCardType } from "@/types/index";

interface Props {
  data: EventCardType[];
  date: Date;
  isFold: boolean;
  lastDay: (EventCardType | "blank")[];
}

export const tileContent = ({ date, data, isFold, lastDay }: Props) => {
  const eventsForDate = data.filter((event: EventCardType) => {
    const startDate = getCalendarTime(event.startDate);
    const endDate = getCalendarTime(event.endDate);
    const currentDate = getCalendarTime(date);

    return startDate <= currentDate && endDate >= currentDate;
  });

  switch (isFold) {
    case true:
      if (eventsForDate.length === 0) return;

      let type;
      if (eventsForDate.length === 1) {
        type = COUNT_CHIP_TYPE.light;
      } else if (eventsForDate.length >= 5) {
        type = COUNT_CHIP_TYPE.bold;
      } else {
        type = COUNT_CHIP_TYPE.regular;
      }
      return (
        <span className="pc:flex pc:w-full pc:items-center pc:justify-end pc:self-stretch pc:px-8">
          <div className={`flex-center h-20 w-20 rounded-full text-12 font-600 pc:h-28 pc:w-28 pc:text-16 ${type}`}>{eventsForDate.length}</div>
        </span>
      );

    case false:
      if (eventsForDate.length == 0) {
        lastDay = [];
      }
      if (eventsForDate.length > 0) {
        let today: (EventCardType | "blank")[] = sortEvents(eventsForDate);

        for (let idx in today) {
          const lastDayItem = lastDay[idx];
          const todayItem = today[idx];
          if (lastDayItem === todayItem) {
            continue;
          }
          if (!lastDayItem) {
            lastDay[idx] = todayItem;
            continue;
          }
          let rpt = 0;
          while (lastDay[Number(idx) + rpt] !== today[Number(idx) + rpt]) {
            if (Number(idx) + rpt > lastDay.length) break;
            today.splice(Number(idx) + rpt, 0, "blank");
            rpt++;
          }
        }

        if (date.getDay() === 1) {
          today = today.filter((item) => item !== "blank");
        }
        lastDay = today;

        return (
          <span className="flex flex-col items-center justify-center gap-4 self-stretch pc:pt-4">
            {today.map((event, idx) => {
              if (event === "blank") {
                return <span key={idx + event} className={`h-4 rounded-sm`} />;
              }
              let type;
              const startDate = getCalendarTime(event.startDate);
              const endDate = getCalendarTime(event.endDate);
              const currentDate = getCalendarTime(date);
              const idNumber = Number((event.id.match(/\d+/g) || ["1"]).join(""));

              if (event.startDate === event.endDate) {
                type = SHAPE_TYPE.oneDay;
              } else if (startDate === currentDate) {
                type = SHAPE_TYPE.firstDay;
              } else if (endDate === currentDate) {
                type = SHAPE_TYPE.lastDay;
              } else {
                type = SHAPE_TYPE.middleDay;
              }
              return <div key={event.id} className={`h-4 rounded-sm ${type} ${COLOR_TYPE[idNumber % 6]}`} />;
            })}
          </span>
        );
      }
  }

  return null;
};

const COLOR_TYPE: Record<number, string> = {
  0: `bg-sub-pink`,
  1: `bg-sub-yellow`,
  2: `bg-sub-skyblue`,
  3: `bg-sub-blue`,
  4: `bg-sub-purple`,
  5: `bg-sub-red`,
};

const SHAPE_TYPE = {
  oneDay: "w-36 pc:w-100",
  firstDay: "ml-8 w-44 pc:w-108",
  lastDay: "mr-8 w-44 pc:w-108",
  middleDay: "w-52 pc:w-120",
};

const COUNT_CHIP_TYPE = {
  light: "text-main-pink-300 bg-main-pink-50",
  regular: "text-main-pink-500 bg-main-pink-50",
  bold: "text-white-white bg-main-pink-500",
};
