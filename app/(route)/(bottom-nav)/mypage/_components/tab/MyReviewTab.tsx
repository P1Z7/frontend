import { useQuery } from "@tanstack/react-query";
import { Api } from "@/api/api";
import { MyReviewType } from "@/types/index";
import MyReview from "../MyRiew";

const MyReviewTab = () => {
  const instance = new Api(process.env.NEXT_PUBLIC_ACCESS_TOKEN);
  const ID = "6fc13c28-26f5-4ec0-ad41-b8548aeaa9c8";
  const NoneMyArtistID = "f14ab7e7-ee5c-4707-b68e-ddb6cf8b0f00";

  const { data: myReviewsData, isSuccess } = useQuery({
    queryKey: [ID],
    queryFn: async () => {
      return instance.get(`/reviews/user/${ID}`, { size: 12, cursorId: 1, userId: ID });
    },
  });

  console.log(myReviewsData);
  if (!isSuccess) return;
  return (
    <ul className="flex-center w-full flex-col pt-8">
      {myReviewsData.length > 0 ? (
        myReviewsData.map((review: MyReviewType) => (
          <li key={review.id}>
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
