"use client";

// import { POST_STEPS } from "app/_constants/post";
import Image from "next/image";
import { useFunnel } from "@/hooks/useFunnel";
import { SignupStepNameType } from "@/types/index";
import GenericForm from "../signup/_components/GenericForm";
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

const POST_STEPS: SignupStepNameType[] = ["계정 정보", "프로필 정보", "아티스트 선택"];

export type PostType = Omit<typeof DEFAULT_INPUT_VALUES, "gift" | "images" | "member"> & { gift: string[]; images: File[] | string[]; member: string[] };

const Post = () => {
  const { Funnel, Step, setStep, currentStep } = useFunnel(POST_STEPS);

  const handlePrevClick = () => {
    currentStep === POST_STEPS[0] ? window.history.back() : setStep(POST_STEPS[POST_STEPS.indexOf(currentStep) - 1]);
  };

  return (
    <div className="flex h-svh flex-col gap-24 p-20 text-16">
      <div className="flex gap-8 pb-20 pt-12">
        <Image src="/icon/left-arrow.svg" alt="뒤로가기 버튼" width={24} height={24} onClick={handlePrevClick} className="cursor-pointer" />
        <div className="text-20 font-900">등록하기</div>
      </div>
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
  );
};

export default Post;
