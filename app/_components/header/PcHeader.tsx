"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SearchInput from "@/components/input/SearchInput";
import { Session, getSession } from "@/store/session/cookies";
import AddIcon from "@/public/icon/add.svg";
import LogoIcon from "@/public/icon/logo.svg";

const DEFAULT_PROFILE_SRC = "/icon/no-profile.svg";

const PcHeader = () => {
  const router = useRouter();
  const newSession = getSession();
  const [session, setSession] = useState<Session>();
  const profileHref = session ? "/mypage" : "/signin";
  const profileSrc = session?.user.profileImage ?? DEFAULT_PROFILE_SRC;
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (!newSession) {
      setSession(undefined);
      return;
    }
    setSession(newSession);
  }, [newSession?.user.profileImage]);

  useEffect(() => {
    if (!keyword) {
      return;
    }
    router.push(`/search?sort=최신순&keyword=${keyword}`);
  }, [keyword]);

  return (
    <header className="sticky top-0 z-popup hidden h-64 w-full border-b border-gray-50 bg-white-black px-24 py-12 tablet:block">
      <div className="mx-auto flex h-full max-w-[104rem] items-center justify-between">
        <Link href="/" scroll={false} aria-label="홈페이지로 돌아갑니다.">
          <LogoIcon />
        </Link>
        <div className="flex items-center">
          <div className="w-320">
            <SearchInput setKeyword={setKeyword} placeholder="최애의 행사를 찾아보세요!" size="sm" href="/search?sort=최신순" />
          </div>
          <Link href={"/post"} className="flex-center ml-20 mr-16 h-40 w-100 rounded-full bg-main-pink-500 text-14 font-600 text-white-black">
            <AddIcon stroke="#FFF" width={20} height={20} viewBox="0 0 24 24" />
            행사 등록
          </Link>
          <Link href={profileHref} className="relative h-28 w-28 overflow-hidden rounded-full">
            <Image src={profileSrc} fill className="object-cover" alt="프로필 이미지" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default PcHeader;
