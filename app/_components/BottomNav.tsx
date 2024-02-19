"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactElement, cloneElement, useEffect, useState } from "react";
import { useSession } from "@/store/session/cookies";
import PostIcon from "@/public/icon/add-outline.svg";
import HomeIcon from "@/public/icon/home.svg";
import SearchIcon from "@/public/icon/search_black.svg";

const BottomNav = () => {
  const pathname = usePathname();
  const session = useSession();
  const [profileImage, setProfileImage] = useState("");

  const navButtons = [
    { href: "/", icon: <HomeIcon />, label: "홈" },
    { href: "/search", icon: <SearchIcon />, label: "둘러보기" },
    { href: "/post", icon: <PostIcon />, label: "등록하기" },
    {
      href: "/mypage",
      icon: <Image src={profileImage || "/icon/no-profile.svg"} alt="프로필 이미지" width={24} height={24} className="h-24 w-24 rounded-full object-cover" />,
      label: "마이페이지",
    },
  ];
  useEffect(() => {
    if (session?.user.profileImage) {
      setProfileImage(session?.user.profileImage);
      return;
    }
    setProfileImage("");
  }, [session]);

  return (
    <nav className="fixed bottom-0 left-0 z-nav flex h-72 w-full items-center justify-evenly gap-28 border-t border-gray-50 bg-white-black py-8 shadow-top pc:hidden">
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
  const clonedIcon = cloneElement(icon, {
    stroke: isActive ? "#FF50AA" : "#494F5A",
  });

  return (
    <Link href={href} className={"flex w-60 flex-col items-center gap-8"}>
      {clonedIcon}
      <p className={`${isActive ? "text-main-pink-500" : "text-gray-700"} text-12`}>{label}</p>
    </Link>
  );
};

export default BottomNav;
