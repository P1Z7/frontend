"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactElement, cloneElement } from "react";
import PostIcon from "@/public/icon/add-outline.svg";
import HomeIcon from "@/public/icon/home.svg";
import LogoIcon from "@/public/icon/logo.svg";
import SearchIcon from "@/public/icon/search_black.svg";
import UserIcon from "@/public/icon/user.svg";

// TODO: 로그인 여부에 따라 로그인 버튼 표시

const PcHeader = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-nav hidden h-72 w-full bg-white-black px-24 tablet:block">
      <div className="mx-auto flex h-full max-w-[104rem] items-center justify-between">
        <Link href="/">
          <LogoIcon />
        </Link>
        <div className="flex gap-16">
          <NavButton icon={<HomeIcon />} label="홈" href={"/"} isActive={pathname === "/"} />
          <NavButton icon={<SearchIcon />} label="둘러보기" href={"/search"} isActive={pathname === "/search"} />
          <NavButton icon={<PostIcon />} label="등록하기" href={"/post"} isActive={pathname === "/post"} />
          <NavButton icon={<UserIcon width={24} />} label="마이페이지" href={"/mypage"} isActive={pathname === "/mypage"} />
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
    <Link href={href} className="flex h-full w-[12.2rem] items-center gap-8 p-8">
      {clonedIcon}
      <span className={`text-16 font-500 ${isActive ? "text-main-pink-500" : "text-gray-700"}`}>{label}</span>
    </Link>
  );
};
