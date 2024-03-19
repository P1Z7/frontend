"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import useBottomSheet from "@/hooks/useBottomSheet";
import SettingList from "./SettingList";

const MyPageBottomSheet = dynamic(() => import("@/components/bottom-sheet/MyPageBottomSheet"), { ssr: false });

const UserProfile = () => {
  const { bottomSheet, openBottomSheet, closeBottomSheet, refs } = useBottomSheet();
  const { session } = useAuth();

  return (
    <div className="flex items-center justify-between px-20 pt-44 pc:sticky pc:top-40 pc:h-fit pc:w-[26.2rem] pc:flex-col pc:gap-28">
      <div className="flex items-center justify-center gap-12 pc:flex-col">
        <div className="relative h-56 w-56 pc:h-80 pc:w-80">
          <Image
            src={session?.user.profileImage ? session?.user.profileImage : "/icon/no-profile.svg"}
            alt={`${session?.user.nickName}님의 프로필 사진`}
            fill
            sizes="100%"
            className="rounded-full object-cover"
            priority
          />
        </div>
        <div className="flex h-56 flex-col justify-center gap-4 pc:items-center">
          <p className="text-16 font-600 pc:text-20">{session?.user.nickName}</p>
          <p className="font-12 font-500 text-gray-400 pc:text-14">{session?.user.email}</p>
        </div>
      </div>
      <section className="mx-20 hidden w-full rounded-lg border border-gray-50 pc:block">
        <SettingList isOpener={session?.user.signupMethod === "opener"} />
      </section>
      <button onClick={() => openBottomSheet("mypage")} className="pc:hidden">
        <Image src="/icon/kebab-black.svg" width={24} height={25} alt="계정 정보 수정하기" />
      </button>
      {bottomSheet === "mypage" && <MyPageBottomSheet closeBottomSheet={closeBottomSheet} refs={refs} isOpener={session?.user.signupMethod === "opener"} />}
    </div>
  );
};

export default UserProfile;
