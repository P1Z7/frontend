"use client";

import FadingDot from "@/(route)/(bottom-nav)/signin/_components/FadingDot";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
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
  const router = useRouter();
  const session = useSession();
  const { formState, control, handleSubmit } = useForm<DefaultValues>({
    mode: "onChange",
    defaultValues: {
      profileImage: "",
      nickName: session?.user.nickName,
    },
  });

  const [submitState, setSubmitState] = useState({ isLoading: false, isError: false });

  const handleProfileSubmit: SubmitHandler<DefaultValues> = async ({ profileImage, nickName }) => {
    if (!nickName || !session) {
      return;
    }
    setSubmitState((prev) => ({ isError: false, isLoading: true }));

    setTimeout(async () => {
      const api = new Api(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmYTc1ODhiMi1kYzY5LTRlNjgtOTExNi1jOWUwZGEyOTRhYmQiLCJ1c2VybmFtZSI6Iuq5gO2VmOuKmCIsImlhdCI6MTcwODAzMjk3MywiZXhwIjoxNzA4MDM2NTczfQ.cWff9EeRW1Q9Xi0FdmqzbC9V0-7m_363ZrLZjyoti1o",
      );

      try {
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
        if (res.message) {
          throw new Error(res.message);
        }
        if (res) {
          setSession({ ...session, user: { profileImage: url, nickName, userId: session?.user.userId } });
          router.push("/mypage");
        }
      } catch (e) {
        setSubmitState((prev) => ({ ...prev, isError: true }));
      } finally {
        setSubmitState((prev) => ({ ...prev, isLoading: false }));
      }
    }, 1000);
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
      <div className={`fixed bottom-0 left-0 w-full ${submitState.isError ? "animate-brrr" : ""}`}>
        <BottomButton isSubmit isDisabled={!!formState.errors.nickName || !formState.isDirty}>
          {submitState.isLoading ? <FadingDot fill="white" /> : submitState.isError ? "다시 시도하기" : "변경하기"}
        </BottomButton>
      </div>
    </form>
  );
};
export default ProfilePage;
