import { useState } from "react";
import { useFormContext } from "react-hook-form";
import BottomButton from "@/components/button/BottomButton";
import InputText from "@/components/input/InputText";
import { checkEnterNextButton } from "@/hooks/checkEnterNextButton";
import { ERROR_MESSAGES, REG_EXP } from "@/utils/signupValidation";
import { ResetPwFormType } from "@/types/index";

interface Props {
  onPrev: () => void;
}

const SetNewPw = ({ onPrev }: Props) => {
  const { formState, control, getValues, watch } = useFormContext<ResetPwFormType>();
  const { password, passwordCheck } = watch();
  const { isError, handleEnterError } = checkEnterNextButton();

  const isButtonDisabled = !!(formState.errors.password || formState.errors.passwordCheck) || !(password && passwordCheck);

  return (
    <div className="flex h-full flex-col justify-between pb-160 pt-36">
      <div className="flex flex-col gap-20 pc:pb-80">
        <InputText
          control={control}
          onKeyDown={(e) => handleEnterError(e, !isButtonDisabled)}
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          hint="영문과 숫자를 조합하여 8자리 이상"
          autoComplete="new-password"
          rules={{ required: ERROR_MESSAGES.password.passwordField, pattern: { value: REG_EXP.CHECK_PASSWORD, message: ERROR_MESSAGES.password.passwordPattern } }}
        >
          비밀번호
        </InputText>
        <InputText
          control={control}
          onKeyDown={(e) => handleEnterError(e, !isButtonDisabled)}
          name="passwordCheck"
          type="password"
          autoComplete="new-password"
          placeholder="비밀번호를 입력해주세요"
          rules={{
            required: ERROR_MESSAGES.password.passwordField,
            validate: {
              matchPassword: (value) => {
                const passwordValue = getValues("password");
                return passwordValue === value || ERROR_MESSAGES.passwordCh.passwordChField;
              },
            },
          }}
        >
          비밀번호 확인
        </InputText>
      </div>
      <div className={`fixed bottom-0 left-0 w-full pc:sticky pc:mt-20 ${isError ? "animate-brrr" : ""}`}>
        <BottomButton isSubmit isDisabled={isButtonDisabled} hasBack onBackClick={onPrev}>
          변경 내용 저장
        </BottomButton>
      </div>
    </div>
  );
};

export default SetNewPw;
