"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { KeyboardEvent, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Alert from "@/components/Alert";
import InputText from "@/components/input/InputText";
import useEnterNext from "@/hooks/useEnterNext";
import { ERROR_MESSAGES, REG_EXP } from "@/utils/signupValidation";

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

  const { formState, control, handleSubmit } = useForm(SIGNIN_DEFAULT);

  const handleSignin: SubmitHandler<DefaultValues> = async ({ email, password }) => {
    console.log(email, password);
  };

  return (
    <form ref={formSection} onSubmit={handleSubmit(handleSignin)} className="flex flex-col gap-24 px-12 py-60">
      <InputText
        name="email"
        placeholder="example@opener.com"
        control={control}
        onKeyDown={handleEnterNext}
        horizontal
        required
        rules={{ required: ERROR_MESSAGES.email.emailField, pattern: { value: REG_EXP.CHECK_EMAIL, message: ERROR_MESSAGES.email.emailPattern } }}
      >
        이메일
      </InputText>
      <InputText
        name="password"
        type="password"
        placeholder="8자 이상 입력해주세요."
        control={control}
        onKeyDown={handleEnterNext}
        horizontal
        required
        rules={{ required: ERROR_MESSAGES.password.passwordField, pattern: { value: REG_EXP.CHECK_PASSWORD, message: ERROR_MESSAGES.password.passwordPattern } }}
      >
        비밀번호
      </InputText>
      <button className={`flex-grow rounded-sm bg-gray-900 px-16 py-12 text-16 text-white-black`}>로그인</button>
    </form>
  );
};
export default SignInPage;
