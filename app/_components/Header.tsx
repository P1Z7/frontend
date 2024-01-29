"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import leftArrow from "@/public/icon/left-arrow.svg";

const TITLE: { [a: string]: string } = {
  "/setting/password": "비밀번호 변경",
  "/setting/profile": "프로필 수정",
  "/setting/favorite": "좋아하는 아티스트 수정",
  "/mypage": "마이페이지",
};

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <button onClick={() => router.back()}>
        <Image src={leftArrow} alt="뒤로가기 버튼" />
      </button>
      <h1 className="text-18 font-900">{TITLE[pathname]}</h1>
    </>
  );
};
export default Header;
