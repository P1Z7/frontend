import { useFormContext } from "react-hook-form";
import InputText from "@/components/input/InputText";
import { ERROR_MESSAGES, REG_EXP } from "@/utils/signupValidation";
import { SignUpFormType } from "@/types/index";

const ProfileInfo = ({ onNext }: { onNext: () => void }) => {
  const { formState, control } = useFormContext<SignUpFormType>();

  const isButtonDisabled = !!formState.errors.nickName || !formState.isValid;

  return (
    <div className="flex flex-col gap-24 p-12">
      <p className=" text-16 font-700 text-black">프로필을 입력해주세요</p>
      <InputText
        control={control}
        name="nickName"
        maxLength={10}
        placeholder="닉네임을 입력해 주세요"
        rules={{ required: ERROR_MESSAGES.nickname.nicknameField, pattern: { value: REG_EXP.CHECK_NICKNAME, message: ERROR_MESSAGES.nickname.nicknamePattern } }}
      >
        닉네임
      </InputText>
      <button type="button" onClick={onNext} className="h-40 bg-slate-200 text-12" disabled={isButtonDisabled}>
        다음
      </button>
    </div>
  );
};

export default ProfileInfo;
