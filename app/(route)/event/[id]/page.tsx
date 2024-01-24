import Tabs from "@/components/Tabs";
import Banner from "./_components/Banner";
import DescriptionTab from "./_components/tabs/DescriptionTab";
import LocationTab from "./_components/tabs/LocationTab";
import ReviewTab from "./_components/tabs/ReviewTab";

const EventInfoPage = () => {
  return (
    <>
      <header>파이키</header>
      <Banner />
      <Tabs names={["행사정보", "위치", "후기"]}>
        <DescriptionTab />
        <LocationTab name="을지로 위워크" address="서울 중구 삼일대로 343" />
        <ReviewTab />
      </Tabs>
    </>
  );
};

export default EventInfoPage;
