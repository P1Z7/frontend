// "use client"
import { EventReviewType } from "@/types/index";
import BottomButton from "../BottomButton";
import EventReview from "../EventReview";

const getEventInfo = async () => {
  const data = await fetch(`http://${process.env.NEXT_PUBLIC_BASE_URL}/reviews/f6c28285-c4b3-4af6-b27e-2faf4294e8ad?size=10&cursorId=100`);
  const res: EventReviewType[] = await data.json();
  return res;
};

const ReviewTab = async () => {
  const data = await getEventInfo();

  return (
    <div className="w-full">
      <div className="w-full py-16">
        {data.map((data) => (
          <EventReview key={data.id} data={data} />
        ))}
      </div>
      <BottomButton />
    </div>
  );
};

export default ReviewTab;
