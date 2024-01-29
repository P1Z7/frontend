import ProgressBar from "@/components/ProgressBar";
import FunnelTitle from "./FunnelTitle";
import PostFooter from "./PostFooter";
import StarInput from "./_inputs/StarInput";

interface Props {
  onNextStep?: () => void;
}

const StarInfo = ({ onNextStep }: Props) => {
  return (
    <div className="flex flex-col gap-24">
      <ProgressBar ratio="1/4" />
      <FunnelTitle step="행사 대상" isRequired />
      <StarInput />
      <PostFooter onNextStep={onNextStep} />
    </div>
  );
};

export default StarInfo;
