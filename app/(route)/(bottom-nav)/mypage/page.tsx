"use client";

import { MOCK, MOCK_REVIEWS } from "app/_constants/mock";
import Header from "@/components/Header";
import Tabs from "@/components/Tabs";
import UserProfile from "./_components/UserProfile";
import ArtistTab from "./_components/tab/ArtistTab";
import MyReviewTab from "./_components/tab/MyReviewTab";

const MyPage = () => {
  return (
    <div className="flex flex-col gap-24 p-16">
      <div className="flex items-center gap-8 self-start pb-20">
        <Header />
      </div>
      <UserProfile data={MOCK_USER_INFO} />
      <Tabs names={["아티스트", "내 후기"]}>
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

// const REVIEWS: MyReviewProps[] = [
//   {
//     place: "지유가오카핫초메 압구정로데오점",
//     public: true,
//     rate: true,
//     description: "메뉴도 진짜 맛있고 특전도 너무 예뻐요. KTX타고 3시간 걸려서 갔는데 후회 없습니다. 3일차 오후라서 포카 없을까봐 걱정했는데 다행히 수량 넉넉해서 다 받았어요.",
//     images: [
//       "https://thumb.mtstarnews.com/06/2023/09/2023090715013844673_1.jpg/dims/optimize",
//       "https://thumb.mtstarnews.com/06/2023/09/2023090715013844673_1.jpg/dims/optimize",
//       "https://thumb.mtstarnews.com/06/2023/09/2023090715013844673_1.jpg/dims/optimize",
//       "https://thumb.mtstarnews.com/06/2023/09/2023090715013844673_1.jpg/dims/optimize",
//     ],
//     like: 2,
//   },
//   {
//     place: "앤디스커피 홍대점",
//     public: false,
//     rate: false,
//     description: "사람 너무 많아요 특전 다나갔습니다 가실분들 참고",
//     images: [
//       "https://thumb.mtstarnews.com/06/2023/09/2023090715013844673_1.jpg/dims/optimize",
//       "https://thumb.mtstarnews.com/06/2023/09/2023090715013844673_1.jpg/dims/optimize",
//       "https://thumb.mtstarnews.com/06/2023/09/2023090715013844673_1.jpg/dims/optimize",
//       "https://thumb.mtstarnews.com/06/2023/09/2023090715013844673_1.jpg/dims/optimize",
//     ],
//     like: 0,
//   },
// ];
