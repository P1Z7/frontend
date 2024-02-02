import Image from "next/image";
import { EventCardType } from "@/types/index";
import HeartButton from "../button/HeartButton";

interface Props {
  data: EventCardType;
}

const HorizontalEventCard = ({ data }: Props) => {
  const startDate = data.startDate.split("-");
  const endDate = data.endDate.split("-");

  const formattedDate = `${startDate[1]}.${startDate[2]} ~ ${endDate[1]}.${endDate[2]}`;

  return (
    <div className="flex w-320 gap-12 border-b border-gray-50 bg-transparent py-12">
      <div className="relative h-112 w-84 ">
        <Image src={data.eventImage} className="rounded-[0.4rem] object-cover" fill alt="행사 포스터" />
      </div>
      <div className="relative flex w-full flex-col justify-center gap-4">
        <div className="absolute right-0 top-0">
          <HeartButton isSmall />
        </div>
        <h3 className="text-16 font-600">{data.placeName}</h3>
        <div className="flex gap-8 text-16 font-600">
          <span>{data.artistName}</span>
          <div>카페</div>
        </div>
        <p className="text-12 font-600 text-gray-400">
          <span className="mr-8 border-r border-gray-400 pr-8">{formattedDate}</span>
          <span>{data.address}</span>
        </p>
        <ul>
          <div>포토카드</div>
        </ul>
      </div>
    </div>
  );
};

export default HorizontalEventCard;
