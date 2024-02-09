"use client";

import FeelMyRhythm from "@/(route)/(bottom-nav)/signin/_components/Confetti";
import { Api } from "app/_api/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "@/components/button";
import InputText from "@/components/input/InputText";
import useEnterNext from "@/hooks/useEnterNext";
import { ERROR_MESSAGES, REG_EXP } from "@/utils/signupValidation";
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

  const { control, handleSubmit, formState } = useForm(SIGNIN_DEFAULT);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignin: SubmitHandler<DefaultValues> = ({ email, password }) => {
    setIsLoading(true);
    setTimeout(async () => {
      const instance = new Api();
      const signinData = {
        email,
        password,
        signinMethod: "opener",
      };
      const res = await instance.post("/auth", signinData);
      if (res) {
        setIsLoading(false);
        toast.custom(<FeelMyRhythm />);
        toast("어서오세요! 김하늘님", {
          className: "text-16 font-600",
        });
        router.push("/");
      }
    }, 1000);
  };
  const handleOAuth = (provider: string) => () => {};

  return (
    <div className="flex flex-col p-12">
      <form ref={formSection} onSubmit={handleSubmit(handleSignin)} className="flex-center flex-col gap-24 py-60">
        <InputText
          name="email"
          placeholder="example@opener.com"
          control={control}
          onKeyDown={handleEnterNext}
          rules={{ required: ERROR_MESSAGES.email.emailField, pattern: { value: REG_EXP.CHECK_EMAIL, message: ERROR_MESSAGES.email.emailPattern } }}
        >
          이메일
        </InputText>
        <InputText
          name="password"
          type="password"
          placeholder="8자 이상 입력해주세요."
          control={control}
          rules={{ required: ERROR_MESSAGES.password.passwordField, pattern: { value: REG_EXP.CHECK_PASSWORD, message: ERROR_MESSAGES.password.passwordPattern } }}
          onKeyDown={handleEnterNext}
        >
          비밀번호
        </InputText>
        <div className={`overflow-hidden transition-all ${isLoading ? "w-4/5" : "w-full"}`}>
          <Button isDisabled={!formState.isValid || isLoading}>
            <div className="relative h-full w-full">
              <span className={`before absolute w-max transition-all ${formState.isSubmitted ? "top-48" : "absolute-center"}`}>로그인</span>
              <span className={`loading absolute w-max transition-all ${isLoading ? "absolute-center" : "-top-48"}`}>
                <svg width={25} viewBox="0 0 20 20">
                  <circle className="animate-[bounce_1s_infinite]" color="#ffffff" cx="2.2" cy="12" r="1.6" />
                  <circle className="animate-[bounce_1s_infinite_100ms]" color="#ffffff" cx="9.5" cy="12" r="1.6" />
                  <circle className="animate-[bounce_1s_infinite_200ms]" color="#ffffff" cx="16.8" cy="12" r="1.6" />
                </svg>
              </span>
              <span className={`success absolute w-max transition-all ${isLoading ? "top-48" : formState.isSubmitSuccessful ? "absolute-center" : "top-48"}`}>성공!</span>
            </div>
          </Button>
        </div>
      </form>
      <div className="flex flex-col gap-20">
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
  );
};
export default SignInPage;
