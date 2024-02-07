"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import BottomButton from "@/components/button/BottomButton";
import InputProfileImg from "@/components/input/InputProfileImg";
import InputText from "@/components/input/InputText";
import { ERROR_MESSAGES, REG_EXP } from "@/utils/signupValidation";

interface DefaultValues {
  profileImage: File[];
  nickname: string;
}

const ProfilePage = () => {
  const { formState, control, handleSubmit, watch } = useForm<DefaultValues>({
    mode: "onChange",
    defaultValues: {
      profileImage: [],
      nickname: "",
    },
  });

  const handleProfileSubmit: SubmitHandler<DefaultValues> = async ({ profileImage, nickname }) => {
    console.log(profileImage, nickname);
  };

  const [newFile] = watch("profileImage");

  const [thumbnail, setThumbnail] = useState("");

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
    <form onSubmit={handleSubmit(handleProfileSubmit)} className="flex flex-col gap-20 px-20 py-36">
      <div className="flex h-172 flex-col gap-8">
        <InputProfileImg control={control} name="profileImage" hasProfile={!!thumbnail}>
          <Image
            src={thumbnail || "/icon/no-profile.svg"}
            width={100}
            height={100}
            alt="설정할 프로필 이미지"
            className="pointer-events-none -mt-[0.2rem] h-100  rounded-full object-cover"
          />
        </InputProfileImg>
        {thumbnail && (
          <button type="button" onClick={() => setThumbnail("")} className="w-max self-center text-14 font-600 text-gray-400 underline">
            기본 이미지로 변경
          </button>
        )}
      </div>
      <InputText name="nickname" control={control} maxLength={10} rules={nicknameRules}>
        닉네임
      </InputText>
      <BottomButton>변경 내용 저장</BottomButton>
    </form>
  );
};
export default ProfilePage;
