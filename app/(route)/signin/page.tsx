"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { FormEvent, KeyboardEvent, ReactNode, useRef } from "react";
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

  const errMsg = useRef({ email: "", password: "" });

  const formSection = useRef<HTMLFormElement>(null);

  const handleNextStep = (currentIdx: number) => (e: KeyboardEvent) => {
    const form = formSection.current;
    const nextStep = form?.querySelectorAll("input, button")[currentIdx + 1] as HTMLElement;
    if (e.key === "Enter" && nextStep) {
      e.preventDefault();
      nextStep.focus();
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("submit");
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
          <LabelWithErrMsg errMsg={errMsg.current[config.name]}>
            {config.title}
            <input onKeyDown={handleNextStep(idx)} type={config.name} placeholder={config.placeholder} className="h-48 rounded-sm bg-gray-200 px-12 py-16" />
          </LabelWithErrMsg>
        ))}
        <button className="rounded-sm bg-black px-16 py-12 text-16 text-white disabled:bg-gray-300 disabled:text-black">로그인</button>
      </form>
    </div>
  );
};
export default SignInPage;

const LabelWithErrMsg = ({ errMsg, children }: { errMsg: string; children: ReactNode }) => {
  return (
    <label className="flex flex-col gap-8 text-16">
      {children}
      <p>{errMsg}</p>
    </label>
  );
};
