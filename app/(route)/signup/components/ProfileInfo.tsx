import Image from "next/image";
import { ChangeEvent } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { SignUpFormValues } from "../page";
import InputContainer from "./InputContainer";
import { ERROR_MESSAGES, REG_EXP } from "./validation";

const ProfileInfo = ({ onNext }: { onNext: () => void }) => {
  const { formState, control, setValue } = useFormContext<SignUpFormValues>();
  const file = useWatch({ name: "profileImg", defaultValue: "" });

  const isButtonDisabled = !!formState.errors.nickName || !formState.isValid;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const selectedFile = e.target.files[0];
    const previewUrl = URL.createObjectURL(selectedFile);
    setValue("profileImg", previewUrl);
  };

  return (
    <div className="flex flex-col gap-12 p-12">
      <p className=" text-16 font-700 text-black">프로필을 입력해주세요</p>
      <p className="text-14">프로필 사진</p>
      <label className="relative h-100 w-100 rounded-full">
        <input name="profileImg" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
        <Image src={file || "/svgs/icon_add_image_gray.svg"} alt="이미지 추가 버튼" fill className="rounded-full object-cover" />
      </label>
      <InputContainer
        control={control}
        name="nickName"
        placeholder="닉네임을 입력해 주세요"
        rules={{ required: ERROR_MESSAGES.nickname.nicknameField, pattern: { value: REG_EXP.CHECK_NICKNAME, message: ERROR_MESSAGES.nickname.nicknamePattern } }}
      >
        닉네임
      </InputContainer>
      <button type="button" onClick={onNext} className="h-40 bg-slate-200 text-12" disabled={isButtonDisabled}>
        다음
      </button>
    </div>
  );
};

export default ProfileInfo;
