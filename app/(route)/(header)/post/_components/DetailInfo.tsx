import { useFormContext } from "react-hook-form";
import ProgressBar from "@/components/ProgressBar";
import BottomButton from "@/components/button/BottomButton";
import { useStore } from "@/store/index";
import { PostType } from "../page";
import FunnelTitle from "./FunnelTitle";
import PostFooter from "./PostFooter";
import DetailInput from "./_inputs/DetailInput";

const DetailInfo = () => {
  const { isCheck } = useStore((state) => ({ isCheck: state.isWarningCheck }));
  const { getValues } = useFormContext<PostType>();

  return (
    <div className="flex flex-col gap-24">
      <ProgressBar ratio="full" />
      <FunnelTitle step="상세 설명" />
      <DetailInput />
      {/* <PostFooter isDisabled={!isCheck || getValues("detailText").length > 100} /> */}
      <BottomButton isDisabled={!isCheck || getValues("detailText").length > 100}>작성 완료</BottomButton>
    </div>
  );
};

export default DetailInfo;
