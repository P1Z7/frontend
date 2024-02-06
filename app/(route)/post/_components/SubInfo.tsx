"use client";

import ProgressBar from "@/components/ProgressBar";
import BottomButton from "@/components/button/BottomButton";
import FunnelTitle from "./FunnelTitle";
import PostFrame from "./PostFrame";
import SubInput from "./_inputs/SubInput";

interface Props {
  onNextStep?: () => void;
}

const SubInfo = ({ onNextStep }: Props) => {
  return (
    <PostFrame>
      <div className="flex flex-col gap-28">
        <ProgressBar ratio="3/4" />
        <FunnelTitle step="특전 정보" />
      </div>
      <SubInput />
      <BottomButton onClick={onNextStep}>다음으로</BottomButton>
    </PostFrame>
  );
};

export default SubInfo;
