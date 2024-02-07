import Image from "next/image";
import Evaluation from "@/components/Evaluation";
import { formatAddress, formatDate } from "@/utils/formatString";
import HeartIcon from "@/public/icon/heart.svg";
import { ReviewType } from "../_types";
import Chip from "./chip/Chip";

const MOCK_USER = {
  test: {
    username: "테스트유저",
    profileImg:
      "https://i.namu.wiki/i/Jlh9d_TSuVTU8oGNge67qcK08CtwsUaHDFCPzCFnUigDIvA2hIQbLxnyle2A5ZIDK6C7vKMtVDmDRTDmT5j9xnr_UXhw6ENoiSHccpEFNN3KNZZSRuIbM4TrgVcAThdIG1AqUtFbsLdXb1O0-W2gIw.webp",
  },
};

const MOCK_EVENT = {
  test: {
    placeName: "앤디스커피 홍대점",
    eventType: "카페" as const,
    artist: "민지",
    startDate: "2024-01-28",
    endDate: "2024-01-30",
    address: "서울특별시 마포구 와우산로 00-00 1층",
  },
};

type ReviewPageType = "eventReview" | "myReview";
interface Props {
  data: ReviewType;
  type?: ReviewPageType;
}

const Review = ({ data, type = "eventReview" }: Props) => {
  return (
    <div className="flex flex-col gap-16 border-b border-gray-50 px-20 py-16">
      <Header type={type} userId={data.userId} eventId={data.eventId} isPublic={data.isPublic} />
      <Description rating={data.rating} description={data.description} reviewImages={data.reviewImages} />
      <div className="flex justify-between">
        <button className="flex items-center gap-[0.65rem] text-12 font-500 text-gray-500">
          <HeartIcon stroke="#7E8695" width={20} height={20} viewBox="0 0 24 24" />
          {data.like}
        </button>
        {type === "myReview" && <button className="text-12 font-500 text-blue">수정하기</button>}
      </div>
    </div>
  );
};

export default Review;

interface HeaderProps {
  type: ReviewPageType;
  userId: string;
  eventId: string;
  isPublic: boolean | undefined;
}

const Header = ({ type, userId, eventId, isPublic = true }: HeaderProps) => {
  if (type === "myReview") {
    const formattedDate = formatDate(MOCK_EVENT[eventId as "test"].startDate, MOCK_EVENT[eventId as "test"].endDate);
    const formattedAddress = formatAddress(MOCK_EVENT[eventId as "test"].address);
    return (
      <div>
        <div className="flex items-center justify-between pb-8">
          <span className="text-16 font-600">{MOCK_EVENT[eventId as "test"].placeName}</span>
          <span className="text-12 font-500 text-gray-400">{isPublic ? "공개" : "비공개"}</span>
        </div>
        <div className="flex items-center gap-8">
          <span className="text-16 font-600">{MOCK_EVENT[eventId as "test"].artist}</span>
          <Chip kind="event" label={MOCK_EVENT[eventId as "test"].eventType} />
          <div className="border-r border-gray-400 pr-8 text-12 font-600 text-gray-400">{formattedDate}</div>
          <span className="text-12 font-600 text-gray-400">{formattedAddress}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-8">
      <div className="relative h-32 w-32">
        <Image src={MOCK_USER[userId as "test"].profileImg} alt="프로필 이미지" fill className="rounded-full object-cover" />
      </div>
      <div className="text-16 font-500">{MOCK_USER[userId as "test"].username}</div>
      <button className="ml-auto text-12 font-500 text-gray-400">신고하기</button>
    </div>
  );
};

interface DescriptionProps {
  rating: boolean;
  description: string;
  reviewImages?: string[];
}

const Description = ({ rating, description, reviewImages }: DescriptionProps) => {
  return (
    <>
      <Evaluation rating={rating} />
      <div className="text-14 font-400">{description}</div>
      <ul className="flex gap-8 overflow-auto">
        {reviewImages?.map((image) => (
          <li key={image} className="relative h-120 w-120 shrink-0">
            <Image src={image} alt="후기 사진" fill className=" object-cover" />
          </li>
        ))}
      </ul>
    </>
  );
};
