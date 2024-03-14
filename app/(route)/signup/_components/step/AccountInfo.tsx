import { instance } from "app/_api/api";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import Button from "@/components/button";
import BottomButton from "@/components/button/BottomButton";
import InputText from "@/components/input/InputText";
import { ERROR_MESSAGES, REG_EXP } from "@/utils/signupValidation";
import { SignUpFormType } from "@/types/index";
import { checkEnterNextButton } from "../../../../_hooks/checkEnterNextButton";

interface Props {
  onNext: () => void;
  onPrev: () => void;
}

const AccountInfo = ({ onNext, onPrev }: Props) => {
  const { formState, control, getValues, watch, setError } = useFormContext<SignUpFormType>();
  const { email, password, passwordCheck, code } = watch();
  const [canWrite, setCanWrite] = useState(false);
  const [isVerification, setIsVerification] = useState(false);
  const { isError, handleEnterError } = checkEnterNextButton();

  const isButtonDisabled = !!(formState.errors.password || formState.errors.passwordCheck) || !(password && passwordCheck) || !isVerification;

  const handleEmailClick = async () => {
    setIsVerification(false);
    setCanWrite(false);

    const data = {
      email: email,
    };

    try {
      const res = await instance.post("/email", data);
      if (res.error) {
        throw new Error(res.error);
      }
      setCanWrite(true);
    } catch (error) {
      setError("email", { message: ERROR_MESSAGES.email.emailDuplication });
    }
  };

  const handleCodeClick = async () => {
    const data = {
      email: email,
      verificationNumber: code,
    };

    try {
      const res = await instance.post("/email/verification", data);
      if (res.error) {
        throw new Error(res.error);
      }
      setIsVerification(true);
    } catch (error) {
      setError("code", { message: ERROR_MESSAGES.code.emailToVerify });
    }
  };

  return (
    <div className="flex h-full flex-col justify-between pb-160 pt-36 pc:pb-0">
      <div className="flex flex-col gap-20">
        <div className="flex items-end gap-8">
          <InputText
            isSuccess={canWrite}
            noButton
            control={control}
            onKeyDown={(e) => handleEnterError(e, !isButtonDisabled, onNext)}
            name="email"
            autoComplete="email"
            placeholder="이메일을 입력해 주세요"
            hint={canWrite ? "이메일이 발송되었습니다" : "이메일 형식으로 입력하여 주세요."}
            rules={{
              required: ERROR_MESSAGES.email.emailField,
              pattern: { value: REG_EXP.CHECK_EMAIL, message: ERROR_MESSAGES.email.emailPattern },
            }}
          >
            이메일
          </InputText>
          <div className="w-88 shrink-0 pb-20 tablet:w-120">
            <Button type={canWrite ? "linedGray" : "lined"} size="free" style="h-48 text-14 rounded-sm" isDisabled={!!formState.errors.email || !email} onClick={handleEmailClick}>
              {canWrite ? "재인증" : "인증하기"}
            </Button>
          </div>
        </div>
        <div className="flex items-end gap-8">
          <InputText
            isSuccess={isVerification}
            onKeyDown={(e) => handleEnterError(e, !isButtonDisabled, onNext)}
            noButton
            control={control}
            name="code"
            autoComplete="none"
            placeholder="인증코드를 입력해 주세요"
            hint={isVerification ? "인증되었습니다" : "이메일로 발송된 인증 코드를 입력하여 주세요."}
            rules={{
              required: ERROR_MESSAGES.code.codeField,
            }}
            disabled={!canWrite}
          >
            인증코드 입력
          </InputText>
          <div className="w-88 shrink-0 pb-20 tablet:w-120">
            <Button type="lined" size="free" style="h-48 text-14 rounded-sm" isDisabled={!canWrite || !code || isVerification} onClick={handleCodeClick}>
              {isVerification ? "인증완료" : "확인"}
            </Button>
          </div>
        </div>
        <InputText
          control={control}
          onKeyDown={(e) => handleEnterError(e, !isButtonDisabled, onNext)}
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
          onKeyDown={(e) => handleEnterError(e, !isButtonDisabled, onNext)}
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
        <BottomButton onClick={onNext} hasBack onBackClick={onPrev}>
          {/* <BottomButton onClick={onNext} isDisabled={isButtonDisabled} hasBack onBackClick={onPrev}> */}
          다음으로
        </BottomButton>
      </div>
    </div>
  );
};

export default AccountInfo;
