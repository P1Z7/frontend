"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useFunnel } from "@/hooks/useFunnel";
import { SignUpFormType, StepNameType } from "@/types/index";
import GenericForm from "./_components/GenericForm";
import ProfileSetup from "./_components/ProfileSetup";

const STEPS: StepNameType[] = ["계정 정보", "프로필 정보", "아티스트 선택"];

const DEFAULT_VALUES = { email: "", password: "", passwordCh: "", profileImg: "", nickName: "", myArtists: [] };

const SignUp = () => {
  const router = useRouter();
  const { Funnel, Step, setStep, currentStep } = useFunnel(STEPS[0]);

  const handleNextClick = (step: StepNameType) => {
    setStep(step);
  };
  const handlePrevClick = () => {
    const stepIndex = STEPS.indexOf(currentStep);
    if (stepIndex === 0) {
      router.push("/signin");
    }
    setStep(STEPS[stepIndex - 1]);
  };

  return (
    <>
      <div className="flex gap-8 p-12">
        <button onClick={handlePrevClick}>
          <Image src="/icon/back-arrow_black.svg" alt="뒤로가기 버튼" width={24} height={24} />
        </button>
        <p className="text-16 font-700">회원가입</p>
      </div>
      <GenericForm<SignUpFormType> formOptions={{ mode: "onBlur", defaultValues: DEFAULT_VALUES }}>
        <ProfileSetup steps={STEPS} handleNextClick={handleNextClick} Funnel={Funnel} Step={Step} />
      </GenericForm>
    </>
  );
};

export default SignUp;
