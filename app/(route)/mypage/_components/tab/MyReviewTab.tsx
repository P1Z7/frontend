import Review from "@/(route)/event/[id]/_components/Review";
import { MyReviewProps } from "../../page";

const MyReviewTab = ({ reviewList }: { reviewList: MyReviewProps[] }) => {
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
