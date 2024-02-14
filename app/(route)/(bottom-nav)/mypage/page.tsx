"use client";

import { MOCK, MOCK_REVIEWS } from "app/_constants/mock";
import Tabs from "@/components/Tabs";
import UserProfile from "./_components/UserProfile";
import MyArtistTab from "./_components/tab/MyArtistTab";
import MyEventTab from "./_components/tab/MyEventTab";
import MyReviewTab from "./_components/tab/MyReviewTab";

const MyPage = () => {
  return (
    <div className="flex w-full flex-col gap-24 pb-72">
      <UserProfile data={MOCK_USER_INFO} />
      <Tabs names={["행사", "아티스트", "후기"]}>
        <MyEventTab scheduleData={mockScheduleData} />
        <MyArtistTab data={MOCK} />
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
  isLike: boolean;
}

const mockScheduleData: ScheduleDataProps[] = [
  {
    id: 1,
    placeName: "앤디스커피 연남점",
    artists: ["윤정한"],
    eventType: "카페",
    address: "서울 마포구 동교로 256-4",
    startDate: "2024-01-28T00:00:00+09:00",
    endDate: "2024-02-01T00:00:00+09:00",
    tags: ["포토카드"],
    isLike: true,
  },
  {
    id: 4,
    placeName: "피오니 홍대점",
    artists: ["윤정한"],
    eventType: "카페",
    address: "서울 마포구 독막로7길 51",
    startDate: "2024-01-25T00:00:00+09:00",
    endDate: "2024-01-29T00:00:00+09:00",
    tags: ["포토카드"],
    isLike: true,
  },
  {
    id: 5,
    placeName: "테일러커피 서교점",
    artists: ["윤정한"],
    eventType: "카페",
    address: "서울 마포구 와우산로27길 7",
    startDate: "2024-02-01T00:00:00+09:00",
    endDate: "2024-02-05T00:00:00+09:00",
    tags: ["포토카드"],
    isLike: true,
  },
  {
    id: 6,
    placeName: "어반플랜트 합정",
    artists: ["윤정한"],
    eventType: "카페",
    address: "서울 마포구 독막로4길 3",
    startDate: "2024-01-24T00:00:00+09:00",
    endDate: "2024-01-26T00:00:00+09:00",
    tags: ["포토카드"],
    isLike: true,
  },
  {
    id: 2,
    placeName: "지디파크",
    artists: ["김정우"],
    eventType: "카페",
    address: "서울 강서구 양천로27길 167 SH빌딩",
    startDate: "2024-01-26T00:00:00+09:00",
    endDate: "2024-01-26T00:00:00+09:00",
    tags: ["포토카드"],
    isLike: true,
  },
  {
    id: 3,
    placeName: "탐앤탐스 더클래식압구정로데오점",
    artists: ["김민지"],
    eventType: "카페",
    address: "서울 강남구 선릉로 823 한양타운 1층 (우)06018",
    startDate: "2024-01-26T00:00:00+09:00",
    endDate: "2024-01-28T00:00:00+09:00",
    tags: ["포토카드"],
    isLike: true,
  },
];
