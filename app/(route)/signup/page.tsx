"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PinkLayout from "@/components/layout/PinkLayout";
import { useAuth } from "@/hooks/useAuth";
import { useFunnel } from "@/hooks/useFunnel";
import { useSession } from "@/store/session/cookies";
import { SignUpFormType, SignupStepNameType } from "@/types/index";
import ArrowLeft from "@/public/icon/arrow-left_lg.svg";
import GenericFormProvider from "../../_components/GenericFormProvider";
import ProfileSetup from "./_components/ProfileSetup";

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
  const [isLogin, setIsLogin] = useState(false);
  const [pcWidth, setPcWidth] = useState<"narrow" | "wide">("narrow");
  const session = useSession();

  useEffect(() => {
    if (session) {
      router.push("/mypage");
      setIsLogin(true);
    }
  }, []);

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

  if (!isLogin)
    return (
      <PinkLayout size={pcWidth}>
        <Header onClick={handlePrevClick} />
        <GenericFormProvider<SignUpFormType> formOptions={{ mode: "onBlur", defaultValues: DEFAULT_VALUES }}>
          <div className="flex h-full flex-col px-20 ">
            <ProfileSetup steps={STEPS} handleNextClick={handleNextClick} Funnel={Funnel} Step={Step} />
          </div>
        </GenericFormProvider>
      </PinkLayout>
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
