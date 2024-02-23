"use client";

import FadingDot from "@/(route)/(bottom-nav)/signin/_components/FadingDot";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import MetaTag from "@/components/MetaTag";
import BottomButton from "@/components/button/BottomButton";
import MobileHeader from "@/components/header/MobileHeader";
import InputProfileImg from "@/components/input/InputProfileImg";
import InputText from "@/components/input/InputText";
import PinkLayout from "@/components/layout/PinkLayout";
import { instance } from "@/api/api";
import { getSession, setSession } from "@/store/session/cookies";
import { ERROR_MESSAGES, REG_EXP } from "@/utils/signupValidation";
import { META_TAG } from "@/constants/metaTag";

interface DefaultValues {
  profileImage: File | null | "";
  nickName: string;
}

const ProfilePage = () => {
  const router = useRouter();
  const session = getSession();
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
    setSubmitState({ isError: false, isLoading: true });

    setTimeout(async () => {
      try {
        const nickNameRes = await instance.get("/users/nickname");
        if (nickNameRes.isDuplicated) {
          toast.error("이미 사용 중인 닉네임입니다.", {
            className: "text-16 font-600",
          });
          return;
        }

        let url;
        if (!formState.dirtyFields.profileImage) {
          url = session.user.profileImage;
        } else if (!profileImage) {
          url = null;
        } else if (profileImage) {
          const formData = new FormData();
          formData.set("file", profileImage);
          url = await instance.post("/file/upload", formData, { category: "user" });
        }

        const patchData = {
          profileImage: url,
          nickName,
        };

        const res = await instance.put(`/users/${session.user.userId}/profile`, patchData);
        if (res) {
          setSession({ ...session, user: { ...session.user, profileImage: url, nickName, userId: session?.user.userId } });
          router.push("/mypage");
        }
      } catch {
        setSubmitState((prev) => ({ ...prev, isError: true }));
        toast("다시 시도해 주십시오.", {
          className: "text-16 font-600",
        });
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
    <>
      <MetaTag title={META_TAG.profile["title"]} description={META_TAG.profile["description"]} />
      <PinkLayout size="narrow">
        <MobileHeader />
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
      </PinkLayout>
    </>
  );
};
export default ProfilePage;
