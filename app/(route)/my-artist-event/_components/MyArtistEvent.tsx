import { EventMockData } from "@/components/card/EventMockData";
import HorizontalEventCard from "@/components/card/HorizontalEventCard";

const MyArtistEvent = () => {
  // 좋아요 한 아티스트의 새 행사 로직은 추후 구현

  return (
    <>
      {EventMockData.map((event, index) => (
        <div key={index}>
          <HorizontalEventCard
            placeName={event.placeName}
            artistName={event.artistName}
            eventType={event.eventType}
            address={event.address}
            startDate={event.startDate}
            endDate={event.endDate}
            gifts={event.gifts}
          />
        </div>
      ))}
    </>
  );
};

export default MyArtistEvent;
