"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import MetaTag from "@/components/MetaTag";
import { useStore } from "@/store/index";
import { getSession } from "@/store/session/cookies";
import { META_TAG } from "@/constants/metaTag";
import ArtistReqList from "./_components/ArtistReqList";
import EventClaimList from "./_components/EventClaimList";
import EventList from "./_components/EventList";
import OptionList from "./_components/OptionList";
import ReviewClaimList from "./_components/ReviewClaimList";

const RENDER_ADMIN = {
  "선택 화면": <OptionList />,
  "아티스트 요청 목록": <ArtistReqList />,
  "리뷰 신고 목록": <ReviewClaimList />,
  "이벤트 신고 목록": <EventClaimList />,
  "행사 삭제": <EventList />,
};

const Admin = () => {
  const router = useRouter();
  const session = getSession();
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const { isAuth, setIsAuth, option, setOption } = useStore((state) => ({
    isAuth: state.isAdminAuth,
    setIsAuth: state.setIsAdminAuth,
    option: state.adminOption,
    setOption: state.setAdminOption,
  }));
  const { register, getValues } = useForm();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (process.env.NEXT_PUBLIC_ADMIN_PW === getValues("adminPw")) setIsAuth(true);
  };

  useEffect(() => {
    if (session?.user.userId === process.env.NEXT_PUBLIC_ADMIN_USERID) {
      setIsAdminLogin(true);
    } else router.replace("/404");
  }, []);

  return (
    <>
      <MetaTag title={META_TAG.admin.title} description={META_TAG.admin.description} noFollow />
      {isAdminLogin && (
        <div className="relative flex h-[calc(100vh-7.2rem)] items-center justify-center bg-black-white px-20 pb-12 pt-56 text-14 text-white-white pc:h-[calc(100vh-6.4rem)]">
          {isAuth ? (
            <>
              {option !== "선택 화면" && (
                <button className="absolute left-20 top-20" onClick={() => setOption("선택 화면")}>
                  뒤로가기
                </button>
              )}
              {RENDER_ADMIN[option]}
            </>
          ) : (
            <form className="flex flex-col items-center gap-16" onSubmit={handleSubmit}>
              <p className="flex flex-col items-center gap-4">
                <span className="text-20 font-600 text-red">WARNING!</span>
                인증이 필요한 페이지입니다.
              </p>
              <input {...register("adminPw")} type="text" className="rounded-sm bg-gray-50 p-12 text-gray-800" />
              <button type="submit" className="hover:text-red">
                확인
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
};

export default Admin;
