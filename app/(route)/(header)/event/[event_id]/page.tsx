import Tabs from "@/components/Tabs";
import { Res_Get_Type } from "@/types/resGetType";
import { MOCK_EVENTS } from "@/constants/mock";
import Banner from "./_components/Banner";
import DescriptionTab from "./_components/tab/DescriptionTab";
import LocationTab from "./_components/tab/LocationTab";
import ReviewTab from "./_components/tab/ReviewTab";

interface Props {
  params: { event_id: string };
}

const getEventInfo = async (eventId: string) => {
  const data = await fetch(`http://ec2-3-37-149-204.ap-northeast-2.compute.amazonaws.com:3000/event/${eventId}`);
  const res: Res_Get_Type["event"] = await data.json();
  return res;
};

const EventInfoPage = async ({ params }: Props) => {
  const eventData = MOCK_EVENTS[0];

  const eventInfo = await getEventInfo(params.event_id);
  const bannerImage = eventInfo.eventImages.find((images) => images.isMain);

  return (
    <>
      <Banner data={eventData} />
      <Tabs names={["행사정보", "위치", "후기"]}>
        <DescriptionTab images={eventInfo.eventImages} description={eventInfo.description} />
        <LocationTab name={eventData.placeName} address={eventData.address} />
        <ReviewTab />
      </Tabs>
    </>
  );
};

export default EventInfoPage;
