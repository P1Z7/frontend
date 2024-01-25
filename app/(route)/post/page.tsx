"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useStore } from "@/store/index";
import DetailInfo from "./_components/DetailInfo";
import MainInfo from "./_components/MainInfo";
import StarInfo from "./_components/StarInfo";
import SubInfo from "./_components/SubInfo";

export interface Post {
  //임시 지정 & 백엔드 스키마 받으면 수정 예정
  eventType?: string;
  title?: string;
  address?: string;
  detail_address?: string;
  start_date?: string;
  end_date?: string;
  sns_id?: string;
  sns_type?: string;
  event_url?: string;
  gift?: string[];
  images?: File[];
  detail_text?: string;
}

const Post = () => {
  const { step, setStep, info } = useStore((state) => ({ step: state.step, setStep: state.setStep, info: state.postInfo }));

  console.log(info);

  return (
    <div className="text-[18px]">
      <div onClick={() => setStep(step - 1)}>뒤로가기버튼</div>
      <div>등록하기</div>
      <div>진행바 {step}</div>
      <main>
        {step === 1 && <StarInfo />}
        {step === 2 && <MainInfo />}
        {step === 3 && <SubInfo />}
        {step === 4 && <DetailInfo />}
      </main>
    </div>
  );
};

export default Post;
