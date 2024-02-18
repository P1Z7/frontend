import { useQuery } from "@tanstack/react-query";
import { instance } from "@/api/api";
import { MyReviewType } from "@/types/index";
import MyReview from "../MyReview";

interface Props {
  userId: string;
}

const MyReviewTab = ({ userId }: Props) => {
  const { data: myReviewsData, isSuccess } = useQuery({
    queryKey: [userId],
    queryFn: async () => {
      return instance.get(`/reviews/user/${userId}`, { size: 12, cursorId: 500, userId: userId });
    },
  });

  if (!isSuccess) return;
  return (
    <ul className="flex-center w-full flex-col pt-8">
      {myReviewsData.length > 0 ? (
        myReviewsData.map((review: MyReviewType) => (
          <li key={review.id} className="w-full">
            <MyReview data={review} />
          </li>
        ))
      ) : (
        <h1 className="p-40 text-16 font-500 text-gray-900">작성하신 후기가 없습니다.</h1>
      )}
    </ul>
  );
};

export default MyReviewTab;
