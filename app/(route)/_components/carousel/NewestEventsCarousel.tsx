import VerticalEventCard from "@/components/card/VerticalEventCard";
import { MOCK_EVENTS } from "@/constants/mock";
import Carousel from "./Carousel";

const NewestEventsCarousel = () => {
  return (
    <Carousel title="새로 올라온 행사">
      <NewestEvents />
    </Carousel>
  );
};

const NewestEvents = () => {
  // 추후 최신순으로 10개 잘라낼 예정
  const newestEvents = MOCK_EVENTS.slice(0, 10);

  return (
    <>
      {newestEvents.map((event, index) => (
        <div key={index}>
          <VerticalEventCard data={event} />
        </div>
      ))}
    </>
  );
};

export default NewestEventsCarousel;
