import EventTabs from "../EventTabs";
import MyCalendarTab from "./MyCalendarTab";
import MyLocationTab from "./MyLocationTab";

interface Props {
  userId: string;
}

const MyEventTab = ({ userId }: Props) => {
  return (
    <div className="h-full w-full">
      <EventTabs names={["달력 보기", "지도 보기"]}>
        <MyCalendarTab userId={userId} />
        <MyLocationTab userId={userId} />
      </EventTabs>
    </div>
  );
};

export default MyEventTab;
