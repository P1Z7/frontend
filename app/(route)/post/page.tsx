"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useFunnel } from "@/hooks/useFunnel";
import { useStore } from "@/store/index";
import DetailInfo from "./_components/DetailInfo";
import MainInfo from "./_components/MainInfo";
import StarInfo from "./_components/StarInfo";
import SubInfo from "./_components/SubInfo";

const STEPS = ["행사 대상", "행사 정보", "특전 정보", "행사 설명"];
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
  const { info } = useStore((state) => ({ info: state.postInfo }));
  const { Funnel, Step, setStep, currentStep } = useFunnel(STEPS[0]);

  console.log(info);

  return (
    <div className="text-[18px]">
      <div onClick={() => (currentStep === "행사 대상" ? window.history.back() : setStep(STEPS[STEPS.indexOf(currentStep) - 1]))}>뒤로가기버튼</div>
      <div>등록하기</div>
      <div>진행바</div>
      <main>
        <Funnel>
          <Step name="행사 대상">
            <StarInfo onNextStep={() => setStep("행사 정보")} />
          </Step>
          <Step name="행사 정보">
            <MainInfo onNextStep={() => setStep("특전 정보")} />
          </Step>
          <Step name="특전 정보">
            <SubInfo onNextStep={() => setStep("행사 설명")} />
          </Step>
          <Step name="행사 설명">
            <DetailInfo />
          </Step>
        </Funnel>
      </main>
    </div>
  );
};

export default Post;
