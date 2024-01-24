import EventCard from "@/components/card/EventCard";
import { EventMockData } from "./EventMockData";

const NewestEvents = () => {
  // 추후 최신순으로 10개 잘라낼 예정
  const newestEvents = EventMockData.slice(0, 10);

  return (
    <>
      {newestEvents.map((event, index) => (
        <div key={index}>
          <EventCard placeName={event.placeName} artistName={event.artistName} eventType={event.eventType} address={event.address} date={event.date} />
        </div>
      ))}
    </>
  );
};

export default NewestEvents;
