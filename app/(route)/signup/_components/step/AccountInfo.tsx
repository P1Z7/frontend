import { useFormContext } from "react-hook-form";
import Button from "@/components/button";
import BottomButton from "@/components/button/BottomButton";
import InputText from "@/components/input/InputText";
import { ERROR_MESSAGES, REG_EXP } from "@/utils/signupValidation";
import { SignUpFormType } from "@/types/index";

const AccountInfo = ({ onNext }: { onNext: () => void }) => {
  const { formState, control, getValues, watch } = useFormContext<SignUpFormType>();
  const { email, password, passwordCheck } = watch();

  const isButtonDisabled = !!(formState.errors.email || formState.errors.password || formState.errors.passwordCheck) || !(email && password && passwordCheck);

  const handleSendingClick = async () => {
    // const instance = new Api();
    // const data = {
    //   email: email,
    // };
    // const res = await instance.post("/email", data);
    // toast.success("이메일이 발송되었습니다", { className: "text-16 font-600" });
  };

  return (
    <div className="flex flex-col gap-20 pt-36">
      <div className="flex items-end gap-8">
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
        <div className="w-88 shrink-0 pb-16">
          <Button type="lined" size="free" style="h-48 text-14 rounded-sm" isDisabled={!!formState.errors.email || !email} onClick={handleSendingClick}>
            인증하기
          </Button>
        </div>
      </div>
      <InputText
        control={control}
        name="password"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        hint="영문과 숫자를 조합하여 8자리 이상"
        autoComplete="password"
        rules={{ required: ERROR_MESSAGES.password.passwordField, pattern: { value: REG_EXP.CHECK_PASSWORD, message: ERROR_MESSAGES.password.passwordPattern } }}
      >
        비밀번호
      </InputText>
      <InputText
        control={control}
        name="passwordCheck"
        type="password"
        autoComplete="password"
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
      <BottomButton onClick={onNext} isDisabled={isButtonDisabled}>
        다음으로
      </BottomButton>
    </div>
  );
};

export default AccountInfo;
