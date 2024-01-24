"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useFunnel } from "../../_hooks/useFunnel";
import GenericForm from "./components/GenericForm";
import ProfileSetup from "./components/ProfileSetup";

export interface SignUpFormValues {
  email: string;
  password: string;
  passwordCh: string;
  profileImg: string;
  nickName: string;
  myArtists: string[] | [];
}

const steps = ["계정 정보", "프로필 정보", "아티스트 선택"];

const SignUp = () => {
  const router = useRouter();
  const { Funnel, Step, setStep, currentStep } = useFunnel(steps[0]);

  const HandleNextClick = (step: string) => {
    setStep(step);
  };
  const HandlePrevClick = () => {
    const stepIndex = steps.indexOf(currentStep);
    if (stepIndex === 0) router.push("/signin");
    setStep(steps[stepIndex - 1]);
  };

  const DEFAULT_VALUES = { email: "", password: "", passwordCh: "", profileImg: "", nickName: "", myArtists: [] };

  return (
    <>
      <div className="flex gap-8 p-12">
        <button onClick={HandlePrevClick}>
          <Image src="/icon/icon_arrow_back_black.svg" alt="뒤로가기 버튼" width={24} height={24} />
        </button>
        <p className="text-16 font-700">회원가입</p>
      </div>
      <GenericForm formOptions={{ mode: "onBlur", defaultValues: DEFAULT_VALUES }}>
        <ProfileSetup steps={steps} nextClickHandler={HandleNextClick} Funnel={Funnel} Step={Step} />
      </GenericForm>
    </>
  );
};

export default SignUp;
