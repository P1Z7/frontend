import { useQuery } from "@tanstack/react-query";
import { instance } from "app/_api/api";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import BottomButton from "@/components/button/BottomButton";
import InputText from "@/components/input/InputText";
import { ERROR_MESSAGES, REG_EXP } from "@/utils/signupValidation";
import { SignUpFormType } from "@/types/index";

const ProfileInfo = ({ onNext }: { onNext: () => void }) => {
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
    <div className="pt-36">
      <div className="pc:h-[37.3rem]">
        <InputText
          control={control}
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
      <BottomButton onClick={onNext} isDisabled={isButtonDisabled}>
        다음으로
      </BottomButton>
    </div>
  );
};

export default ProfileInfo;
