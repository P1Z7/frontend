"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactElement, cloneElement } from "react";
import PostIcon from "@/public/icon/add-outline.svg";
import HomeIcon from "@/public/icon/home.svg";
import SearchIcon from "@/public/icon/search_black.svg";

const MOCK_USER_INFO = {
  nickName: "민정사랑해",
  email: "iloveminjeong@mail.com",
  profileImg: null,
};

const BottomNav = () => {
  const pathname = usePathname();

  const navButtons = [
    { href: "/", icon: <HomeIcon />, label: "홈" },
    { href: "/search", icon: <SearchIcon />, label: "둘러보기" },
    { href: "/post", icon: <PostIcon />, label: "등록하기" },
    {
      href: "/mypage",
      icon: <Image src={MOCK_USER_INFO.profileImg ? MOCK_USER_INFO.profileImg : "/icon/no-profile.svg"} alt="프로필 이미지" width={24} height={24} />,
      label: "마이페이지",
    },
  ];

  return (
    <nav className="flex-center shadow-top fixed bottom-0 left-0 z-nav h-72 w-full gap-28 border-t border-gray-50 bg-white-black py-8">
      {navButtons.map((item, index) => (
        <NavButton key={index} href={item.href} icon={item.icon} label={item.label} isActive={pathname === item.href} />
      ))}
    </nav>
  );
};

interface NavItemProps {
  href: string;
  icon: ReactElement;
  label: string;
  isActive: boolean;
}

const NavButton = ({ href, icon, label, isActive }: NavItemProps) => {
  let clonedIcon = cloneElement(icon, {
    stroke: isActive ? "#FF50AA" : "#494F5A",
  });

  return (
    <Link href={href} className={`flex w-60 flex-col items-center gap-8`}>
      {clonedIcon}
      <p className={`${isActive ? "text-main-pink-500" : "text-gray-700"} text-12`}>{label}</p>
    </Link>
  );
};

export default BottomNav;
