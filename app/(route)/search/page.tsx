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
        <input placeholder="그룹 / 아티스트명으로 검색해주세요." className="w-full border-b border-solid border-gray-400 py-12 text-20 outline-none" />
        <button className="absolute right-4 top-20">
          <Image src={closeIcon} width={16} height={16} alt="검색어 삭제 버튼" />
        </button>
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
