import ProgressBar from "@/components/ProgressBar";
import BottomButton from "@/components/button/BottomButton";
import FunnelTitle from "./FunnelTitle";
import PostFrame from "./PostFrame";
import StarInput from "./_inputs/StarInput";

interface Props {
  onNextStep?: () => void;
}

const StarInfo = ({ onNextStep }: Props) => {
  return (
    <PostFrame>
      <div className="flex flex-col gap-28">
        <ProgressBar ratio="1/4" />
        <FunnelTitle step="행사 대상" isRequired />
      </div>
      <StarInput />
      <BottomButton onClick={onNextStep}>다음으로</BottomButton>
    </PostFrame>
  );
};

export default StarInfo;
