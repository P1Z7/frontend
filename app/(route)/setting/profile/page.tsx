"use client";

import classNames from "classnames";
import Image from "next/image";
import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import defaultImg from "@/public/icons/icon_add_image_gray.svg";

const ProfilePage = () => {
  const [value, setValue] = useState({ profileImage: "", nickname: "" });
  const isError = value.nickname.length > 10;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue((prev) => ({ ...prev, nickname: e.target.value }));
  };

  const input = useRef<HTMLInputElement>(null);
  const handleKeyDown = (e: KeyboardEvent<HTMLLabelElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      input.current?.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const selectedFile = e.target.files[0];
    const previewUrl = URL.createObjectURL(selectedFile);
    setValue((prev) => ({ ...prev, profileImage: previewUrl }));
  };

  return (
    <div className="flex flex-col gap-24">
      <div>
        <p className="mb-8 text-16">프로필 사진</p>
        <div className="flex justify-center">
          <label onKeyDown={handleKeyDown} className="w-max cursor-pointer rounded-full" tabIndex={0}>
            <input ref={input} name="profileImg" type="file" className="hidden" accept="image/* " onChange={handleFileChange} />
            <Image src={value.profileImage || defaultImg} alt="이미지 추가 버튼" className="rounded-full" />
          </label>
        </div>
      </div>
      <div>
        <p className="mb-8 text-16">닉네임</p>
        <input
          value={value.nickname}
          onChange={handleChange}
          placeholder="닉네임을 입력해주세요"
          className={classNames("h-48 rounded-sm bg-gray-200 px-12 py-16 text-16", { "border-[1px] border-solid border-red-500": isError })}
        />
        <div>{`${value.nickname.length}/10`}</div>
        <p>{isError ? "닉네임은 10자 이하로 입력해주세요" : null}</p>
      </div>
      <button className="h-40 bg-slate-200 text-12">다음</button>
    </div>
  );
};
export default ProfilePage;
