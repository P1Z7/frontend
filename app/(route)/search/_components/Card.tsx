import Image from "next/image";

interface Props {
  data: {
    placeName: string;
    eventType: string;
    artists: string;
    startDate: string;
    endDate: string;
    address: string;
    eventImages: string[];
    tags: string[];
  };
}

const Card = ({ data }: Props) => {
  return (
    <div className="flex h-136 w-full gap-12 border-b border-solid border-gray-400 py-12">
      <div className="relative h-full w-88 overflow-hidden rounded-sm">
        <Image src={data.eventImages[0]} alt="행사 썸네일 사진" fill className="object-cover" />
      </div>
      <div>
        <span>{data.placeName}</span>
      </div>
    </div>
  );
};

export default Card;
