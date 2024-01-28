import { useFormContext } from "react-hook-form";
import ProgressBar from "@/components/ProgressBar";
import { PostType } from "../page";
import FunnelTitle from "./FunnelTitle";
import PostFooter from "./PostFooter";
import StarInput from "./_inputs/StarInput";

interface Props {
  onNextStep?: () => void;
}

const StarInfo = ({ onNextStep }: Props) => {
  const { setValue, getValues } = useFormContext<PostType>();

  return (
    <div className="flex flex-col gap-24">
      <ProgressBar ratio="1/4" />
      <FunnelTitle step="행사 대상" />
      <StarInput setValue={setValue} getValues={getValues} />
      <PostFooter onNextStep={onNextStep} />
    </div>
  );
};

export default StarInfo;
