"use client";

import { useFunnel } from "@/hooks/useFunnel";
import GenericForm from "../signup/_components/GenericForm";
import DetailInfo from "./_components/DetailInfo";
import MainInfo from "./_components/MainInfo";
import StarInfo from "./_components/StarInfo";
import SubInfo from "./_components/SubInfo";

const STEPS = ["행사 대상", "행사 정보", "특전 정보", "행사 설명"];

const DEFAULT_INPUT_VALUES = {
  eventType: "생일카페",
  title: "",
  address: "",
  detailAddress: "",
  startDate: "",
  endDate: "",
  snsId: "",
  snsType: "트위터",
  eventUrl: "",
  gift: [],
  images: [],
  detailText: "",
};

export type PostType = Omit<typeof DEFAULT_INPUT_VALUES, "gift" | "images"> & { gift: string[]; images: File[] };

const Post = () => {
  const { Funnel, Step, setStep, currentStep } = useFunnel(STEPS[0]);

  return (
    <div className="text-[18px]">
      <div onClick={() => (currentStep === "행사 대상" ? window.history.back() : setStep(STEPS[STEPS.indexOf(currentStep) - 1]))}>뒤로가기버튼</div>
      <div>등록하기</div>
      <main>
        <GenericForm formOptions={{ mode: "onBlur", defaultValues: DEFAULT_INPUT_VALUES }}>
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
        </GenericForm>
      </main>
    </div>
  );
};

export default Post;
