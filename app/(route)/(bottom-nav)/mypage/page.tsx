"use client";

import { Suspense } from "react";
import Tabs from "@/components/Tabs";
import DottedLayout from "@/components/layout/DottedLayout";
import { useAuth } from "@/hooks/useAuth";
import UserProfile from "./_components/UserProfile";
import MyArtistTab from "./_components/tab/MyArtistTab";
import MyEventTab from "./_components/tab/MyEventTab";
import MyReviewTab from "./_components/tab/MyReviewTab";

const MyPage = () => {
  const session = useAuth("/signin");
  if (!session) {
    return <Suspense />;
  }

  const {
    user: { userId },
  } = session;

  return (
    <DottedLayout type="mypage">
      <div className="flex w-full flex-col gap-24 pb-72 pc:flex-row pc:items-start pc:pt-48">
        <UserProfile session={session} />
        <div className="pc:w-[83.4rem]">
          <Tabs names={["행사", "아티스트", "후기"]} narrow>
            <MyEventTab userId={userId} />
            <MyArtistTab userId={userId} />
            <MyReviewTab userId={userId} />
          </Tabs>
        </div>
      </div>
    </DottedLayout>
  );
};

export default MyPage;

const MOCK_USER_INFO = {
  nickName: "민정사랑해",
  email: "iloveminjeong@mail.com",
  profileImg: null,
};
