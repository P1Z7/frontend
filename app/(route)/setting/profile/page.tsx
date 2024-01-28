"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import InputFile from "@/components/input/InputFile";
import InputText from "@/components/input/InputText";
import { ERROR_MESSAGES, REG_EXP } from "@/utils/signupValidation";

const PROFILE_DEFAULT = {
  mode: "onChange",
  defaultValues: {
    profileImage: "",
    nickname: "",
  },
} as const;

type DefaultValues = (typeof PROFILE_DEFAULT)["defaultValues"];

const ProfilePage = () => {
  const { formState, control, handleSubmit } = useForm(PROFILE_DEFAULT);
  console.log(formState.isValid);

  const isError = !!formState.errors.profileImage || !!formState.errors.nickname || !formState.isValid;

  const handleProfileSubmit: SubmitHandler<DefaultValues> = async ({ profileImage, nickname }) => {
    console.log(profileImage, nickname);
  };

  return (
    <form onSubmit={handleSubmit(handleProfileSubmit)} className="flex flex-col gap-24 py-60">
      <InputFile control={control} name="profileImage" rules={{ required: "입력" }}>
        프로필 사진
      </InputFile>
      <InputText
        name="nickname"
        control={control}
        maxLength={10}
        rules={{
          required: ERROR_MESSAGES.nickname.nicknameField,
          pattern: { value: REG_EXP.CHECK_NICKNAME, message: ERROR_MESSAGES.nickname.nicknamePattern },
          maxLength: { value: 10, message: ERROR_MESSAGES.nickname.nicknamePattern },
        }}
      >
        닉네임
      </InputText>
      <button className={`rounded-sm bg-black px-16 py-12 text-16 text-white`}>변경하기</button>
    </form>
  );
};
export default ProfilePage;
