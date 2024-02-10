"use client";

import FeelMyRhythm from "@/(route)/(bottom-nav)/signin/_components/Confetti";
import LoadingDot from "@/(route)/(bottom-nav)/signin/_components/LoadingDot";
import { Api } from "app/_api/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "@/components/button";
import InputText from "@/components/input/InputText";
import useEnterNext from "@/hooks/useEnterNext";
import { ERROR_MESSAGES, REG_EXP } from "@/utils/signupValidation";
import ArrowLeft from "@/public/icon/arrow-left_lg.svg";
import Logo from "@/public/icon/logo.svg";
import GoogleLogo from "@/public/icon/logo_google.svg";
import KakaoLogo from "@/public/icon/logo_kakao.svg";

const SIGNIN_DEFAULT = {
  mode: "onBlur",
  defaultValues: {
    email: "",
    password: "",
  },
} as const;

type DefaultValues = (typeof SIGNIN_DEFAULT)["defaultValues"];

const SignInPage = () => {
  const router = useRouter();
  const { formSection, handleEnterNext } = useEnterNext();

  const { control, handleSubmit, formState, setError, watch } = useForm(SIGNIN_DEFAULT);
  const [submitState, setSubmitState] = useState({ isLoading: false, isError: false });

  const handleSignin: SubmitHandler<DefaultValues> = ({ email, password }) => {
    setSubmitState((prev) => ({ ...prev, isLoading: true }));
    setTimeout(async () => {
      const instance = new Api();
      const signinData = {
        email,
        password,
        signinMethod: "opener",
      };

      try {
        const res = await instance.post("/auth", signinData);
        if (res.error) {
          throw new Error(res.error);
        }
        setSubmitState((prev) => ({ ...prev, isError: false }));
        toast.custom(<FeelMyRhythm />, {
          className: "z-popup",
        });
        toast("어서오세요! 김하늘님", {
          className: "text-16 font-600",
        });
        router.push("/");
      } catch (e: any) {
        setSubmitState((prev) => ({ ...prev, isError: true }));
        if (e.message === "Not Founded") {
          setError("email", {
            message: (
              <>
                가입 이력이 없는 이메일입니다.
                <Link href={`/signup?email=${watch("email")}`} scroll={false} className="ml-4 underline">
                  회원가입하기
                </Link>
              </>
            ) as unknown as string,
          });
        }
        if (e.message === "password not valid") {
          setError("password", { message: "비밀번호가 일치하지 않습니다." });
        }
      } finally {
        setSubmitState((prev) => ({ ...prev, isLoading: false }));
      }
    }, 1000);
  };
  const handleOAuth = (provider: string) => () => {};

  return (
    <>
      <header className="flex h-72 w-full justify-between bg-white-white px-20 pb-12 pt-36">
        <button onClick={() => router.back()}>
          <ArrowLeft />
        </button>
      </header>
      <div className="flex-center flex-col px-20 pt-80">
        <Link href="/">
          <Logo />
        </Link>
        <form ref={formSection} onSubmit={handleSubmit(handleSignin)} className="flex-center mt-40 w-full flex-col pb-16">
          <InputText
            name="email"
            placeholder="example@opener.com"
            control={control}
            onKeyDown={handleEnterNext}
            rules={{ required: ERROR_MESSAGES.email.emailField, pattern: { value: REG_EXP.CHECK_EMAIL, message: ERROR_MESSAGES.email.emailPattern } }}
            noButton
          />
          <InputText
            name="password"
            type="password"
            placeholder="8자 이상 입력해주세요."
            control={control}
            rules={{ required: ERROR_MESSAGES.password.passwordField, pattern: { value: REG_EXP.CHECK_PASSWORD, message: ERROR_MESSAGES.password.passwordPattern } }}
            onKeyDown={handleEnterNext}
          />
          <div className={`mt-16 overflow-hidden transition-all ${submitState.isLoading ? "w-4/5" : "w-full"}`}>
            <Button isDisabled={!formState.isValid || !!formState.errors.email || !!formState.errors.password || submitState.isLoading}>
              <div className="relative h-full w-full">
                <span className={`absolute w-max transition-all ${formState.isSubmitted ? "top-48" : "absolute-center"}`}>로그인</span>
                <span className={`absolute w-max transition-all ${submitState.isLoading ? "absolute-center" : "-top-48"}`}>
                  <LoadingDot />
                </span>
                <span className={`absolute w-max transition-all ${submitState.isLoading ? "top-48" : formState.isSubmitted ? "absolute-center" : "top-48"}`}>
                  {submitState.isError ? "다시 로그인하기" : "성공!"}
                </span>
              </div>
            </Button>
          </div>
        </form>
        <div className="flex-center mb-56 gap-20 text-14 font-500 text-gray-500">
          <Link href={`/signup?email=${watch("email")}`} scroll={false}>
            회원가입
          </Link>
          <div className="h-16 border" />
          <Link href="">비밀번호 찾기</Link>
        </div>
        <div className="flex w-full flex-col gap-20">
          <button onClick={handleOAuth("kakao")} className="flex-center w-full gap-8 rounded-sm bg-[#FEE500] py-16 text-16 font-500">
            <KakaoLogo />
            <p>카카오 계정으로 로그인</p>
          </button>
          <button onClick={handleOAuth("google")} className="flex-center w-full gap-8 rounded-sm bg-gray-50 py-16 text-16 font-500">
            <GoogleLogo />
            <p>Google 계정으로 로그인</p>
          </button>
        </div>
      </div>
    </>
  );
};
export default SignInPage;
