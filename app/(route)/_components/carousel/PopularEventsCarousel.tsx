import VerticalEventCard from "@/components/card/VerticalEventCard";
import { MOCK_EVENTS } from "@/constants/mock";
import Carousel from "./Carousel";

const PopularEventsCarousel = () => {
  return (
    <Carousel title="지금 가장 인기 있는 행사">
      <PopularEvents />
    </Carousel>
  );
};

const PopularEvents = () => {
  // 추후 인기순으로 10개 잘라낼 예정
  const popularEvents = MOCK_EVENTS.slice(0, 10);

  return (
    <>
      {popularEvents.map((event, index) => (
        <div key={index}>
          <VerticalEventCard data={event} />
        </div>
      ))}
    </>
  );
};

export default PopularEventsCarousel;
