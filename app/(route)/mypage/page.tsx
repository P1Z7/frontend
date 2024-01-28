"use client";

import Tabs from "@/components/Tabs";
import SettingHeader from "../setting/_components/SettingHeader";
import UserProfile from "./_components/UserProfile";

const MOCK_USER_INFO = {
  nickName: "민정사랑해",
  email: "iloveminjeong@mail.com",
  profileImg: null,
};

const MyPage = () => {
  return (
    <div className="flex flex-col gap-24 p-16">
      <div className="flex items-center gap-8 self-start pb-20">
        <SettingHeader />
      </div>
      <UserProfile data={MOCK_USER_INFO} />
      <Tabs names={["아티스트", "내 후기"]}>
        <></>
        <></>
      </Tabs>
    </div>
  );
};

export default MyPage;
