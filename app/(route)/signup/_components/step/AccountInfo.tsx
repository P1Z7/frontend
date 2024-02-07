import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import BottomButton from "@/components/button/BottomButton";
import InputText from "@/components/input/InputText";
import { ERROR_MESSAGES, REG_EXP } from "@/utils/signupValidation";
import { SignUpFormType } from "@/types/index";

const AccountInfo = ({ onNext }: { onNext: () => void }) => {
  const { formState, control, getValues, handleSubmit, watch } = useFormContext<SignUpFormType>();
  const { email, password, passwordCh } = watch();

  const isButtonDisabled = !!(formState.errors.email || formState.errors.password || formState.errors.passwordCh) || !(email && password && passwordCh);

  return (
    <div className="flex flex-col gap-20 pt-36">
      <InputText
        control={control}
        name="email"
        autoComplete="email"
        placeholder="이메일을 입력해 주세요"
        hint="이메일 형식으로 입력하여 주세요."
        rules={{ required: ERROR_MESSAGES.email.emailField, pattern: { value: REG_EXP.CHECK_EMAIL, message: ERROR_MESSAGES.email.emailPattern } }}
      >
        이메일
      </InputText>
      <InputText
        control={control}
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
        name="passwordCh"
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
      <BottomButton onClick={handleSubmit(onNext)} isDisabled={isButtonDisabled}>
        다음으로
      </BottomButton>
    </div>
  );
};

export default AccountInfo;
