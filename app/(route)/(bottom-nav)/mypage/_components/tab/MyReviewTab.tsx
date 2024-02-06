import Review from "@/components/Review";
import { ReviewType } from "@/types/index";

const MyReviewTab = ({ reviewList }: { reviewList: ReviewType[] }) => {
  return (
    <ul className="w-full pt-8">
      {reviewList.map((data, index) => (
        <li key={index}>
          <Review data={data} type="myReview" />
        </li>
      ))}
    </ul>
  );
};

export default MyReviewTab;
