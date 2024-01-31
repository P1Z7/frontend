import { EventCardType } from "@/types/index";
import Chip from "./Chip";

interface Props {
  data: EventCardType;
}

const HorizontalEventCard = ({ data }: Props) => {
  const startDate = data.startDate.split("-");
  const endDate = data.endDate.split("-");

  const formattedStartDate = `${startDate[1]}.${startDate[2]}`;
  const formattedEndDate = `${endDate[1]}.${endDate[2]}`;

  return (
    <div className="flex w-320 items-center gap-12 self-stretch border-b border-solid border-[#E0E2E6] py-12">
      <div className="h-112 w-84 bg-[#e7e7e7]" />
      <div className="flex flex-col gap-4">
        <p>{data.placeName}</p>
        <div className="flex items-center gap-8">
          <p>{data.artistName}</p>
          <Chip chipName={data.eventType} />
        </div>
        <div className="flex">
          <p className="border-r border-solid border-black pr-4">
            {formattedStartDate} ~ {formattedEndDate}
          </p>
          <p className="pl-4">{data.address}</p>
        </div>
        <div className="flex gap-4">
          {data.gifts?.map((gift, index) => (
            <div key={index}>
              <Chip chipName={gift} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HorizontalEventCard;
