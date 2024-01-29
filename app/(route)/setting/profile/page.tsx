"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
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
  const { formState, control, handleSubmit, watch } = useForm(PROFILE_DEFAULT);

  const handleProfileSubmit: SubmitHandler<DefaultValues> = async ({ profileImage, nickname }) => {
    console.log(profileImage, nickname);
  };

  const [newFile] = watch("profileImage") as any;

  const [thumbnail, setThumbnail] = useState(newFile);

  useEffect(() => {
    if (newFile) {
      const newURL = URL.createObjectURL(newFile);
      setThumbnail(newURL);
    }

    return () => {
      URL.revokeObjectURL(thumbnail);
    };
  }, [newFile]);

  const nicknameRules = formState.dirtyFields.profileImage
    ? { required: false }
    : {
        required: ERROR_MESSAGES.nickname.nicknameField,
        pattern: { value: REG_EXP.CHECK_NICKNAME, message: ERROR_MESSAGES.nickname.nicknamePattern },
        maxLength: { value: 10, message: ERROR_MESSAGES.nickname.nicknamePattern },
      };

  return (
    <form onSubmit={handleSubmit(handleProfileSubmit)} className="flex flex-col gap-24 py-60">
      <div className="relative flex flex-col">
        <InputFile control={control} name="profileImage">
          프로필 사진
        </InputFile>
        <Image
          src={thumbnail || "/icon/no-profile.svg"}
          width={100}
          height={100}
          alt="설정할 프로필 이미지"
          className="pointer-events-none absolute left-1/2 top-1/2 -mt-[0.2rem] h-100 -translate-x-1/2 -translate-y-1/2 rounded-full object-cover"
        />
        <button type="button" onClick={() => setThumbnail("")} className="w-max self-center text-14 underline">
          기본 이미지로 설정하기
        </button>
      </div>
      <InputText name="nickname" control={control} maxLength={10} rules={nicknameRules}>
        닉네임
      </InputText>
      <button className={`rounded-sm bg-black px-16 py-12 text-16 text-white`}>변경하기</button>
    </form>
  );
};
export default ProfilePage;
