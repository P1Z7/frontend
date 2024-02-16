"use client";

import FadingDot from "@/(route)/(bottom-nav)/signin/_components/FadingDot";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { Api } from "@/api/api";
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
    const api = new Api();
    const res = await api.post(`/auth`, { code, signinMethod, email: "", password: "" });
    if (res.error) {
      toast("네트워크 오류! 다시 시도해 주십시오.", {
        className: "text-16 font-600",
      });
      router.push("/signin");
      return;
    }
    setSession({ isAuth: true, user: res });

    router.push("/");

    toast(`${signinMethod} 계정으로 연동 되었습니다. ${res.nickName}님`, {
      className: "text-16 font-600",
    });
  };

  useEffect(() => {
    handleOAuth();
  }, []);

  const SocialLogo = useCallback(() => {
    if (!signinMethod) {
      return <p className="text-16 font-600">소셜 로그인 중</p>;
    }
    if (signinMethod === "kakao") {
      return <KakaoLogo />;
    }
    if (signinMethod === "naver") {
      return <NaverLogo fill="black" />;
    }
  }, []);

  return (
    <div className="flex-center h-dvh w-dvw gap-12">
      <SocialLogo />
      <FadingDot />
      <Logo />
    </div>
  );
};

export default OAuth;
