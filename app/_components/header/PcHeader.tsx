"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactElement, cloneElement, useEffect, useState } from "react";
import { useSession } from "@/store/session/cookies";
import PostIcon from "@/public/icon/add-outline.svg";
import HomeIcon from "@/public/icon/home.svg";
import LogoIcon from "@/public/icon/logo.svg";
import SearchIcon from "@/public/icon/search_black.svg";

const PcHeader = () => {
  const pathname = usePathname();
  const session = useSession();
  const [profileImage, setProfileImage] = useState("");

  const navButtons = [
    { href: "/", icon: <HomeIcon />, label: "홈" },
    { href: "/search", icon: <SearchIcon />, label: "둘러보기" },
    { href: "/post", icon: <PostIcon />, label: "등록하기" },
  ];
  useEffect(() => {
    if (session?.user.profileImage) {
      setProfileImage(session?.user.profileImage);
      return;
    }
    setProfileImage("");
  }, [session]);

  return (
    <header className="sticky top-0 z-nav hidden h-72 w-full bg-white-black px-24 pc:block">
      <div className="mx-auto flex h-full max-w-[104rem] items-center justify-between">
        <Link href="/" scroll={false}>
          <LogoIcon />
        </Link>
        <div className="flex gap-16">
          {navButtons.map((item, index) => (
            <NavButton key={index} href={item.href} icon={item.icon} label={item.label} isActive={pathname === item.href} />
          ))}
          {session ? (
            <NavButton
              href="/mypage"
              icon={<Image src={profileImage || "/icon/no-profile.svg"} alt="프로필 이미지" width={24} height={24} className="h-24 w-24 rounded-full object-cover" />}
              label="마이페이지"
              isActive={pathname === "/mypage"}
            />
          ) : (
            <Link
              href="/signin"
              scroll={false}
              className="flex-center h-full w-[12.2rem] rounded-sm border border-main-pink-300 bg-main-pink-50 p-8 text-16 font-600 text-main-pink-white"
            >
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default PcHeader;

interface NavButtonProps {
  href: string;
  icon: ReactElement;
  label: string;
  isActive: boolean;
}

const NavButton = ({ href, icon, label, isActive }: NavButtonProps) => {
  const clonedIcon = cloneElement(icon, {
    stroke: isActive ? "#FF50AA" : "#494F5A",
  });

  return (
    <Link href={href} scroll={false} className="flex h-full w-[12.2rem] items-center gap-8 p-8">
      {clonedIcon}
      <span className={`text-16 font-500 ${isActive ? "text-main-pink-500" : "text-gray-700"}`}>{label}</span>
    </Link>
  );
};
