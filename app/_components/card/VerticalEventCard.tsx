import Image from "next/image";
import { formatAddress, formatDate } from "@/utils/formatString";
import { EventInfoType, PopularEventType } from "@/types/index";
import HeartButton from "../button/HeartButton";
import Chip from "../chip/Chip";

interface Props {
  data: PopularEventType;
}

const VerticalEventCard = ({ data }: Props) => {
  const formattedDate = formatDate(data.startDate, data.endDate);
  const formattedAddress = formatAddress(data.address);

  return (
    <div className="border-black flex w-148 flex-col gap-12">
      <div className="relative h-196 w-148">
        <div className="absolute right-8 top-8 z-nav">
          <HeartButton />
        </div>
        {data.eventImages.map(
          (image) =>
            image.isMain && (
              <Image
                src={image.imageUrl}
                fill
                style={{
                  objectFit: "cover",
                }}
                alt="행사 포스터"
                className="rounded-sm bg-gray-400"
                key={image.id}
              />
            ),
        )}
      </div>
      <div className="flex flex-col gap-4">
        <p className="truncate text-16 font-600 text-gray-900">{data.placeName}</p>
        <div className="flex gap-8 text-12 font-600 text-gray-400">
          <p className="border-r border-gray-400 pr-8">{formattedDate}</p>
          <p>{formattedAddress}</p>
        </div>
        <div className="flex gap-8">
          {data.targetArtists?.map((artist) => (
            <p className="text-16 font-600 text-gray-900" key={artist.artistId}>
              {artist.artistName}
            </p>
          ))}
          <Chip label={data.eventType} kind="event" />
        </div>
      </div>
    </div>
  );
};

export default VerticalEventCard;
