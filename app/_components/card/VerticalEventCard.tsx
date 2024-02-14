import Image from "next/image";
import Link from "next/link";
import { MouseEvent } from "react";
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

  const handleHeartClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // 추가 동작 나중에 구현
    console.log("하트 눌렀습니당");
  };

  return (
    <Link href={`/event/${data.id}`} className="border-black flex w-148 cursor-pointer flex-col gap-12">
      <div className="relative h-196 w-148">
        <div className="absolute right-8 top-8 z-nav">
          <HeartButton isSelected={!!data.likeCount} onClick={handleHeartClick} />
        </div>
        <Image
          src={bannerImage?.imageUrl ?? "/image/no-profile.png"}
          fill
          sizes="14.8rem"
          style={{
            objectFit: "cover",
          }}
          alt="행사 포스터"
          className="rounded-sm bg-gray-400"
          priority
        />
      </div>
      <div className="flex flex-col gap-4">
        <p className="truncate text-16 font-600 text-gray-900">{data.placeName}</p>
        <div className="flex gap-8 text-12 font-600 text-gray-400">
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
