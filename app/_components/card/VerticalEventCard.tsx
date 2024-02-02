import Image from "next/image";
import { formatAddress, formatDate } from "@/utils/formatString";
import { EventInfoType } from "@/types/index";
import HeartButton from "../button/HeartButton";
import Chip from "./Chip";

interface Props {
  data: EventInfoType;
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
        <Image
          src={data.eventImages?.[0] || ""}
          fill
          style={{
            objectFit: "cover",
          }}
          alt="행사 포스터"
          className="rounded-sm bg-gray-400"
        />
      </div>
      <div className="flex flex-col gap-4">
        <p className="truncate text-16 font-600 text-gray-900">{data.placeName}</p>
        <div className="flex gap-8 text-12 font-600 text-gray-400">
          <p className="border-r border-gray-400 pr-8">{formattedDate}</p>
          <p>{formattedAddress}</p>
        </div>
        <div className="flex gap-8">
          <p className="text-16 font-600 text-gray-900">{data.artists[0]}</p>
          {/* 공통 컴포넌트로 수정 예정 */}
          <Chip chipName={data.eventType} />
        </div>
      </div>
    </div>
  );
};

export default VerticalEventCard;
