"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import leftArrow from "@/public/icons/icon-leftarrow.svg";

const TITLE: { [a: string]: string } = {
  "/setting/password": "비밀번호 변경",
  "/setting/profile": "프로필 수정",
};

const SettingHeader = () => {
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
export default SettingHeader;
