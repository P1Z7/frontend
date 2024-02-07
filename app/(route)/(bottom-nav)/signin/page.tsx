"use client";

import { Api } from "app/_api/api";
import { SubmitHandler, useForm } from "react-hook-form";
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
  const { formSection, handleEnterNext } = useEnterNext();

  const { control, handleSubmit, formState } = useForm(SIGNIN_DEFAULT);

  const handleSignin: SubmitHandler<DefaultValues> = async ({ email, password }) => {
    const instance = new Api();
    const signinData = {
      email,
      password,
      signinMethod: "opener",
    };
    const res = await instance.post("/auth", signinData);
    console.log(res);
  };

  const handleOAuth = (provider: string) => () => {};

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
        <Button isDisabled={!formState.isValid || formState.isSubmitting}>로그인</Button>
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
