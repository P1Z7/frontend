"use client";

import Tabs from "@/components/Tabs";
import DottedLayout from "@/components/layout/DottedLayout";
import { getSession } from "@/store/session/cookies";
import UserProfile from "./_components/UserProfile";
import MyArtistTab from "./_components/tab/MyArtistTab";
import MyEventTab from "./_components/tab/MyEventTab";
import MyReviewTab from "./_components/tab/MyReviewTab";

const MyPage = () => {
  const session = getSession();

  return (
    <DottedLayout size="extrawide">
      <div className="flex h-screen w-full flex-col gap-24 pb-72 pc:h-[calc(100vh-7.2rem)] pc:flex-row pc:items-start pc:pb-0 pc:pt-48">
        <UserProfile />
        <div className="h-full pc:w-[83.4rem]">
          <Tabs names={["행사", "아티스트", "후기"]} isNarrow>
            <MyEventTab userId={session?.user?.userId ?? ""} />
            <MyArtistTab userId={session?.user?.userId ?? ""} />
            <MyReviewTab userId={session?.user?.userId ?? ""} />
          </Tabs>
        </div>
      </div>
    </DottedLayout>
  );
};

export default MyPage;
