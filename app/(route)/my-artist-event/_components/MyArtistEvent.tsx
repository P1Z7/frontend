import { EventMockData } from "@/(route)/_components/EventMockData";
import VerticalEventCard from "@/components/card/VerticalEventCard";

const MyArtistEvent = () => {
  // 좋아요 한 아티스트의 새 행사 로직은 추후 구현

  return (
    <>
      {EventMockData.map((event, index) => (
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

export default MyArtistEvent;
