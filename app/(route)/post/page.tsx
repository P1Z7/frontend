"use client";

import GenericFormProvider from "@/components/GenericFormProvider";
import MobileHeader from "@/components/header/MobileHeader";
import PinkLayout from "@/components/layout/PinkLayout";
import { useAuth } from "@/hooks/useAuth";
import { useFunnel } from "@/hooks/useFunnel";
import { PostStepNameType } from "@/types/index";
import DetailInfo from "./_components/DetailInfo";
import MainInfo from "./_components/MainInfo";
import StarInfo from "./_components/StarInfo";
import SubInfo from "./_components/SubInfo";

const DEFAULT_INPUT_VALUES = {
  placeName: "",
  eventType: "",
  groupId: "",
  artists: [],
  groupName: "",
  artistNames: [],
  startDate: "",
  endDate: "",
  address: "",
  addressDetail: "",
  userId: "",
  eventImages: [],
  description: "",
  eventUrl: "",
  organizerSns: "",
  snsType: "트위터",
  tags: [],
};

const POST_STEPS: PostStepNameType[] = ["행사 대상", "행사 정보", "특전 정보", "상세 설명"];

export type PostType = Omit<typeof DEFAULT_INPUT_VALUES, "artists" | "artistNames" | "eventImages" | "tags"> & {
  artists: string[];
  artistNames: string[];
  eventImages: (File | string)[];
  tags: string[];
};

const Post = () => {
  // const session = useAuth("/signin");
  const { Funnel, Step, setStep, currentStep } = useFunnel<PostStepNameType>(POST_STEPS);

  const handlePrevClick = () => {
    currentStep === POST_STEPS[0] ? window.history.back() : setStep(POST_STEPS[POST_STEPS.indexOf(currentStep) - 1]);
  };

  return (
    <PinkLayout size="narrow">
      <MobileHeader handleClick={handlePrevClick} />
      <div className="p-20 pb-116 pt-36 text-16 pc:pb-0">
        <GenericFormProvider formOptions={{ mode: "onBlur", defaultValues: DEFAULT_INPUT_VALUES, shouldFocusError: true }}>
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
        </GenericFormProvider>
      </div>
    </PinkLayout>
  );
};

export default Post;
