import { useFormContext } from "react-hook-form";
import ProgressBar from "@/components/ProgressBar";
import BottomButton from "@/components/button/BottomButton";
import { useStore } from "@/store/index";
import { PostType } from "../page";
import FunnelTitle from "./FunnelTitle";
import PostFrame from "./PostFrame";
import DetailInput from "./_inputs/DetailInput";

const DetailInfo = () => {
  const { isCheck } = useStore((state) => ({ isCheck: state.isWarningCheck }));
  const { getValues } = useFormContext<PostType>();

  return (
    <PostFrame>
      <div className="flex flex-col gap-28">
        <ProgressBar ratio="full" />
        <FunnelTitle step="상세 설명" />
      </div>
      <DetailInput />
      <BottomButton isDisabled={!isCheck || getValues("detailText").length > 100}>작성 완료</BottomButton>
    </PostFrame>
  );
};

export default DetailInfo;
