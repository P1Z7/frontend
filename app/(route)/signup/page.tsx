"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import MetaTag from "@/components/MetaTag";
import PinkLayout from "@/components/layout/PinkLayout";
import { useFunnel } from "@/hooks/useFunnel";
import { SignUpFormType, SignupStepNameType } from "@/types/index";
import { META_TAG } from "@/constants/metaTag";
import ArrowLeft from "@/public/icon/arrow-left_lg.svg";
import GenericFormProvider from "../../_components/GenericFormProvider";
import ProfileSetup from "./_components/ProfileSetup";

const STEPS: SignupStepNameType[] = ["약관 동의", "계정 정보", "프로필 정보", "아티스트 선택"];

const DEFAULT_VALUES: SignUpFormType = {
  termsAndConditions: false,
  privacyPolicy: false,
  email: "",
  password: "",
  passwordCheck: "",
  nickName: "",
  myArtists: [],
  myArtistsInfo: [],
  code: "",
};

const SignUp = () => {
  const emailFromSignin = useSearchParams().get("email");
  const router = useRouter();
  const [pcWidth, setPcWidth] = useState<"narrow" | "wide">("narrow");

  const { Funnel, Step, setStep, currentStep } = useFunnel(STEPS);

  const handleNextClick = (step: SignupStepNameType) => {
    setStep(step);
    if (step === "아티스트 선택") {
      setPcWidth("wide");
    }
  };
  const handlePrevClick = () => {
    const stepIndex = STEPS.indexOf(currentStep);
    if (stepIndex === 0) {
      router.push("/signin");
    }
    setPcWidth("narrow");
    setStep(STEPS[stepIndex - 1]);
  };

  return (
    <>
      <MetaTag title={META_TAG.signup["title"]} description={META_TAG.signup["description"]} />
      <PinkLayout size={pcWidth}>
        <div className="flex h-[calc(100%-13.8rem)] grow flex-col px-20">
          <GenericFormProvider<SignUpFormType> formOptions={{ mode: "onBlur", defaultValues: { ...DEFAULT_VALUES, email: emailFromSignin ?? "" } }}>
            <ProfileSetup steps={STEPS} handleNextClick={handleNextClick} handlePrevClick={handlePrevClick} Funnel={Funnel} Step={Step} />
          </GenericFormProvider>
        </div>
      </PinkLayout>
    </>
  );
};

export default SignUp;
