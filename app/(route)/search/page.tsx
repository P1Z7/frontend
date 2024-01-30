"use client";

import Image from "next/image";
import closeIcon from "@/public/icon/x_gray.svg";
import Card from "./_components/Card";

const MOCK_EVENTS = [
  {
    placeName: "스타벅스",
    eventType: "카페",
    artists: "민지",
    startDate: "2024-01-29",
    endDate: "2024-01-30",
    address: "중구",
    eventImages: ["https://thumbnews.nateimg.co.kr/view610///news.nateimg.co.kr/orgImg/nn/2023/10/06/202310061706173510_1.jpg"],
    tags: ["포토카드", "엽서"],
  },
  {
    placeName: "강남역",
    eventType: "팬광고",
    artists: "하니",
    startDate: "2024-01-29",
    endDate: "2024-01-30",
    address: "강남구",
    eventImages: ["https://img.sbs.co.kr/newsnet/etv/upload/2023/08/17/30000869318_1280.jpg"],
    tags: ["포토카드", "엽서"],
  },
];

const SearchPage = () => {
  return (
    <main className="w-full px-20 pt-40">
      <div className="relative">
        <input placeholder="최애의 행사를 찾아보세요!" className="h-44 w-full rounded-full bg-gray-300 px-12 text-16 font-400" />
      </div>
      <section>
        {MOCK_EVENTS.map((event) => (
          <Card data={event} />
        ))}
      </section>
    </main>
  );
};

export default SearchPage;
