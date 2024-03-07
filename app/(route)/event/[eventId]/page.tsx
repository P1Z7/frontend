import { cookies } from "next/headers";
import MetaTag from "@/components/MetaTag";
import Tabs from "@/components/Tabs";
import DottedLayout from "@/components/layout/DottedLayout";
import { Res_Get_Type } from "@/types/getResType";
import Banner from "./_components/Banner";
import DescriptionTab from "./_components/tab/DescriptionTab";
import LocationTab from "./_components/tab/LocationTab";
import ReviewTab from "./_components/tab/ReviewTab";

interface Props {
  params: { eventId: string };
}

const getEventInfo = async (eventId: string) => {
  const cookieStore = cookies();
  const session = JSON.parse(cookieStore.get("session")?.value ?? "{}");
  const data = await fetch(`https://${process.env.NEXT_PUBLIC_BASE_URL}/event/${eventId}?userId=${session?.user?.userId ?? ""}`, { cache: "no-store" });
  const res: Res_Get_Type["event"] = await data.json();
  return res;
};

const EventInfoPage = async ({ params }: Props) => {
  const eventInfo = await getEventInfo(params.eventId);

  return (
    <>
      <MetaTag
        title={eventInfo.placeName}
        description={`${eventInfo.placeName}에서 열리는 행사 정보를 확인해 보세요.`}
        imgUrl={eventInfo?.eventImages?.[0]?.imageUrl ?? "/image/no-profile.png"}
      />
      <DottedLayout size="narrow">
        <Banner data={eventInfo} eventId={params.eventId} />
        <Tabs names={["행사정보", "위치", "후기"]} topOffset="event" eventId={params.eventId}>
          <DescriptionTab images={eventInfo.eventImages} description={eventInfo.description} />
          <LocationTab name={eventInfo.placeName} address={eventInfo.address} />
          <ReviewTab eventId={params.eventId} />
        </Tabs>
      </DottedLayout>
    </>
  );
};

export default EventInfoPage;
