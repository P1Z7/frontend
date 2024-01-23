import { useFormContext } from "react-hook-form";
import { SignUpFormValues } from "../page";
import InputContainer from "./InputContainer";
import { ERROR_MESSAGES, REG_EXP } from "./validation";

export const AccountInfo = ({ onNext }: { onNext: () => void }) => {
  const { formState, control, getValues } = useFormContext<SignUpFormValues>();

  const isButtonDisabled = !!formState.errors.email || !!formState.errors.password || !!formState.errors.passwordCh || !formState.isValid;

  return (
    <div className="flex flex-col gap-12 p-12">
      <p className=" text-16 font-700 text-black">로그인 정보를 입력해주세요</p>
      <InputContainer
        control={control}
        name="email"
        placeholder="이메일을 입력해 주세요"
        rules={{ required: ERROR_MESSAGES.email.emailField, pattern: { value: REG_EXP.CHECK_EMAIL, message: ERROR_MESSAGES.email.emailPattern } }}
      >
        이메일
      </InputContainer>
      <InputContainer
        control={control}
        name="password"
        type="password"
        placeholder="영어,숫자를 포함한 비밀번호를 입력해주세요"
        autocomplete="new-password"
        rules={{ required: ERROR_MESSAGES.password.passwordField, pattern: { value: REG_EXP.CHECK_PASSWORD, message: ERROR_MESSAGES.password.passwordPattern } }}
      >
        비밀번호
      </InputContainer>
      <InputContainer
        control={control}
        name="passwordCh"
        type="password"
        autocomplete="new-password"
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
      </InputContainer>
      <button onClick={onNext} disabled={isButtonDisabled} className="h-40 bg-slate-200 text-12">
        다음
      </button>
    </div>
  );
};
