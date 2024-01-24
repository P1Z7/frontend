"use client";

import classNames from "classnames";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { FocusEvent, FormEvent, KeyboardEvent, ReactNode, useRef, useState } from "react";
import { isCurrentPw } from "@/utils/setting";
import leftArrow from "@/public/icons/icon-leftarrow.svg";

const SIGNIN_INPUTS = [
  {
    name: "current",
    title: "현재 비밀번호",
    placeholder: "현재 비밀번호를 입력해주세요.",
  },
  {
    name: "new",
    title: "새 비밀번호",
    placeholder: "영문, 숫자, 특수문자 포함 8자 이상",
  },
] as const;

const SettingPage = () => {
  const [value, setValue] = useState({ current: null, new: null });
  const [errMsg, setErrMsg] = useState({ current: null, new: null });

  const isError = errMsg.current !== "" || errMsg.new !== "";

  const handleBlur = async (e: FocusEvent<HTMLInputElement>) => {
    const type = e.target.type as "current" | "new";
    const value = e.target.value;
    setValue((prev) => ({ ...prev, [type]: value }));

    if (isCurrentPw(value)) {
    }
  };

  const formSection = useRef<HTMLFormElement>(null);

  const handleNextStep = (currentIdx: number) => (e: KeyboardEvent) => {
    const formChildren = formSection.current?.querySelectorAll("input, button");
    if (!formChildren) {
      return;
    }
    const nextStep = formChildren[currentIdx + 1] as HTMLElement;
    if (e.key === "Enter" && nextStep) {
      e.preventDefault();
      nextStep.focus();
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isError) {
      return;
    }

    console.log(value);
  };

  return (
    <div className="flex h-dvh w-dvw flex-col px-20 pt-32">
      <div className="flex items-center gap-8 self-start pb-20">
        <button>
          <Image src={leftArrow} alt="뒤로가기 버튼" />
        </button>
        <h1 className="text-18 font-900">비밀번호 변경</h1>
      </div>
      <form ref={formSection} onSubmit={handleSubmit} className="flex flex-grow flex-col justify-between gap-24 py-60">
        <div>
          {SIGNIN_INPUTS.map((config, idx) => (
            <label className={"flex flex-col gap-8 text-16"} key={config.name}>
              {config.title}
              <input
                onBlur={handleBlur}
                onKeyDown={handleNextStep(idx)}
                type={config.name}
                placeholder={config.placeholder}
                className={classNames("h-48 rounded-sm bg-gray-200 px-12 py-16", { "border-[1px] border-solid border-red-500": errMsg[config.name] })}
              />
              <p className="h-16 text-14 text-red-500">{errMsg[config.name]}</p>
            </label>
          ))}
        </div>
        <button className={classNames("rounded-sm px-16 py-12 text-16", { "bg-black text-white": !isError }, { "bg-gray-300 text-black": isError })}>변경하기</button>
      </form>
    </div>
  );
};
export default SettingPage;
