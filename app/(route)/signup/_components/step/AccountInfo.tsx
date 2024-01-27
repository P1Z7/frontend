import { useFormContext } from "react-hook-form";
import InputText from "@/components/input/InputText";
import { ERROR_MESSAGES, REG_EXP } from "@/utils/signupValidation";
import { SignUpFormType } from "@/types/index";

export const AccountInfo = ({ onNext }: { onNext: () => void }) => {
  const { formState, control, getValues } = useFormContext<SignUpFormType>();

  const isButtonDisabled = !!formState.errors.email || !!formState.errors.password || !!formState.errors.passwordCh || !formState.isDirty;

  return (
    <div className="flex flex-col gap-24 p-12">
      <p className=" text-16 font-700 text-black">로그인 정보를 입력해주세요</p>
      <InputText
        control={control}
        name="email"
        autoComplete="username"
        placeholder="이메일을 입력해 주세요"
        rules={{ required: ERROR_MESSAGES.email.emailField, pattern: { value: REG_EXP.CHECK_EMAIL, message: ERROR_MESSAGES.email.emailPattern } }}
      >
        이메일
      </InputText>
      <InputText
        control={control}
        name="password"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        hint="영어, 숫자, 특수문자 포함 필수 & 8자리 이상"
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
      <button type="button" onClick={onNext} disabled={isButtonDisabled} className="h-40 bg-slate-200 text-12">
        다음
      </button>
    </div>
  );
};
