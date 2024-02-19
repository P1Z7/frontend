import Image from "next/image";
import Link from "next/link";
import { SyntheticEvent } from "react";
import useLikeEvent from "@/hooks/useLikeEvent";
import { formatAddress, formatDate } from "@/utils/formatString";
import { Res_Get_Type } from "@/types/getResType";
import HeartButton from "../button/HeartButton";
import Chip from "../chip/Chip";

interface Props {
  data: Res_Get_Type["event"];
}

const VerticalEventCard = ({ data }: Props) => {
  const formattedDate = formatDate(data.startDate, data.endDate);
  const formattedAddress = formatAddress(data.address);
  const bannerImage = data.eventImages.find((images) => images.isMain);

  const { liked, handleLikeEvent } = useLikeEvent({ eventId: data.id, initialLikeCount: data.likeCount });

  return (
    <Link href={`/event/${data.id}`} className="flex w-148 cursor-pointer flex-col gap-12 pc:w-188">
      <div className="relative h-196 w-148 pc:h-244 pc:w-188">
        <div className="z-heart absolute right-8 top-8" onClick={(e: SyntheticEvent) => e.preventDefault()}>
          <HeartButton isSelected={liked} onClick={handleLikeEvent} />
        </div>
        <Image
          src={bannerImage?.imageUrl ?? "/image/no-profile.png"}
          fill
          sizes="100%"
          style={{
            objectFit: "cover",
          }}
          alt="행사 포스터"
          className="rounded-sm bg-gray-400"
          priority
        />
      </div>
      <div className="flex flex-col gap-4 pc:gap-8">
        <p className="truncate text-16 font-600 text-gray-900">{data.placeName}</p>
        <div className="flex gap-8 text-12 font-600 text-gray-400 pc:text-16 pc:font-500">
          <p className="border-r border-gray-400 pr-8">{formattedDate}</p>
          <p>{formattedAddress}</p>
        </div>
        <div className="flex items-center gap-8">
          <p className="truncate text-16 font-600 text-gray-900">{data.targetArtists?.map((artist) => artist.artistName).join(", ")}</p>
          <Chip label={data.eventType} kind="event" />
        </div>
      </div>
    </Link>
  );
};

export default VerticalEventCard;
