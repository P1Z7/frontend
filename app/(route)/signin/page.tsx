"use client";

import classNames from "classnames";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { FocusEvent, FormEvent, KeyboardEvent, ReactNode, useRef, useState } from "react";
import { validateSignin } from "@/utils/signValidate";
import leftArrow from "@/public/icons/icon-leftarrow.svg";

const SIGNIN_INPUTS = [
  {
    name: "email",
    title: "이메일",
    placeholder: "example@kpop.com",
  },
  {
    name: "password",
    title: "비밀번호",
    placeholder: "영문, 숫자, 특수문자 포함 8자 이상",
  },
] as const;

const SignInPage = () => {
  const { status } = useSession();
  if (status === "authenticated") {
    redirect("/");
  }

  const [value, setValue] = useState({ email: null, password: null });
  const [errMsg, setErrMsg] = useState({ email: null, password: null });

  const isError = errMsg.email !== "" || errMsg.password !== "";

  const handleBlur = async (e: FocusEvent<HTMLInputElement>) => {
    const type = e.target.type as "email" | "password";
    const value = e.target.value;
    setValue((prev) => ({ ...prev, [type]: value }));

    const newErrMsg = await validateSignin({ type, value });
    setErrMsg((prev) => ({ ...prev, [type]: newErrMsg }));
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
        <h1 className="text-18 font-900">로그인</h1>
      </div>
      <form ref={formSection} onSubmit={handleSubmit} className="flex flex-col gap-24 py-60">
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
        <button className={classNames("flex-grow rounded-sm bg-black px-16 py-12 text-16 text-white", { ["bg-gray-300 text-black"]: isError })}>로그인</button>
      </form>
    </div>
  );
};
export default SignInPage;
