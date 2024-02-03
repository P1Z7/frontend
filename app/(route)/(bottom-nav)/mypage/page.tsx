"use client";

import { MOCK } from "app/_constants/mock";
import Tabs from "@/components/Tabs";
import UserProfile from "./_components/UserProfile";
import ArtistTab from "./_components/tab/ArtistTab";
import EventTab from "./_components/tab/EventTab";
import MyReviewTab from "./_components/tab/MyReviewTab";

const MyPage = () => {
  return (
    <div className="flex w-360 flex-col gap-24 pb-72">
      <UserProfile data={MOCK_USER_INFO} />
      <Tabs names={["내 행사", "아티스트", "내 후기"]}>
        <EventTab scheduleData={mockScheduleData} />
        <ArtistTab data={MOCK} />
        <MyReviewTab reviewList={REVIEWS} />
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

export interface MyReviewProps {
  place: string;
  public: boolean;
  rate: boolean;
  description: string;
  images: string[];
  like: number;
}
// 데이터베이스 구조에 따라 사라질 타입이라 해당 파일에 선언

const REVIEWS: MyReviewProps[] = [
  {
    place: "지유가오카핫초메 압구정로데오점",
    public: true,
    rate: true,
    description: "메뉴도 진짜 맛있고 특전도 너무 예뻐요. KTX타고 3시간 걸려서 갔는데 후회 없습니다. 3일차 오후라서 포카 없을까봐 걱정했는데 다행히 수량 넉넉해서 다 받았어요.",
    images: [
      "https://thumb.mtstarnews.com/06/2023/09/2023090715013844673_1.jpg/dims/optimize",
      "https://thumb.mtstarnews.com/06/2023/09/2023090715013844673_1.jpg/dims/optimize",
      "https://thumb.mtstarnews.com/06/2023/09/2023090715013844673_1.jpg/dims/optimize",
      "https://thumb.mtstarnews.com/06/2023/09/2023090715013844673_1.jpg/dims/optimize",
    ],
    like: 2,
  },
  {
    place: "앤디스커피 홍대점",
    public: false,
    rate: false,
    description: "사람 너무 많아요 특전 다나갔습니다 가실분들 참고",
    images: [
      "https://thumb.mtstarnews.com/06/2023/09/2023090715013844673_1.jpg/dims/optimize",
      "https://thumb.mtstarnews.com/06/2023/09/2023090715013844673_1.jpg/dims/optimize",
      "https://thumb.mtstarnews.com/06/2023/09/2023090715013844673_1.jpg/dims/optimize",
      "https://thumb.mtstarnews.com/06/2023/09/2023090715013844673_1.jpg/dims/optimize",
    ],
    like: 0,
  },
];

export interface ScheduleDataProps {
  id: number;
  placeName: string;
  artistName: string;
  eventType: "카페";
  address: string;
  startDate: string;
  endDate: string;
  eventImage: string;
  gifts: ["포토카드"];
}

const mockScheduleData: ScheduleDataProps[] = [
  {
    id: 1,
    placeName: "윤정한 카페",
    artistName: "윤정한",
    eventType: "카페",
    address: "마포구",
    startDate: "2024-01-28T00:00:00+09:00",
    endDate: "2024-02-01T00:00:00+09:00",
    eventImage: "",
    gifts: ["포토카드"],
  },
  {
    id: 2,
    placeName: "김정우 카페",
    artistName: "김정우",
    eventType: "카페",
    address: "마포구",
    startDate: "2024-01-26T00:00:00+09:00",
    endDate: "2024-01-26T00:00:00+09:00",
    eventImage: "",
    gifts: ["포토카드"],
  },
  {
    id: 3,
    placeName: "김민지 카페",
    artistName: "김민지",
    eventType: "카페",
    address: "마포구",
    startDate: "2024-01-26T00:00:00+09:00",
    endDate: "2024-01-28T00:00:00+09:00",
    eventImage: "",
    gifts: ["포토카드"],
  },
];
