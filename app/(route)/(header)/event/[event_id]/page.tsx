import Tabs from "@/components/Tabs";
import { Res_Get_Type } from "@/types/getResType";
import { EventCardType } from "@/types/index";
import Banner from "./_components/Banner";
import DescriptionTab from "./_components/tab/DescriptionTab";
import LocationTab from "./_components/tab/LocationTab";
import ReviewTab from "./_components/tab/ReviewTab";

interface Props {
  params: { event_id: string };
}

const getEventInfo = async (eventId: string) => {
  const data = await fetch(`http://${process.env.NEXT_PUBLIC_BASE_URL}/event/${eventId}`);
  const res: Res_Get_Type["event"] = await data.json();
  return res;
};

const EventInfoPage = async ({ params }: Props) => {
  const eventInfo = await getEventInfo(params.event_id);

  return (
    <>
      <Banner data={eventInfo} eventId={params.event_id} />
      <Tabs names={["행사정보", "위치", "후기"]} topOffset="event">
        <DescriptionTab images={eventInfo.eventImages} description={eventInfo.description} />
        <LocationTab name={eventInfo.placeName} address={eventInfo.address} addressDetail={eventInfo.addressDetail} />
        <ReviewTab />
      </Tabs>
    </>
  );
};

export default EventInfoPage;
