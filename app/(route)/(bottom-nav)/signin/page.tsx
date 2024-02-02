"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import InputText from "@/components/input/InputText";
import useEnterNext from "@/hooks/useEnterNext";
import { ERROR_MESSAGES, REG_EXP } from "@/utils/signupValidation";
import GoogleLogo from "@/public/icon/logo_google.svg";

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
  console.log(session);
  const { formSection, handleEnterNext } = useEnterNext();

  const { formState, control, handleSubmit } = useForm(SIGNIN_DEFAULT);

  const handleSignin: SubmitHandler<DefaultValues> = async ({ email, password }) => {
    console.log(email, password);
  };

  return (
    <>
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
          control={control}
          rules={{ required: ERROR_MESSAGES.password.passwordField, pattern: { value: REG_EXP.CHECK_PASSWORD, message: ERROR_MESSAGES.password.passwordPattern } }}
          onKeyDown={handleEnterNext}
        >
          비밀번호
        </InputText>
        <button className={`"bg-black text-white flex-grow rounded-sm px-16 py-12 text-16`}>로그인</button>
      </form>
      <div>
        <button onClick={(e) => (e.preventDefault(), signIn("google"))} className="flex-center w-dvw gap-8 bg-gray-50 py-16 text-16">
          <GoogleLogo />
          <p>Google 계정으로 로그인</p>
        </button>
        <div className="flex flex-col gap-8 text-16">
          <p>구글 로그인 확인</p>
          <p>이메일: {session.data?.user?.email}</p>
          <p>이름: {session.data?.user?.name}</p>
          <div className="flex">
            프로필이미지:
            <Image src={session.data?.user?.image || ""} width={50} height={50} alt="" className="rounded-full" />
          </div>
        </div>
        <button onClick={() => signOut()} className="bg-gray-50 p-16 text-16">
          로그아웃
        </button>
      </div>
    </>
  );
};
export default SignInPage;
