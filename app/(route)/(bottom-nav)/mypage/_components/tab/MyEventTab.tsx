import { ScheduleDataProps } from "../../page";
import EventTabs from "../EventTabs";
import MyCalendarTab from "./MyCalendarTab";
import MyLocationTab from "./MyLocationTab";

const MyEventTab = ({ scheduleData }: { scheduleData: ScheduleDataProps[] }) => {
  return (
    <div className="gap-20">
      <EventTabs names={["달력 보기", "지도 보기"]}>
        <MyCalendarTab scheduleData={scheduleData} />
        <MyLocationTab scheduleData={scheduleData} />
      </EventTabs>
    </div>
  );
};

export default MyEventTab;
