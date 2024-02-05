import { useFormContext } from "react-hook-form";
import BottomButton from "@/components/button/BottomButton";
import InputText from "@/components/input/InputText";
import { ERROR_MESSAGES, REG_EXP } from "@/utils/signupValidation";
import { SignUpFormType } from "@/types/index";

const ProfileInfo = ({ onNext }: { onNext: () => void }) => {
  const { formState, control, handleSubmit } = useFormContext<SignUpFormType>();

  const isButtonDisabled = !!formState.errors.nickName || !formState.isValid;

  return (
    <>
      <InputText
        control={control}
        name="nickName"
        maxLength={10}
        placeholder="닉네임을 입력해 주세요"
        rules={{ required: ERROR_MESSAGES.nickname.nicknameField, pattern: { value: REG_EXP.CHECK_NICKNAME, message: ERROR_MESSAGES.nickname.nicknamePattern } }}
      >
        닉네임
      </InputText>
      <BottomButton onClick={handleSubmit(onNext)} isDisabled={isButtonDisabled}>
        다음으로
      </BottomButton>
    </>
  );
};

export default ProfileInfo;
