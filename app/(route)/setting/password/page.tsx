"use client";

import classNames from "classnames";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FocusEvent, FormEvent, KeyboardEvent, useRef, useState } from "react";
import { validate_currentPw, validate_newPw } from "@/utils/settingValidate";

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
  const router = useRouter();
  const [value, setValue] = useState({ current: null, new: null });
  const [errMsg, setErrMsg] = useState({ current: null, new: null });

  const isError = errMsg.current !== "" || errMsg.new !== "";

  const handleBlur = async (e: FocusEvent<HTMLInputElement>) => {
    const name = e.target.name as "current" | "new";
    const value = e.target.value;
    setValue((prev) => ({ ...prev, [name]: value }));

    const newErrMsg = await (name === "current" ? validate_currentPw : validate_newPw)({ name, value });
    setErrMsg((prev) => ({ ...prev, [name]: newErrMsg }));
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
    <form ref={formSection} onSubmit={handleSubmit} className="flex flex-grow flex-col justify-between py-60">
      <div className="flex flex-col gap-24">
        {SIGNIN_INPUTS.map((config, idx) => (
          <label className={"flex flex-col gap-8 text-16"} key={config.name}>
            {config.title}
            <input
              onBlur={handleBlur}
              onKeyDown={handleNextStep(idx)}
              name={config.name}
              placeholder={config.placeholder}
              className={classNames("h-48 rounded-sm bg-gray-200 px-12 py-16", { "border-[1px] border-solid border-red-500": errMsg[config.name] })}
            />
            <p className="h-16 text-14 text-red-500">{errMsg[config.name]}</p>
          </label>
        ))}
      </div>
      <button className={classNames("rounded-sm px-16 py-12 text-16", { "bg-black text-white": !isError }, { "bg-gray-300 text-black": isError })}>변경하기</button>
    </form>
  );
};

SettingPage.title = "비밀번호 변경";
export default SettingPage;
