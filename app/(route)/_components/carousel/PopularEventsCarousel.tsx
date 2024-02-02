import Carousel from "@/components/Carousel";
import { EventMockData } from "@/components/card/EventMockData";
import VerticalEventCard from "@/components/card/VerticalEventCard";

const PopularEventsCarousel = () => {
  return (
    <Carousel title="실시간 인기 행사" customSettings={{ autoplay: true }}>
      <PopularEvents />
    </Carousel>
  );
};

const PopularEvents = () => {
  // 추후 인기순으로 10개 잘라낼 예정
  const popularEvents = EventMockData.slice(0, 10);

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
