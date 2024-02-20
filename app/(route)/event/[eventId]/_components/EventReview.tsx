import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Evaluation from "@/components/Evaluation";
import ReportModal from "@/components/modal/ReportModal";
import { instance } from "@/api/api";
import { useModal } from "@/hooks/useModal";
import { getSession } from "@/store/session/cookies";
import { EventReviewType } from "@/types/index";
import HeartIcon from "@/public/icon/heart.svg";

const DEFAULT_PROFILE_IMAGE = "/image/no-profile.png";

interface Props {
  data: EventReviewType;
}

const EventReview = ({ data }: Props) => {
  const [liked, setLiked] = useState(data.isLike);
  const [likeCount, setLikeCount] = useState(data.likeCount);

  const session = getSession();
  const router = useRouter();

  const likeMutation = useMutation({
    mutationFn: () => instance.post(`/reviews/${data.id}/like`, { reviewId: data.id, userId: data?.user.id, isLike: data.isLike }),
    onSuccess: () => {
      setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
      setLiked((prev) => !prev);
    },
  });

  const handleLikeReview = () => {
    if (!session) {
      router.push("/signin");
    }
    likeMutation.mutate();
  };

  const { modal, openModal, closeModal } = useModal();

  return (
    <>
      <div className="flex flex-col gap-16 border-b border-gray-50 px-20 py-16">
        <div className="flex items-center gap-8">
          <div className="relative h-32 w-32 pc:h-40 pc:w-40">
            <Image src={data.user?.profileImage ?? DEFAULT_PROFILE_IMAGE} alt="프로필 이미지" fill className="rounded-full object-cover" sizes="3.2rem" />
          </div>
          <div className="text-16 font-500">{data.user?.nickName}</div>
          <button onClick={() => openModal("report")} className="ml-auto text-12 font-500 text-gray-400">
            신고하기
          </button>
        </div>
        <Evaluation rating={data.rating} />
        {data.isPublic && (
          <>
            <div className="text-left text-14 font-400 pc:text-16">{data?.description}</div>
            <ul className="flex gap-8 overflow-auto">
              {data?.reviewImages?.map((image, index) => (
                <li key={index} className="relative h-120 w-120 shrink-0">
                  <Image src={image.url} alt="후기 사진" fill className="object-cover" sizes="12rem" />
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="flex justify-between">
          <button onClick={handleLikeReview} className="flex items-center gap-[0.65rem] text-12 font-500 text-gray-500">
            <HeartIcon stroke={liked ? "#FF50AA" : "#A0A5B1"} fill={liked ? "#FF50AA" : "none"} width={20} height={20} viewBox="0 0 24 24" />
            {likeCount}
          </button>
        </div>
      </div>
      {modal === "report" && <ReportModal closeModal={closeModal} type="review" reviewId={data.id} />}
    </>
  );
};

export default EventReview;
