"use client";

import { usePathname, useRouter } from "next/navigation";
import ArrowLeft from "@/public/icon/arrow-left_lg.svg";

const TITLE: { [a: string]: string } = {
  "/setting/password": "비밀번호 변경",
  "/setting/profile": "프로필 수정",
  "/setting/favorite": "팔로우 아티스트 수정",
  "/my-artist-event": "좋아요한 아티스트의 새 행사",
  "/signup": "회원가입",
  "/post": "등록하기",
};

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="bg-white-white fixed left-0 top-0 flex h-72 w-360 gap-16 border-b border-gray-50 px-20 pb-12 pt-36">
      <button onClick={() => router.back()}>
        <ArrowLeft />
      </button>
      <h1 className="w-240 text-center text-16 font-500 text-gray-900">{TITLE[pathname]}</h1>
    </div>
  );
};
export default Header;
