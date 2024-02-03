"use client";

import Image from "next/image";
import Header from "@/components/Header";
import { useFunnel } from "@/hooks/useFunnel";
import { PostStepNameType } from "@/types/index";
import BackIcon from "@/public/icon/arrow-left_lg.svg";
import GenericForm from "../(header)/signup/_components/GenericForm";
import DetailInfo from "./_components/DetailInfo";
import MainInfo from "./_components/MainInfo";
import StarInfo from "./_components/StarInfo";
import SubInfo from "./_components/SubInfo";

const DEFAULT_INPUT_VALUES = {
  group: "",
  member: [],
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

const POST_STEPS: PostStepNameType[] = ["행사 대상", "행사 정보", "특전 정보", "상세 설명"];

export type PostType = Omit<typeof DEFAULT_INPUT_VALUES, "gift" | "images" | "member"> & { gift: string[]; images: (File | string)[]; member: string[] };

const Post = () => {
  const { Funnel, Step, setStep, currentStep } = useFunnel<PostStepNameType>(POST_STEPS);

  const handlePrevClick = () => {
    currentStep === POST_STEPS[0] ? window.history.back() : setStep(POST_STEPS[POST_STEPS.indexOf(currentStep) - 1]);
  };

  return (
    <>
      <Header handleClick={handlePrevClick} />
      <div className="p-20 pb-92 pt-36 text-16">
        <GenericForm formOptions={{ mode: "onBlur", defaultValues: DEFAULT_INPUT_VALUES, shouldFocusError: true }}>
          <Funnel>
            <Step name={POST_STEPS[0]}>
              <StarInfo onNextStep={() => setStep(POST_STEPS[1])} />
            </Step>
            <Step name={POST_STEPS[1]}>
              <MainInfo onNextStep={() => setStep(POST_STEPS[2])} />
            </Step>
            <Step name={POST_STEPS[2]}>
              <SubInfo onNextStep={() => setStep(POST_STEPS[3])} />
            </Step>
            <Step name={POST_STEPS[3]}>
              <DetailInfo />
            </Step>
          </Funnel>
        </GenericForm>
      </div>
    </>
  );
};

export default Post;
