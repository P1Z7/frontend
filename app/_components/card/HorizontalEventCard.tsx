import { ScheduleDataProps } from "@/(route)/(bottom-nav)/mypage/page";
import Image from "next/image";
import Link from "next/link";
import { SyntheticEvent } from "react";
import HeartButton from "@/components/button/HeartButton";
import Chip from "@/components/chip/Chip";
import { formatAddress, formatDate } from "@/utils/formatString";
import { EventCardType } from "@/types/index";
import NoImage from "@/public/image/no-profile.png";

interface Props {
  data: EventCardType;
  hasHeart?: boolean;
  onHeartClick?: () => void;
}

const HorizontalEventCard = ({ data, hasHeart = false, onHeartClick }: Props) => {
  const formattedDate = formatDate(data.startDate, data.endDate);
  const formattedAddress = formatAddress(data.address);

  return (
    <Link href={`/event/${data.id}`} className="flex w-full items-center gap-12 border-b border-gray-50 bg-transparent py-12">
      <div className="relative h-112 w-84 shrink-0">
        <Image src={data.eventImages?.[0]?.imageUrl ?? NoImage} className="rounded-[0.4rem] object-cover" fill alt="행사 포스터" sizes="82px" />
      </div>
      <div className="relative flex w-full min-w-160 flex-col justify-center gap-4">
        <div className="absolute right-0 top-0" onClick={(e: SyntheticEvent) => e.preventDefault()}>
          <HeartButton isSmall isSelected={hasHeart} onClick={onHeartClick} />
        </div>
        <h3 className="w-full truncate pr-20 text-16 font-600">{data.placeName}</h3>
        <div className="flex w-full items-center gap-8">
          <span className="text-16 font-600">{data.targetArtists?.map((artist) => artist.artistName).join(", ")}</span>
          <Chip kind="event" label={data.eventType} />
        </div>
        <p className="h-16 text-12 font-600 text-gray-400">
          <span className="mr-8 border-r border-gray-400 pr-8">{formattedDate}</span>
          <span>{formattedAddress}</span>
        </p>
        <ul className="flex flex-wrap gap-4">
          {data.eventTags.map((tag) => (
            <Chip key={tag.tagId} kind="goods" label={tag.tagName} />
          ))}
        </ul>
      </div>
    </Link>
  );
};

export default HorizontalEventCard;
