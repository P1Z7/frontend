"use client";

import { redirect } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import BottomButton from "@/components/button/BottomButton";
import InputProfileImg from "@/components/input/InputProfileImg";
import InputText from "@/components/input/InputText";
import { Api } from "@/api/api";
import { setSession, useSession } from "@/store/session/cookies";
import { authRedirectServer } from "@/utils/authRedirect";
import { ERROR_MESSAGES, REG_EXP } from "@/utils/signupValidation";

interface DefaultValues {
  profileImage: File | null | "";
  nickName: string;
}

const ProfilePage = () => {
  const session = useSession();
  const { formState, control, handleSubmit } = useForm<DefaultValues>({
    mode: "onChange",
    defaultValues: {
      profileImage: "",
      nickName: session?.user.nickName,
    },
  });

  const handleProfileSubmit: SubmitHandler<DefaultValues> = async ({ profileImage, nickName }) => {
    if (!nickName || !session) {
      return;
    }
    const api = new Api(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmYTc1ODhiMi1kYzY5LTRlNjgtOTExNi1jOWUwZGEyOTRhYmQiLCJ1c2VybmFtZSI6Iuq5gO2VmOuKmCIsImlhdCI6MTcwODAxOTAzNCwiZXhwIjoxNzA4MDIyNjM0fQ.eGYUJBkrzUf06Y3Z3nWQO5FUjtvQXZ73UX4a5whea3c",
    );

    let url;
    if (!formState.dirtyFields.profileImage) {
      url = session.user.profileImage;
    } else if (!profileImage) {
      url = null;
    } else if (profileImage) {
      const formData = new FormData();
      formData.set("file", profileImage);
      url = await api.post("/file/upload", formData, { category: "user" });
    }

    const patchData = {
      profileImage: url,
      nickName,
    };

    const res = await api.put(`/users/${session.user.userId}/profile`, patchData);

    if (res.error) {
      toast("다시 시도해주십시오.", {
        className: "text-16 font-600",
      });
    }
    if (res) {
      setSession({ ...session, user: { profileImage: url, nickName, userId: session?.user.userId } });
    }
  };

  const nickNameRules = formState.dirtyFields.profileImage
    ? { required: false }
    : {
        required: ERROR_MESSAGES.nickName.nickNameField,
        pattern: { value: REG_EXP.CHECK_NICKNAME, message: ERROR_MESSAGES.nickName.nickNamePattern },
        maxLength: { value: 10, message: ERROR_MESSAGES.nickName.nickNamePattern },
      };

  return (
    <form onSubmit={handleSubmit(handleProfileSubmit)} className="flex flex-col gap-20 px-20 py-36">
      <InputProfileImg control={control} name="profileImage" />
      <InputText name="nickName" control={control} maxLength={10} rules={nickNameRules}>
        닉네임
      </InputText>
      <BottomButton isSubmit isDisabled={!!formState.errors.nickName || !formState.isDirty}>
        변경 내용 저장
      </BottomButton>
    </form>
  );
};
export default ProfilePage;
