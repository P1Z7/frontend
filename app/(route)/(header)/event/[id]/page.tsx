import Tabs from "@/components/Tabs";
import Banner from "./_components/Banner";
import DescriptionTab from "./_components/tab/DescriptionTab";
import LocationTab from "./_components/tab/LocationTab";
import ReviewTab from "./_components/tab/ReviewTab";

const EVENT_MOCK = {
  placeName: "스타벅스",
  eventType: "카페",
  artistName: "민지",
  startDate: "2024-01-29",
  endDate: "2024-01-30",
  address: "서울특별시 마포구 와우산로 00-00 1층",
  link: "https://winter2024.com",
  gifts: ["포토카드", "엽서", "컵홀더"],
  eventImage: "https://thumb.mtstarnews.com/06/2023/09/2023090715013844673_1.jpg/dims/optimize",
};

const EventInfoPage = () => {
  return (
    <>
      <Banner data={EVENT_MOCK} />
      <Tabs names={["행사정보", "위치", "후기"]}>
        <DescriptionTab />
        <LocationTab name="을지로 위워크" address="서울 중구 삼일대로 343" />
        <ReviewTab />
      </Tabs>
    </>
  );
};

export default EventInfoPage;
