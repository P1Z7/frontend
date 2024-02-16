"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode } from "react";
import { useFunnel } from "@/hooks/useFunnel";
import { SignUpFormType, SignupStepNameType } from "@/types/index";
import ArrowLeft from "@/public/icon/arrow-left_lg.svg";
import GenericFormProvider from "../../_components/GenericFormProvider";
import ProfileSetup from "./_components/ProfileSetup";

interface Props {
  children: ReactNode;
}

const FixedDottedLayout = ({ children }: Props) => {
  return (
    <div className="relative w-screen pc:block pc:h-[calc(100vh-7.2rem)] pc:bg-main-pink-50 pc:bg-[url('/image/dotted-background.png')] pc:bg-contain pc:bg-repeat-y">
      <div className={`pc:fixed-center bg-white-white pc:h-[75vh] pc:min-h-fit pc:w-[40.8rem] pc:overflow-auto pc:rounded-lg pc:shadow-hero pc:shadow-gray-200`}>{children}</div>
      <div />
    </div>
  );
};

const STEPS: SignupStepNameType[] = ["계정 정보", "프로필 정보", "아티스트 선택"];

const DEFAULT_VALUES = {
  email: "",
  password: "",
  passwordCheck: "",
  profileImg: "",
  nickName: "",
  myArtists: [],
  myArtistsInfo: [],
  code: "",
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
    <FixedDottedLayout>
      <Header onClick={handlePrevClick} />
      <GenericFormProvider<SignUpFormType> formOptions={{ mode: "onBlur", defaultValues: DEFAULT_VALUES }}>
        <div className="flex h-full flex-col px-20 ">
          <ProfileSetup steps={STEPS} handleNextClick={handleNextClick} Funnel={Funnel} Step={Step} />
        </div>
      </GenericFormProvider>
    </FixedDottedLayout>
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
