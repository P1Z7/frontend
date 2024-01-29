import Carousel from "@/components/Carousel";
import { EventMockData } from "@/components/card/EventMockData";
import VerticalEventCard from "@/components/card/VerticalEventCard";

const NewestEventsCarousel = () => {
  return (
    <Carousel title="최신 등록 행사" customSettings={{ autoplay: true }}>
      <NewestEvents />
    </Carousel>
  );
};

const NewestEvents = () => {
  // 추후 최신순으로 10개 잘라낼 예정
  const newestEvents = EventMockData.slice(0, 10);

  return (
    <>
      {newestEvents.map((event, index) => (
        <div key={index}>
          <VerticalEventCard
            placeName={event.placeName}
            artistName={event.artistName}
            eventType={event.eventType}
            address={event.address}
            startDate={event.startDate}
            endDate={event.endDate}
          />
        </div>
      ))}
    </>
  );
};

export default NewestEventsCarousel;
