"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import InputText from "@/components/input/InputText";
import useEnterNext from "@/hooks/useEnterNext";
import { ERROR_MESSAGES, REG_EXP } from "@/utils/signupValidation";

const PWCHANGE_DEFAULT = {
  mode: "onBlur",
  defaultValues: {
    currentPw: "",
    newPw: "",
    newPwCheck: "",
  },
} as const;

type DefaultValues = (typeof PWCHANGE_DEFAULT)["defaultValues"];

const PasswordPage = () => {
  const { formSection, handleEnterNext } = useEnterNext();

  const { formState, control, handleSubmit, getValues } = useForm(PWCHANGE_DEFAULT);

  const handlePwChange: SubmitHandler<DefaultValues> = ({ currentPw, newPw }) => {
    console.log(currentPw, newPw);
  };

  return (
    <form ref={formSection} onSubmit={handleSubmit(handlePwChange)} className="flex flex-grow flex-col justify-between py-60">
      <div className="flex flex-col gap-24">
        <InputText
          name="currentPw"
          type="password"
          control={control}
          rules={{
            required: ERROR_MESSAGES.password.passwordField,
            validate: {
              matchPassword: (value: string) => {
                //React-Query로 현재비밀번호 확인하면 됨.
                const passwordValue = "iwant18080";
                return passwordValue === value || ERROR_MESSAGES.passwordCh.passwordChField;
              },
            },
          }}
          onKeyDown={handleEnterNext}
        >
          현재 비밀번호
        </InputText>
        <InputText
          name="newPw"
          type="password"
          control={control}
          rules={{
            required: ERROR_MESSAGES.password.passwordField,
            pattern: { value: REG_EXP.CHECK_PASSWORD, message: ERROR_MESSAGES.password.passwordPattern },
            deps: ["newPwCheck"],
          }}
          onKeyDown={handleEnterNext}
        >
          새 비밀번호
        </InputText>
        <InputText
          name="newPwCheck"
          type="password"
          control={control}
          rules={{
            required: ERROR_MESSAGES.password.passwordField,
            validate: {
              matchPassword: (value) => {
                const passwordValue = getValues("newPw");
                return passwordValue === value || ERROR_MESSAGES.passwordCh.passwordChField;
              },
            },
          }}
          onKeyDown={handleEnterNext}
        >
          새 비밀번호 확인
        </InputText>
      </div>
      <button className="rounded-sm bg-black px-16 py-12 text-16 text-white">변경하기</button>
    </form>
  );
};
export default PasswordPage;
