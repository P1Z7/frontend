import Tabs from "@/components/Tabs";
import UserProfile from "./_components/UserProfile";
import MyArtistTab from "./_components/tab/MyArtistTab";
import MyEventTab from "./_components/tab/MyEventTab";
import MyReviewTab from "./_components/tab/MyReviewTab";

const MyPage = () => {
  return (
    <div className="flex w-full flex-col gap-24 pb-72">
      <UserProfile />
      <Tabs names={["행사", "아티스트", "후기"]}>
        <MyEventTab />
        <MyArtistTab />
        <MyReviewTab />
      </Tabs>
    </div>
  );
};

export default MyPage;
