"use client";

import LoadingDot from "@/(route)/signin/_components/LoadingDot";
import SigninDottedLayout from "@/(route)/signin/_components/SigninDottedLayout";
import { instance } from "app/_api/api";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import MetaTag from "@/components/MetaTag";
import Button from "@/components/button";
import InputText from "@/components/input/InputText";
import useEnterNext from "@/hooks/useEnterNext";
import { setCookies, setSession } from "@/store/session/cookies";
import { ERROR_MESSAGES, REG_EXP } from "@/utils/signupValidation";
import { openToast } from "@/utils/toast";
import { SHOT_SIGNIN } from "@/constants/confetti";
import { META_TAG } from "@/constants/metaTag";
import { OAUTH } from "@/constants/oauth";
import KakaoLogo from "@/public/icon/logo_kakao.svg";
import NaverLogo from "@/public/icon/logo_naver.svg";

const FeelMyRhythm = dynamic(() => import("@/(route)/signin/_components/Confetti"), { ssr: false });

const SIGNIN_DEFAULT = {
  mode: "onBlur",
  defaultValues: {
    email: "",
    password: "",
  },
} as const;

type DefaultValues = (typeof SIGNIN_DEFAULT)["defaultValues"];

const SignInPage = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { formSection, handleEnterNext } = useEnterNext();

  const { control, handleSubmit, formState, setError, watch } = useForm(SIGNIN_DEFAULT);
  const [submitState, setSubmitState] = useState({ isLoading: false, isError: false });

  const handleSignin: SubmitHandler<DefaultValues> = ({ email, password }) => {
    setSubmitState({ isLoading: true, isError: false });
    setTimeout(async () => {
      const signinData = {
        email,
        password,
        signinMethod: "opener",
      };

      try {
        const res = await instance.post("/auth", signinData);
        setSubmitState((prev) => ({ ...prev, isError: false }));

        toast.custom(<FeelMyRhythm shotList={SHOT_SIGNIN} location={{ y: 0.5 }} />, {
          className: "z-popup",
        });
        openToast.success(`어서오세요! ${res.nickName}님`);

        setSession({ isAuth: true, user: res });

        if (pathname === "/signin") {
          router.push("/");
          router.refresh();
          return;
        }

        router.refresh();
      } catch (e: any) {
        const message = e.message.split("/")[0] as string;
        setSubmitState((prev) => ({ ...prev, isError: true }));
        if (message === "Not Founded") {
          setError("email", {
            message: (
              <>
                가입 이력이 없는 이메일입니다.
                <Link href={"/signup"} scroll={false} className="ml-4 underline">
                  회원가입하기
                </Link>
              </>
            ) as unknown as string,
          });
        }
        if (message === "password not valid") {
          setError("password", { message: "비밀번호가 일치하지 않습니다." });
        }
      } finally {
        setSubmitState((prev) => ({ ...prev, isLoading: false }));
      }
    }, 1000);
  };

  return (
    <>
      <MetaTag title={META_TAG.signin["title"]} description={META_TAG.signin["description"]} />
      <SigninDottedLayout size="wide">
        <div className="flex-center m-auto max-w-400 grow flex-col rounded-lg px-32 py-64 pt-100 pc:mt-100 pc:w-[408px] pc:shadow-postBox">
          <Link href="/">
            <Image src="/icon/logo-underline.svg" alt="로고 이미지" width={127} height={38} />
          </Link>
          <form ref={formSection} onSubmit={handleSubmit(handleSignin)} className="flex-center mt-40 w-full flex-col pb-16">
            <InputText
              name="email"
              placeholder="이메일ID"
              control={control}
              autoComplete="email"
              onKeyDown={handleEnterNext}
              rules={{ required: ERROR_MESSAGES.email.emailField, pattern: { value: REG_EXP.CHECK_EMAIL, message: ERROR_MESSAGES.email.emailPattern } }}
              noButton
            />
            <InputText
              name="password"
              type="password"
              placeholder="비밀번호"
              control={control}
              rules={{ required: ERROR_MESSAGES.password.passwordField, pattern: { value: REG_EXP.CHECK_PASSWORD, message: ERROR_MESSAGES.password.passwordPattern } }}
              onKeyDown={handleEnterNext}
            />
            <div className={`mt-32 overflow-hidden transition-all ${submitState.isLoading ? "w-4/5" : "w-full"} ${submitState.isError ? "animate-[brrr_0.2s_0.2s]" : ""}`}>
              <Button isSubmit isDisabled={!formState.isValid || !!formState.errors.email || !!formState.errors.password || submitState.isLoading}>
                <div className="relative h-full w-full" id="signin_opener">
                  <span className={`absolute w-max transition-all ${formState.isSubmitted ? "top-48" : "absolute-center"}`} id="signin_opener">
                    로그인
                  </span>
                  <span className={`absolute w-max transition-all ${submitState.isLoading ? "absolute-center" : "-top-48"}`}>
                    <LoadingDot />
                  </span>
                  <span className={`absolute w-max transition-all ${submitState.isLoading ? "top-48" : formState.isSubmitted ? "absolute-center" : "top-48"}`} id="signin_opener">
                    {submitState.isError ? "다시 로그인하기" : "성공!"}
                  </span>
                </div>
              </Button>
            </div>
          </form>
          <div className="flex-center mb-56 gap-20 text-14 font-500 text-gray-500">
            <Link href={"/signup"} scroll={false}>
              회원가입
            </Link>
            <div className="h-16 border" />
            <Link href="/reset-password">비밀번호 찾기</Link>
          </div>
          <div className="flex w-full flex-col gap-20">
            <Link
              href={OAUTH.kakao()}
              onClick={() => setCookies("pathname", pathname, { path: "/" })}
              className="flex-center w-full gap-8 rounded-sm bg-[#FEE500] py-16 text-16 font-500"
              id="signin_kakao"
            >
              <KakaoLogo id="signin_kakao" />
              <p id="signin_kakao">카카오 계정으로 로그인</p>
            </Link>
            <Link
              href={OAUTH.naver()}
              onClick={() => setCookies("pathname", pathname, { path: "/" })}
              className="flex-center w-full gap-8 rounded-sm bg-[#03CF5D] py-16 text-16 font-500 text-white-white"
              id="signin_naver"
            >
              <NaverLogo fill="white" id="signin_naver" />
              <p className="signin_naver">네이버 계정으로 로그인</p>
            </Link>
          </div>
        </div>
      </SigninDottedLayout>
    </>
  );
};
export default SignInPage;
