import { useEffect, useState } from "react";
import { useFunnel } from "@/hooks/useFunnel";
import useGetWindowWidth from "@/hooks/useGetWindowWidth";
import { PostStepNameType } from "@/types/index";
import PostFunnel from "./PostFunnel";
import PostPc from "./PostPc";

const POST_STEPS: PostStepNameType[] = ["행사 대상", "행사 정보", "특전 정보", "상세 설명"];

const PostContent = () => {
  const { Funnel, Step, setStep, currentStep } = useFunnel<PostStepNameType>(POST_STEPS);
  const [isPc, setIsPc] = useState(false);
  const { isPc: isPcSize } = useGetWindowWidth();

  useEffect(() => {
    setIsPc(isPcSize);
  }, [isPcSize]);

  return <>{isPc ? <PostPc /> : <PostFunnel Funnel={Funnel} Step={Step} setStep={setStep} currentStep={currentStep} />}</>;
};

export default PostContent;
