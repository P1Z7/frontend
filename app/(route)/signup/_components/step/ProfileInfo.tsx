import { useQuery } from "@tanstack/react-query";
import { instance } from "app/_api/api";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import BottomButton from "@/components/button/BottomButton";
import InputText from "@/components/input/InputText";
import { checkEnterNextButton } from "@/hooks/checkEnterNextButton";
import { ERROR_MESSAGES, REG_EXP } from "@/utils/signupValidation";
import { SignUpFormType } from "@/types/index";

interface Props {
  onNext: () => void;
  onPrev: () => void;
}

const ProfileInfo = ({ onNext, onPrev }: Props) => {
  const { isError, handleEnterError } = checkEnterNextButton();
  const { formState, control } = useFormContext<SignUpFormType>();
  const [current, setCurrent] = useState("");

  const { data } = useQuery({
    queryKey: ["nickname", current],
    queryFn: async () => {
      return instance.get("/users/nickname", { search: current });
    },
  });

  const isButtonDisabled = !!formState.errors.nickName || !formState.isValid;

  return (
    <div className="flex h-full flex-col justify-between pt-36">
      <div>
        <InputText
          control={control}
          onKeyDown={(e) => handleEnterError(e, !isButtonDisabled, onNext)}
          name="nickName"
          placeholder="닉네임을 입력해주세요"
          rules={{
            required: ERROR_MESSAGES.nickName.nickNameField,
            pattern: { value: REG_EXP.CHECK_NICKNAME, message: ERROR_MESSAGES.nickName.nickNamePattern },
            validate: {
              isDuplicated: (value) => {
                setCurrent(value);
                return data?.isDuplicated ? "이미 사용중인 닉네임입니다." : true;
              },
            },
          }}
        >
          닉네임
        </InputText>
      </div>
      <div className={`fixed bottom-0 left-0 w-full pc:sticky ${isError ? "animate-brrr" : ""}`}>
        <BottomButton onClick={onNext} isDisabled={isButtonDisabled} hasBack onBackClick={onPrev}>
          다음으로
        </BottomButton>
      </div>
    </div>
  );
};

export default ProfileInfo;
