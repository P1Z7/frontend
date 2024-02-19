"use client";

import FadingDot from "@/(route)/(bottom-nav)/signin/_components/FadingDot";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { instance } from "@/api/api";
import { setSession } from "@/store/session/cookies";
import Logo from "@/public/icon/logo.svg";
import KakaoLogo from "@/public/icon/logo_kakao.svg";
import NaverLogo from "@/public/icon/logo_naver.svg";

const OAuth = () => {
  const router = useRouter();
  const url = new URL(window.location.href);
  const code = url.searchParams.get("code")!;
  const signinMethod = url.pathname.split("/").pop()!;

  const handleOAuth = async () => {
    try {
      const res = await instance.post(`/auth`, { code, signinMethod, email: "", password: "" });

      setSession({ isAuth: true, user: res });
      toast(`${signinMethod} 계정으로 연동 되었습니다. ${res.nickName}님`, {
        className: "text-16 font-600",
      });
      router.push("/");
    } catch {
      toast("네트워크 오류! 다시 시도해 주십시오.", {
        className: "text-16 font-600",
      });
      router.push("/signin");
    }
  };

  useEffect(() => {
    handleOAuth();
  }, []);

  const SocialLogo = () => {
    if (signinMethod === "kakao") {
      return <KakaoLogo />;
    }
    if (signinMethod === "naver") {
      return <NaverLogo fill="black" />;
    }
  };

  return (
    <div className="flex-center fixed bottom-0 left-0 right-0 top-0 z-floating gap-12 bg-white-black">
      <SocialLogo />
      <FadingDot />
      <Logo />
    </div>
  );
};

export default OAuth;
