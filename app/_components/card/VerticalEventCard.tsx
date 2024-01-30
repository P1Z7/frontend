import { EventCardType } from "@/types/index";
import Chip from "./Chip";

interface Props {
  data: EventCardType;
}

const VerticalEventCard = ({ data }: Props) => {
  const startDate = data.startDate.split("-");
  const endDate = data.endDate.split("-");

  const formattedStartDate = `${startDate[1]}.${startDate[2]}`;
  const formattedEndDate = `${endDate[1]}.${endDate[2]}`;

  return (
    <div className="flex w-180 flex-col gap-8 border border-solid border-black p-[10px]">
      <div className="h-160 bg-[#e7e7e7]" />
      <div className="flex flex-col gap-4">
        <p>{data.placeName}</p>
        <div className="flex">
          <p className="border-r border-solid border-black pr-4">
            {formattedStartDate} ~ {formattedEndDate}
          </p>
          <p className="pl-4">{data.address}</p>
        </div>
        <div className="flex gap-4">
          <p>{data.artistName}</p>
          <Chip chipName={data.eventType} />
        </div>
      </div>
    </div>
  );
};

export default VerticalEventCard;
