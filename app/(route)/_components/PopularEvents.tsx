import Carousel from "@/components/card/Carousel";
import EventCard from "@/components/card/EventCard";
import { EventMockData } from "./EventMockData";

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
          <EventCard placeName={event.placeName} artistName={event.artistName} eventType={event.eventType} address={event.address} date={event.date} />
        </div>
      ))}
    </>
  );
};

export default PopularEventsCarousel;
