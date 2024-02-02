"use client";

import ProgressBar from "@/components/ProgressBar";
import BottomButton from "@/components/button/BottomButton";
import FunnelTitle from "./FunnelTitle";
import PostFooter from "./PostFooter";
import SubInput from "./_inputs/SubInput";

interface Props {
  onNextStep?: () => void;
}

const SubInfo = ({ onNextStep }: Props) => {
  return (
    <div className="flex flex-col gap-24">
      <ProgressBar ratio="3/4" />
      <FunnelTitle step="특전 정보" />
      <SubInput />
      {/* <PostFooter onNextStep={onNextStep} /> */}
      <BottomButton onClick={onNextStep}>다음으로</BottomButton>
    </div>
  );
};

export default SubInfo;
