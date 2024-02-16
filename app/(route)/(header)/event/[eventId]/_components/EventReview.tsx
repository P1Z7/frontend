import Image from "next/image";
import Evaluation from "@/components/Evaluation";
import { EventReviewType } from "@/types/index";
import HeartIcon from "@/public/icon/heart.svg";

const DEFAULT_PROFILE_IMAGE = "/image/no-profile.png";

interface Props {
  data: EventReviewType;
}

const EventReview = ({ data }: Props) => {
  return (
    <div className="flex flex-col gap-16 border-b border-gray-50 px-20 py-16">
      <div className="flex items-center gap-8">
        <div className="relative h-32 w-32 tablet:h-40 tablet:w-40">
          <Image src={data.user?.profileImage ?? DEFAULT_PROFILE_IMAGE} alt="프로필 이미지" fill className="rounded-full object-cover" sizes="3.2rem" />
        </div>
        <div className="text-16 font-500">{data.user.nickName}</div>
        <button className="ml-auto text-12 font-500 text-gray-400">신고하기</button>
      </div>
      <Evaluation rating={data.rating} />
      <div className="text-14 font-400 tablet:text-16">{data.description}</div>
      <ul className="flex gap-8 overflow-auto">
        {data.reviewImages?.map((image, index) => (
          <li key={index} className="relative h-120 w-120 shrink-0">
            <Image src={image.url} alt="후기 사진" fill className="object-cover" sizes="12rem" />
          </li>
        ))}
      </ul>
      <div className="flex justify-between">
        <button className="flex items-center gap-[0.65rem] text-12 font-500 text-gray-500">
          <HeartIcon stroke="#7E8695" width={20} height={20} viewBox="0 0 24 24" />
          {data.likeCount}
        </button>
      </div>
    </div>
  );
};

export default EventReview;
