import Review from "@/components/Review";
import { ReviewType } from "@/types/index";

const MyReviewTab = ({ reviewList }: { reviewList: ReviewType[] }) => {
  return (
    <div className="h-400 w-full">
      <ul className="w-full">
        {reviewList.map((data, index) => (
          <li key={index}>
            <Review data={data} type="myReview" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyReviewTab;
