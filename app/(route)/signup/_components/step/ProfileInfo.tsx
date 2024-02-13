import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import BottomButton from "@/components/button/BottomButton";
import InputText from "@/components/input/InputText";
import { Api } from "@/api/api";
import { ERROR_MESSAGES, REG_EXP } from "@/utils/signupValidation";
import { SignUpFormType } from "@/types/index";

const ProfileInfo = ({ onNext }: { onNext: () => void }) => {
  const { formState, control, handleSubmit } = useFormContext<SignUpFormType>();
  const [current, setCurrent] = useState("");
  const instance = new Api();

  const { data } = useQuery({
    queryKey: ["nickname", current],
    queryFn: async () => {
      return instance.get("/users/nickname", { search: current });
    },
  });

  const isButtonDisabled = !!formState.errors.nickName || !formState.isValid;

  return (
    <div className="pt-36">
      <InputText
        control={control}
        name="nickName"
        placeholder="닉네임을 입력해주세요"
        rules={{
          required: ERROR_MESSAGES.nickname.nicknameField,
          pattern: { value: REG_EXP.CHECK_NICKNAME, message: ERROR_MESSAGES.nickname.nicknamePattern },
          validate: {
            isDuplicated: async (value) => {
              setCurrent(value);
              return data?.isDuplicated ? "이미 사용중인 닉네임입니다." : true;
            },
          },
        }}
      >
        닉네임
      </InputText>
      <BottomButton onClick={onNext} isDisabled={isButtonDisabled}>
        다음으로
      </BottomButton>
    </div>
  );
};

export default ProfileInfo;
