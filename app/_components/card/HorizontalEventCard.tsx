import Image from "next/image";
import Link from "next/link";
import { SyntheticEvent } from "react";
import HeartButton from "@/components/button/HeartButton";
import Chip from "@/components/chip/Chip";
import useLikeEvent from "@/hooks/useLikeEvent";
import { formatAddress, formatDate } from "@/utils/formatString";
import { EventCardType } from "@/types/index";
import { TAG_ORDER } from "@/constants/data";
import NoImage from "@/public/image/no-profile.png";

interface Props {
  data: EventCardType;
  onHeartClick?: () => void; //기본 동작 말고 다른 기능이 필요한 경우
  isGrow?: boolean;
}

const HorizontalEventCard = ({ data, onHeartClick, isGrow = false }: Props) => {
  const formattedDate = formatDate(data.startDate, data.endDate);
  const formattedAddress = formatAddress(data.address);

  const { liked, handleLikeEvent } = useLikeEvent({ eventId: data.id, initialLikeCount: data.likeCount });

  const handleClick = async () => {
    if (onHeartClick) {
      onHeartClick();
      return;
    }

    handleLikeEvent();
  };

  return (
    <Link
      href={`/event/${data.id}`}
      className={`relative flex w-full ${isGrow ? "" : "pc:max-w-[50.8rem]"} items-center gap-12 border-b border-gray-50 bg-white-black py-12 pc:gap-20 pc:py-20`}
    >
      <div className="z-heart absolute right-0 top-[1.3rem] pc:top-[2.75rem]" onClick={(e: SyntheticEvent) => e.preventDefault()}>
        <HeartButton isSmall isSelected={liked} onClick={handleClick} />
      </div>
      <div className="relative h-112 w-84 shrink-0 pc:h-152 pc:w-116">
        <Image src={data.eventImages?.[0]?.imageUrl ?? NoImage} className="rounded-[0.4rem] object-cover" fill alt="행사 포스터" sizes="116px" />
      </div>
      <div className="relative flex w-full min-w-160 flex-col justify-center gap-4 pc:gap-28">
        <div className="flex flex-col gap-4">
          <h3 className="w-full truncate pr-20 text-16 font-600 pc:text-20">{data.placeName}</h3>
          <div className="flex w-full items-center gap-8 pc:gap-12">
            <span className="text-16 font-600">{data.targetArtists?.map((artist) => artist.artistName).join(", ")}</span>
            <Chip kind="event" label={data.eventType} />
          </div>
        </div>
        <div className="flex flex-col gap-4 pc:gap-8">
          <p className="text-12 font-600 text-gray-400 pc:text-16 pc:font-500">
            <span className="mr-8 border-r border-gray-400 pr-8">{formattedDate}</span>
            <span>{formattedAddress}</span>
          </p>
          <ul className="flex flex-wrap gap-4">
            {data.eventTags
              .sort((a, b) => TAG_ORDER[a.tagId].order - TAG_ORDER[b.tagId].order)
              .map((tag) => (
                <Chip key={tag.tagId} kind="goods" label={tag.tagName} />
              ))}
          </ul>
        </div>
      </div>
    </Link>
  );
};

export default HorizontalEventCard;
