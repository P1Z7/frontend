"use client";

import { MOCK, MOCK_REVIEWS } from "app/_constants/mock";
import Tabs from "@/components/Tabs";
import UserProfile from "./_components/UserProfile";
import ArtistTab from "./_components/tab/ArtistTab";
import EventTab from "./_components/tab/EventTab";
import MyReviewTab from "./_components/tab/MyReviewTab";

const MyPage = () => {
  return (
    <div className="flex w-full flex-col gap-24 pb-72">
      <UserProfile data={MOCK_USER_INFO} />
      <Tabs names={["행사", "아티스트", "후기"]}>
        <EventTab scheduleData={mockScheduleData} />
        <ArtistTab data={MOCK} />
        <MyReviewTab reviewList={MOCK_REVIEWS} />
      </Tabs>
    </div>
  );
};

export default MyPage;

const MOCK_USER_INFO = {
  nickName: "민정사랑해",
  email: "iloveminjeong@mail.com",
  profileImg: null,
};

// export interface MyReviewProps {
//   place: string;
//   public: boolean;
//   rate: boolean;
//   description: string;
//   images: string[];
//   like: number;
// }
// // 데이터베이스 구조에 따라 사라질 타입이라 해당 파일에 선언

export interface ScheduleDataProps {
  id: number;
  placeName: string;
  artists: string[];
  eventType: "카페";
  address: string;
  startDate: string;
  endDate: string;
  eventImages?: string[];
  tags: ["포토카드"];
}

const mockScheduleData: ScheduleDataProps[] = [
  {
    id: 1,
    placeName: "윤정한 카페",
    artists: ["윤정한"],
    eventType: "카페",
    address: "서울특별시 마포구 와우산로 00-00 1층",
    startDate: "2024-01-28T00:00:00+09:00",
    endDate: "2024-02-01T00:00:00+09:00",
    tags: ["포토카드"],
  },
  {
    id: 2,
    placeName: "김정우 카페",
    artists: ["김정우"],
    eventType: "카페",
    address: "서울특별시 강남구 와우산로 00-00 1층",
    startDate: "2024-01-26T00:00:00+09:00",
    endDate: "2024-01-26T00:00:00+09:00",
    tags: ["포토카드"],
  },
  {
    id: 3,
    placeName: "김민지 카페",
    artists: ["김민지"],
    eventType: "카페",
    address: "서울특별시 강남구 와우산로 00-00 1층",
    startDate: "2024-01-26T00:00:00+09:00",
    endDate: "2024-01-28T00:00:00+09:00",
    tags: ["포토카드"],
  },
];
