import { useFormContext } from "react-hook-form";
import ProgressBar from "@/components/ProgressBar";
import BottomButton from "@/components/button/BottomButton";
import { PostType } from "../page";
import FunnelTitle from "./FunnelTitle";
import PostFrame from "./PostFrame";
import StarInput from "./_inputs/StarInput";

interface Props {
  onNextStep?: () => void;
}

const StarInfo = ({ onNextStep }: Props) => {
  const { watch } = useFormContext<PostType>();
  const { artistNames, groupName, eventType, groupId } = watch();
  const isDisabled = !groupName || (groupId && artistNames.length === 0) || !eventType;
  return (
    <div className="flex h-full flex-col justify-between">
      <PostFrame>
        <div className="flex flex-col gap-28">
          <ProgressBar ratio="1/4" />
          <FunnelTitle step="행사 대상" isRequired />
        </div>
        <StarInput />
      </PostFrame>
      <BottomButton onClick={onNextStep} isDisabled={isDisabled}>
        다음으로
      </BottomButton>
    </div>
  );
};

export default StarInfo;
