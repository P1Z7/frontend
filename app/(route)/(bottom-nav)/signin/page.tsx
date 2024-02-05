"use client";

import { getServerSession } from "next-auth";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
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
  const session = useSession();
  const { formSection, handleEnterNext } = useEnterNext();

  const { control, handleSubmit } = useForm(SIGNIN_DEFAULT);

  const handleSignin: SubmitHandler<DefaultValues> = async ({ email, password }) => {
    const a = await signIn("credentials", { email, password, redirect: false });
    console.log(a);
  };

  const handleOAuth = (provider: string) => () => {
    signIn(provider);
  };

  return (
    <div className="flex flex-col p-12">
      <form ref={formSection} onSubmit={handleSubmit(handleSignin)} className="flex flex-col gap-24 py-60">
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
        <button className={`"bg-black text-white flex-grow rounded-sm px-16 py-12 text-16`}>로그인</button>
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
        <div className="flex flex-col gap-8 text-16">
          <p>로그인 확인</p>
          <p>이메일: {session.data?.user.email}</p>
          <p>이름: {session.data?.user.name}</p>
          <div className="flex">
            프로필이미지:
            <Image src={session.data?.user.image || ""} width={80} height={80} alt="" className="rounded-full object-cover" />
          </div>
          <p>액세스토큰: {session.data?.accessToken}</p>
          <p>리프레쉬토큰: {session.data?.refreshToken}</p>
        </div>
        <button onClick={() => signOut()} className="bg-gray-50 p-16 text-16">
          로그아웃
        </button>
      </div>
    </div>
  );
};
export default SignInPage;
