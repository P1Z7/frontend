import { cookies } from "next/headers";
import MetaTag from "@/components/MetaTag";
import Tabs from "@/components/Tabs";
import DottedLayout from "@/components/layout/DottedLayout";
import { META_TAG } from "@/constants/metaTag";
import UserProfile from "./_components/UserProfile";
import MyArtistTab from "./_components/tab/MyArtistTab";
import MyEventTab from "./_components/tab/MyEventTab";
import MyPostTab from "./_components/tab/MyPostTab";
import MyReviewTab from "./_components/tab/MyReviewTab";

const MYPAGE_TABLIST = ["행사", "아티스트", "후기", "게시글"];

const MyPage = () => {
  const session = JSON.parse(cookies().get("session")?.value ?? "");
  const userId = session?.user.userId ?? "";

  return (
    <>
      <MetaTag title={META_TAG.mypage["title"]} description={META_TAG.mypage["description"]} />
      <DottedLayout size="extrawide">
        <div className="flex min-h-screen w-full flex-col gap-24 pb-8  pc:relative pc:flex-row pc:items-start pc:pb-0 pc:pt-48">
          <UserProfile />
          <div className="h-full pc:w-[83.4rem]">
            <Tabs names={MYPAGE_TABLIST} isNarrow>
              <MyEventTab userId={userId} />
              <MyArtistTab userId={userId} />
              <MyReviewTab userId={userId} />
              <MyPostTab userId={userId} />
            </Tabs>
          </div>
        </div>
      </DottedLayout>
    </>
  );
};

export default MyPage;
