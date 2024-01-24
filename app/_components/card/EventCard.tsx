interface EventCardProps {
  placeName: string;
  artistName: string;
  eventType: string;
  address: string;
  date: string;
}

// 하트 버튼은 추후 기능 만들면서 수정할 예정(디자인 바뀔 수 있음 이슈)
const EventCard = ({ placeName, artistName, eventType, address, date }: EventCardProps) => {
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
        <p>{date}</p>
      </div>
    </div>
  );
};

const Chip = ({ artistName }: { artistName: string }) => {
  return <div className="gap-10 flex items-center rounded-[4px] bg-[#C3C3C3] px-4 py-0">{artistName}</div>;
};

export default EventCard;
