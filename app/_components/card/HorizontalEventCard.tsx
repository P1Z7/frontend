import { ScheduleDataProps } from "@/(route)/(bottom-nav)/mypage/page";
import Image from "next/image";
import HeartButton from "@/components/button/HeartButton";
import Chip from "@/components/chip/Chip";
import { EventCardType } from "@/types/index";
import NoImage from "@/public/image/no-profile.png";

interface Props {
  data: EventCardType | ScheduleDataProps;
  hasHeart?: boolean;
  onHeartClick?: () => void;
}

const HorizontalEventCard = ({ data, hasHeart = false, onHeartClick }: Props) => {
  const startDate = data.startDate.split("-");
  const endDate = data.endDate.split("-");

  const formattedDate = `${startDate[1]}.${startDate[2].split("T")[0]} ~ ${endDate[1]}.${endDate[2].split("T")[0]}`;

  return (
    <div className="flex w-320 items-center gap-12 border-b border-gray-50 bg-transparent py-12">
      <div className="relative h-112 w-84 shrink-0">
        <Image src={data.eventImage !== "" ? data.eventImage : NoImage} className="rounded-[0.4rem] object-cover" fill alt="행사 포스터" />
      </div>
      <div className="relative flex w-full flex-col justify-center gap-4">
        <div className="absolute right-0 top-0">
          <HeartButton isSmall isSelected={hasHeart} onClick={onHeartClick} />
        </div>
        <h3 className="text-16 font-600">{data.placeName}</h3>
        <div className="flex w-full gap-8">
          <span className="text-16 font-600">{data.artistName}</span>
          <Chip kind="event" label={data.eventType} />
        </div>
        <p className="h-16 text-12 font-600 text-gray-400">
          <span className="mr-8 border-r border-gray-400 pr-8">{formattedDate}</span>
          <span>{data.address}</span>
        </p>
        <ul className="flex flex-wrap gap-4">{data.gifts?.map((gift, i) => <Chip kind="goods" label={gift} key={i} />)}</ul>
      </div>
    </div>
  );
};

export default HorizontalEventCard;
