import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import Evaluation from "@/components/Evaluation";
import Chip from "@/components/chip/Chip";
import { instance } from "@/api/api";
import { formatAddress, formatDate } from "@/utils/formatString";
import { MyReviewType } from "@/types/index";
import HeartIcon from "@/public/icon/heart.svg";

interface Props {
  data: MyReviewType;
  userId: string;
}

const MyReview = ({ data, userId }: Props) => {
  const formattedDate = formatDate(data.event.startDate, data.event.endDate);
  const formattedAddress = formatAddress(data.event.address);

  const [liked, setLiked] = useState(data.isLike);
  const [likeCount, setLikeCount] = useState(data.likeCount);

  const likeMutation = useMutation({
    mutationFn: () => instance.post(`/reviews/${data.id}/like`, { reviewId: data.id, userId: userId, isLike: data.isLike }),
    onSuccess: () => {
      setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
      setLiked((prev) => !prev);
    },
  });

  return (
    <div className="flex w-full flex-col gap-16 border-b border-gray-50 px-20 py-16">
      <section>
        <div className="flex items-center justify-between pb-8">
          <span className="text-16 font-600">{data.event.placeName}</span>
          <span className="text-12 font-500 text-gray-400">{data.isPublic ? "공개" : "비공개"}</span>
        </div>
        <div className="flex items-center gap-8">
          <span className="text-16 font-600">{data.event.placeName}</span>
          <Chip kind="event" label={data.event.eventType} />
          <div className="border-r border-gray-400 pr-8 text-12 font-600 text-gray-400">{formattedDate}</div>
          <span className="text-12 font-600 text-gray-400">{formattedAddress}</span>
        </div>
      </section>
      <Evaluation rating={data.rating} />
      <div className="text-14 font-400">{data.description}</div>
      <ul className="flex gap-8 overflow-auto">
        {data.reviewImages?.map((image, index) => (
          <li key={index} className="relative h-120 w-120 shrink-0">
            <Image src={image.url} alt="후기 사진" fill className="object-cover" sizes="12rem" />
          </li>
        ))}
      </ul>
      <div className="flex justify-between">
        <button onClick={() => likeMutation.mutate()} className="flex items-center gap-[0.65rem] text-12 font-500 text-gray-500">
          <HeartIcon stroke={liked ? "#FF50AA" : "#A0A5B1"} fill={liked ? "#FF50AA" : "none"} width={20} height={20} viewBox="0 0 24 24" />
          {likeCount}
        </button>
      </div>
    </div>
  );
};

export default MyReview;
