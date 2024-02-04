import Review from "@/components/Review";
import BottomButton from "@/components/button/BottomButton";
import { MOCK_REVIEWS } from "@/constants/mock";

const ReviewTab = () => {
  return (
    <div className="h-400 w-full">
      <BottomButton>후기 작성하기</BottomButton>
      <ul className="w-full">
        {MOCK_REVIEWS.map((data, index) => (
          <li key={index}>
            <Review data={data} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewTab;
