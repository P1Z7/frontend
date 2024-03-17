import Image from "next/image";
import { useRouter } from "next/navigation";
import { MouseEvent, SyntheticEvent } from "react";
import HeartButton from "@/components/button/HeartButton";
import Chip from "@/components/chip/Chip";
import useLikeEvent from "@/hooks/useLikeEvent";
import { formatAddress, formatDate } from "@/utils/formatString";
import { EventCardType } from "@/types/index";
import { TAG_ORDER } from "@/constants/post";
import ArrowIcon from "@/public/icon/arrow-right.svg";
import NoImage from "@/public/image/no-profile.png";

interface Props {
  data: EventCardType;
  isSelected: boolean;
  onCardClick: () => void;
  scrollRef?: ((el: HTMLDivElement) => void) | null;
}

const EventCard = ({ data, isSelected, onCardClick, scrollRef }: Props) => {
  const formattedDate = formatDate(data.startDate, data.endDate);
  const formattedAddress = formatAddress(data.address);

  const { liked, likeCount, handleLikeEvent } = useLikeEvent({ eventId: data.id, initialLike: data.isLike, initialLikeCount: data.likeCount });

  const handleClick = async () => {
    handleLikeEvent();
  };

  const router = useRouter();

  const chipCount = data.eventTags.length;
  const isChipMany = chipCount > 5;

  return (
    <div ref={scrollRef} onClick={onCardClick} className={`relative flex w-full cursor-pointer items-center gap-12 border-b border-gray-50 bg-white-black py-12`}>
      <div className="flex-center absolute right-0 top-[1.3rem] z-heart flex-col text-12 font-500 text-gray-500" onClick={(e: SyntheticEvent) => e.stopPropagation()}>
        <HeartButton isSmall isSelected={liked} onClick={handleClick} />
        <div className="relative bottom-4">{likeCount}</div>
      </div>
      {isSelected && (
        <button onClick={() => router.push(`/event/${data.id}`)} className="flex-center absolute -right-20 top-0 z-nav h-full w-48 bg-main-pink-500 shadow-inner">
          <ArrowIcon />
        </button>
      )}
      <div className="relative h-112 w-84 shrink-0 overflow-hidden">
        <Image
          src={data.eventImages?.[0]?.imageUrl ?? NoImage}
          className="rounded-[0.4rem] object-cover transition-all hover:scale-110"
          fill
          alt="행사 포스터"
          sizes="116px"
          priority
        />
      </div>
      <div className="relative flex w-full min-w-160 flex-col justify-center gap-4">
        <div className="flex flex-col gap-4">
          <h3 className="w-full truncate pr-[3rem] text-16 font-600">{data.placeName}</h3>
          <div className="flex w-full items-center gap-8 pr-32">
            <span className="truncate text-16 font-600">{data.targetArtists?.map((artist) => artist.artistName).join(", ")}</span>
            <Chip kind="event" label={data.eventType} />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-12 font-600 text-gray-400">
            <span className="mr-8 border-r border-gray-400 pr-8">{formattedDate}</span>
            <span>{formattedAddress}</span>
          </p>
          <ul className="flex max-w-[calc(100%-3rem)] flex-wrap gap-4 tablet:max-w-196 pc:max-w-236">
            {data.eventTags
              .sort((a, b) => TAG_ORDER[a.tagName] - TAG_ORDER[b.tagName])
              .map((tag) => <Chip key={tag.tagId} kind="goods" label={tag.tagName} />)
              .slice(0, 5)}
            <p className="text-center text-12 font-600 leading-10 text-gray-700">{isChipMany && `외 ${chipCount - 5}개`}</p>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
