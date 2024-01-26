"use client";

import classNames from "classnames";
import Image from "next/image";
import { ChangeEvent, KeyboardEvent, MouseEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import InputFile from "@/components/input/InputFile";
import defaultImg from "@/public/icon/icon_add-image_gray.svg";

const ProfilePage = () => {
  const [value, setValue] = useState({ profileImage: "", nickname: "" });
  const isLengthLimit = value.nickname.length > 10;
  const isError = !value.profileImage && !value.nickname;

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue((prev) => ({ ...prev, nickname: e.target.value }));
  };

  const handleKeyBlock = (e: KeyboardEvent) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };

  const input = useRef<HTMLInputElement>(null);
  const handleKeyDown = (e: KeyboardEvent<HTMLLabelElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      input.current?.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) {
      return;
    }
    const selectedFile = e.target.files[0];
    const previewUrl = URL.createObjectURL(selectedFile);
    setValue((prev) => ({ ...prev, profileImage: previewUrl }));
  };

  const handleFileDelete = (e: MouseEvent) => {
    if (value.profileImage) {
      e.preventDefault();
      setValue((prev) => ({ ...prev, profileImage: "" }));
    }
  };

  const { getValues, control } = useForm({
    defaultValues: {
      profileImage: "",
    },
  });
  console.log(getValues("profileImage"));

  return (
    <div className="flex flex-col gap-24">
      <div className="flex flex-col gap-8">
        <p className="text-16">프로필 사진</p>
        <div className="flex justify-center">
          <InputFile control={control} name="profileImage" />
          {/* <label onKeyDown={handleKeyDown} className="relative h-100 w-100 cursor-pointer rounded-full" tabIndex={0}>
            <input ref={input} onClick={handleFileDelete} onChange={handleFileChange} type="file" className="hidden" accept="image/*" />
            <Image
              src={value.profileImage || defaultImg}
              fill
              alt="이미지 추가 버튼"
              className={classNames("rounded-full object-cover", { "hover:brightness-50": value.profileImage })}
            />
          </label> */}
        </div>
        <button onClick={() => console.log(getValues("profileImage"))}>확인</button>
      </div>
      <div className="flex flex-col gap-8">
        <p className="text-16">닉네임</p>
        <input
          value={value.nickname}
          onKeyDown={handleKeyBlock}
          onChange={handleNameChange}
          placeholder="닉네임을 입력해주세요"
          className={classNames("h-48 rounded-sm bg-gray-200 px-12 py-16 text-16", { "outline outline-2 outline-red-500": isLengthLimit })}
        />
        <div className={classNames("flex gap-8", { "text-red-500": isLengthLimit })}>
          <span>{`${value.nickname.length}/10`}</span>
          <p className="h-16 text-14">{isLengthLimit ? "닉네임은 10자 이하로 입력해주세요" : null}</p>
        </div>
      </div>
      <button
        className={classNames("rounded-sm px-16 py-12 text-16", { "bg-black text-white": !isError && !isLengthLimit }, { "bg-gray-300 text-black": isError || isLengthLimit })}
      >
        변경하기
      </button>
    </div>
  );
};
export default ProfilePage;
