import Image from "next/image";
import Evaluation from "@/components/Evaluation";

interface Props {
  data: {
    user: {
      nickname: string;
      profileImage: string;
    };
    rate: boolean;
    description: string;
    images: string[];
    like: number;
  };
}

const Review = ({ data }: Props) => {
  return (
    <div className="h-240 w-full border border-solid border-black">
      <User user={data.user} />
      <Evaluation rate={data.rate} />
      <p>{data.description}</p>
      <ul className="flex h-120 w-full gap-12 overflow-x-auto">
        {data.images.map((image, index) => (
          <li key={index} className="relative h-120 w-120 flex-shrink-0 overflow-hidden">
            <Image src={image} alt={"후기 사진"} fill className="object-cover" />
          </li>
        ))}
      </ul>
      <div>
        <button>하트 아이콘</button>
        {data.like}
      </div>
    </div>
  );
};

export default Review;

interface UserProps {
  user: {
    nickname: string;
    profileImage: string;
  };
}

const User = ({ user }: UserProps) => {
  return (
    <div className="flex w-full">
      <div className="relative h-32 w-32 overflow-hidden rounded-full">
        <Image src={user.profileImage} alt={"가수 사진"} fill className="object-cover" />
      </div>
      <p>{user.nickname}</p>
      <button className="ml-auto">신고하기</button>
    </div>
  );
};
