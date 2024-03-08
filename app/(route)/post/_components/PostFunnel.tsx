import { Dispatch, SetStateAction } from "react";
import { useFormContext } from "react-hook-form";
import { PostStepNameType } from "@/types/index";
import DetailInfo from "./DetailInfo";
import MainInfo from "./MainInfo";
import StarInfo from "./StarInfo";
import SubInfo from "./SubInfo";

const POST_STEPS: PostStepNameType[] = ["행사 대상", "행사 정보", "특전 정보", "상세 설명"];

interface Props {
  Funnel: any;
  Step: any;
  setStep: Dispatch<SetStateAction<PostStepNameType>>;
  currentStep: PostStepNameType;
}

const PostFunnel = ({ Funnel, Step, setStep, currentStep }: Props) => {
  const { getValues } = useFormContext();

  const handlePrevClick = () => {
    currentStep === POST_STEPS[0] ? window.history.back() : setStep(POST_STEPS[POST_STEPS.indexOf(currentStep) - 1]);
  };

  const handleNextClick = () => {
    const input = getValues();
    sessionStorage.setItem("post", JSON.stringify(input));
    return setStep(POST_STEPS[POST_STEPS.indexOf(currentStep) + 1]);
  };

  return (
    <Funnel>
      <Step name={POST_STEPS[0]}>
        <StarInfo onNextStep={handleNextClick} />
      </Step>
      <Step name={POST_STEPS[1]}>
        <MainInfo onNextStep={handleNextClick} onPrevStep={handlePrevClick} />
      </Step>
      <Step name={POST_STEPS[2]}>
        <SubInfo onNextStep={handleNextClick} onPrevStep={handlePrevClick} />
      </Step>
      <Step name={POST_STEPS[3]}>
        <DetailInfo onPrevStep={handlePrevClick} />
      </Step>
    </Funnel>
  );
};

export default PostFunnel;
