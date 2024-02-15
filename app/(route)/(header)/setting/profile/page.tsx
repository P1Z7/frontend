"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import BottomButton from "@/components/button/BottomButton";
import InputProfileImg from "@/components/input/InputProfileImg";
import InputText from "@/components/input/InputText";
import { Api } from "@/api/api";
import { useSession } from "@/store/session/cookies";
import { ERROR_MESSAGES, REG_EXP } from "@/utils/signupValidation";

interface DefaultValues {
  profileImage: File[];
  nickName: string;
}

const ProfilePage = () => {
  const { formState, control, handleSubmit, watch } = useForm<DefaultValues>({
    mode: "onChange",
    defaultValues: {
      profileImage: [],
      nickName: "",
    },
  });

  const handleProfileSubmit: SubmitHandler<DefaultValues> = async ({ profileImage, nickName }) => {
    console.log(profileImage, nickName);
    const api = new Api(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3ZDMwYTNlOS0xNjk4LTRkMTgtYjA1Yi1iMmNiOGYyZGUwNjciLCJ1c2VybmFtZSI6IiIsImlhdCI6MTcwNzk4NTc1NSwiZXhwIjoxNzA3OTg5MzU1fQ.xpHXaqsWM3IIlyNwo9MMNXjqBGbh5bRkccY9Ze2WdGY",
    );

    const formData = new FormData();
    formData.set("profileImage", profileImage[0]);
    const image = await api.post("/file/upload", formData);

    console.log(image);
    // const patchData = {
    //   profileImage: image,
    //   nickName,
    // };
    // const {
    //   user: { userId },
    // } = useSession();

    // const res = await api.put(`/users/${userId}/profile`, patchData);
    // console.log(res);
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

  const nickNameRules = formState.dirtyFields.profileImage
    ? { required: false }
    : {
        required: ERROR_MESSAGES.nickName.nickNameField,
        pattern: { value: REG_EXP.CHECK_NICKNAME, message: ERROR_MESSAGES.nickName.nickNamePattern },
        maxLength: { value: 10, message: ERROR_MESSAGES.nickName.nickNamePattern },
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
      <InputText name="nickName" control={control} maxLength={10} rules={nickNameRules}>
        닉네임
      </InputText>
      <BottomButton isSubmit>변경 내용 저장</BottomButton>
    </form>
  );
};
export default ProfilePage;
