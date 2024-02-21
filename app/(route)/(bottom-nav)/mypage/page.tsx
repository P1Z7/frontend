"use client";

import MetaTag from "@/components/MetaTag";
import Tabs from "@/components/Tabs";
import DottedLayout from "@/components/layout/DottedLayout";
import { TABLIST } from "@/store/mypage-tab/store";
import { getSession } from "@/store/session/cookies";
import { META_TAG } from "@/constants/metaTag";
import UserProfile from "./_components/UserProfile";
import MyArtistTab from "./_components/tab/MyArtistTab";
import MyEventTab from "./_components/tab/MyEventTab";
import MyReviewTab from "./_components/tab/MyReviewTab";

const MyPage = () => {
  const session = getSession();
  const userId = session?.user.userId ?? "";

  return (
    <>
      <MetaTag title={META_TAG.mypage["title"]} description={META_TAG.mypage["description"]} />
      <DottedLayout size="extrawide">
        <div className="flex h-screen w-full flex-col gap-24 pb-72 pc:h-[calc(100vh-7.2rem)] pc:flex-row pc:items-start pc:pb-0 pc:pt-48">
          <UserProfile />
          <div className="h-full pc:w-[83.4rem]">
            <Tabs names={TABLIST} isNarrow>
              <MyEventTab userId={userId} />
              <MyArtistTab userId={userId} />
              <MyReviewTab userId={userId} />
            </Tabs>
          </div>
        </div>
      </DottedLayout>
    </>
  );
};

export default MyPage;
