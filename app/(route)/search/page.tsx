"use client";

import HorizontalEventCard from "@/components/card/HorizontalEventCard";

const MOCK_EVENTS = [
  {
    placeName: "스타벅스",
    eventType: "카페",
    artistName: "민지",
    startDate: "2024-01-29",
    endDate: "2024-01-30",
    address: "중구",
    gifts: ["포토카드", "엽서"],
  },
  {
    placeName: "강남역",
    eventType: "팬광고",
    artistName: "하니",
    startDate: "2024-01-29",
    endDate: "2024-01-30",
    address: "강남구",
    gifts: ["포토카드", "엽서"],
  },
];

const SearchPage = () => {
  return (
    <main className="w-full px-20 pt-40">
      <div className="relative">
        <input placeholder="최애의 행사를 찾아보세요!" className="h-44 w-full rounded-full bg-gray-200 px-12 text-16 font-400 outline-none" />
      </div>
      <section>
        <button>시/도</button>
        <button>시/도</button>
        <button>시/도</button>
      </section>
      <section>
        {MOCK_EVENTS.map((event, index) => (
          <HorizontalEventCard key={index} data={event} />
        ))}
      </section>
    </main>
  );
};

export default SearchPage;
