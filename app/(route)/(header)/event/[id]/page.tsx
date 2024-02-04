import Tabs from "@/components/Tabs";
import { MOCK_EVENTS } from "@/constants/mock";
import Banner from "./_components/Banner";
import DescriptionTab from "./_components/tab/DescriptionTab";
import LocationTab from "./_components/tab/LocationTab";
import ReviewTab from "./_components/tab/ReviewTab";

const EventInfoPage = () => {
  const eventData = MOCK_EVENTS[0];
  return (
    <>
      <Banner data={eventData} />
      <Tabs names={["행사정보", "위치", "후기"]}>
        <DescriptionTab images={eventData.eventImages} description={eventData.description} />
        <LocationTab name={eventData.placeName} address={eventData.address} />
        <ReviewTab />
      </Tabs>
    </>
  );
};

export default EventInfoPage;
