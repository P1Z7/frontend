interface EventCardProps {
  placeName: string;
  artistName: string;
  eventType: string;
  address: string;
  startDate: string;
  endDate: string;
}

const EventCard = ({ placeName, artistName, eventType, address, startDate, endDate }: EventCardProps) => {
  // "2024-" 부분을 제외하고 날짜를 보여주기 위해 Date 객체 사용
  const formattedStartDate = new Date(startDate).toLocaleDateString(undefined, { month: "2-digit", day: "2-digit" });
  const formattedEndDate = new Date(endDate).toLocaleDateString(undefined, { month: "2-digit", day: "2-digit" });
  return (
    <div className="flex w-180 flex-col gap-8 border border-solid border-black p-[10px]">
      <div className="h-160 bg-[#e7e7e7]" />
      <div className="flex flex-col gap-4">
        <p>{placeName}</p>
        <div className="flex gap-4">
          <Chip artistName={artistName} />
          <p>{eventType}</p>
          <p>{address}</p>
        </div>
        <p>
          {formattedStartDate} ~ {formattedEndDate}
        </p>
      </div>
    </div>
  );
};

const Chip = ({ artistName }: { artistName: string }) => {
  return <div className="gap-10 flex items-center rounded-[4px] bg-[#C3C3C3] px-4 py-0">{artistName}</div>;
};

export default EventCard;
