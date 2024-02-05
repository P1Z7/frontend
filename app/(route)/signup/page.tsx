"use client";

import { useRouter } from "next/navigation";
import { useFunnel } from "@/hooks/useFunnel";
import { SignUpFormType, SignupStepNameType } from "@/types/index";
import ArrowLeft from "@/public/icon/arrow-left_lg.svg";
import GenericForm from "./_components/GenericForm";
import ProfileSetup from "./_components/ProfileSetup";

const STEPS: SignupStepNameType[] = ["계정 정보", "프로필 정보", "아티스트 선택"];

const DEFAULT_VALUES = {
  email: "",
  password: "",
  passwordCh: "",
  profileImg: "",
  nickName: "",
  myArtists: [],
};

const SignUp = () => {
  const router = useRouter();
  const { Funnel, Step, setStep, currentStep } = useFunnel(STEPS);

  const handleNextClick = (step: SignupStepNameType) => {
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
      <Header onClick={handlePrevClick} />
      <GenericForm<SignUpFormType> formOptions={{ mode: "onBlur", defaultValues: DEFAULT_VALUES }}>
        <div className="flex flex-col px-20">
          <ProfileSetup steps={STEPS} handleNextClick={handleNextClick} Funnel={Funnel} Step={Step} />
        </div>
      </GenericForm>
    </>
  );
};

export default SignUp;

const Header = ({ onClick }: { onClick: () => void }) => {
  return (
    <header className="sticky left-0 top-0 z-nav flex h-72 w-full justify-between border-b border-gray-50 bg-white-white px-20 pb-12 pt-36">
      <button onClick={onClick} className="z-nav">
        <ArrowLeft />
      </button>
      <h1 className="absolute left-0 w-full text-center text-16 font-600 text-gray-900">회원가입</h1>
    </header>
  );
};
