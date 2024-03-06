"use client";

import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Session, getSession } from "@/store/session/cookies";
import AddIcon from "@/public/icon/add-outline.svg";
import HamburgerIcon from "@/public/icon/hamburger.svg";
import LogoIcon from "@/public/icon/logo.svg";
import SearchIcon from "@/public/icon/search.svg";

const DEFAULT_PROFILE_SRC = "/icon/no-profile.svg";

const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const newSession = getSession();
  const [session, setSession] = useState<Session>();
  const profileHref = session ? "/mypage" : "/signin";
  const profileSrc = session?.user.profileImage ?? DEFAULT_PROFILE_SRC;

  useEffect(() => {
    if (!newSession) {
      setSession(undefined);
      return;
    }
    setSession(newSession);
  }, [newSession?.user.profileImage]);

  return (
    <>
      {isOpen && (
        <>
          <div className="animate-slideDown fixed top-72 z-floating flex w-full flex-col items-start gap-20 bg-white-black px-20 pb-24 pt-12">
            <Link href="/post" onClick={() => setIsOpen(false)} className="flex h-24 w-full items-center gap-12 text-16 font-500 text-gray-700">
              <AddIcon />새 행사 등록
            </Link>
            <Link href={profileHref} onClick={() => setIsOpen(false)} className="flex h-24 w-full items-center gap-12 text-16 font-500 text-gray-700">
              <div className="relative h-24 w-24 overflow-hidden rounded-full">
                <Image src={profileSrc} fill className="object-cover" alt="프로필 이미지" />
              </div>
              {session ? "마이페이지" : "로그인"}
            </Link>
          </div>
          <div onClick={() => setIsOpen(false)} className="fixed bottom-0 left-0 z-popup flex h-screen w-full items-end justify-center bg-gray-900 bg-opacity-70" />
        </>
      )}
      <header
        className={classNames("sticky top-0 z-popup flex h-72 w-full items-center justify-between bg-white-black px-20 pb-12 pt-32 pc:hidden", {
          "border-b border-gray-50": !isOpen,
        })}
      >
        <Link href="/">
          <LogoIcon />
        </Link>
        <div className="flex gap-12">
          <Link href="/search?sort=최신순">
            <SearchIcon width="24" height="24" stroke="#1C1E22" />
          </Link>
          <button onClick={() => setIsOpen((prev) => !prev)}>
            <HamburgerIcon />
          </button>
        </div>
      </header>
    </>
  );
};

export default MobileHeader;
