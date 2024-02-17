"use client";

import FadingDot from "@/(route)/(bottom-nav)/signin/_components/FadingDot";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import BottomButton from "@/components/button/BottomButton";
import MobileHeader from "@/components/header/MobileHeader";
import InputText from "@/components/input/InputText";
import PinkLayout from "@/components/layout/PinkLayout";
import { instance } from "@/api/api";
import useEnterNext from "@/hooks/useEnterNext";
import { useSession } from "@/store/session/cookies";
import { ERROR_MESSAGES, REG_EXP } from "@/utils/signupValidation";

const PWCHANGE_DEFAULT = {
  mode: "onBlur",
  defaultValues: {
    newPw: "",
    newPwCheck: "",
  },
} as const;

type DefaultValues = (typeof PWCHANGE_DEFAULT)["defaultValues"];

const PasswordPage = () => {
  const router = useRouter();
  const session = useSession();
  const { formSection, handleEnterNext } = useEnterNext();

  const { formState, control, handleSubmit, getValues, setError } = useForm(PWCHANGE_DEFAULT);

  const [submitState, setSubmitState] = useState({ isLoading: false, isError: false });

  const handlePwChange: SubmitHandler<DefaultValues> = ({ newPw, newPwCheck }) => {
    if (!session) {
      return;
    }
    setSubmitState({ isLoading: true, isError: false });
    setTimeout(async () => {
      try {
        const res = await instance.put(`/users/${session.user.userId}/password`, { password: newPw, passwordCheck: newPwCheck });
        if (res.message) {
          throw new Error(res.message);
        }
        if (res) {
          router.push("/mypage");
        }
      } catch (e) {
        setSubmitState((prev) => ({ ...prev, isError: true }));
      } finally {
        setSubmitState((prev) => ({ ...prev, isLoading: false }));
      }
    }, 1000);
  };

  const isFormValid = formState.isValid;

  return (
    <PinkLayout size="narrow">
      <MobileHeader />
      <form ref={formSection} onSubmit={handleSubmit(handlePwChange)} className="flex flex-col gap-20 px-20 py-36">
        <InputText
          name="newPw"
          type="password"
          control={control}
          rules={{
            required: ERROR_MESSAGES.password.passwordField,
            pattern: { value: REG_EXP.CHECK_PASSWORD, message: ERROR_MESSAGES.password.passwordPattern },
            deps: [getValues("newPwCheck") ? "newPwCheck" : ""],
          }}
          onKeyDown={handleEnterNext}
          hint="숫자, 영문을 조합하여 8자리 이상"
        >
          비밀번호
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
            deps: ["newPw"],
          }}
          onKeyDown={handleEnterNext}
          placeholder="다시 입력해주세요."
        >
          비밀번호 확인
        </InputText>
        <div className={`fixed bottom-0 left-0 w-full ${submitState.isError ? "animate-brrr" : ""}`}>
          <BottomButton isDisabled={!isFormValid} isSubmit>
            {submitState.isLoading ? <FadingDot fill="white" /> : submitState.isError ? "다시 시도하기" : "변경하기"}
          </BottomButton>
        </div>
      </form>
    </PinkLayout>
  );
};
export default PasswordPage;
