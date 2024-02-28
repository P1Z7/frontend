import LoadingDot from "@/(route)/(bottom-nav)/signin/_components/LoadingDot";
import { useFormContext } from "react-hook-form";
import ProgressBar from "@/components/ProgressBar";
import BottomButton from "@/components/button/BottomButton";
import { useStore } from "@/store/index";
import { PostType } from "../page";
import FunnelTitle from "./FunnelTitle";
import PostFrame from "./PostFrame";
import DetailInput from "./_inputs/DetailInput";

interface Props {
  onPrevStep?: () => void;
}

const DetailInfo = ({ onPrevStep }: Props) => {
  const { isCheck, postLoading } = useStore((state) => ({ isCheck: state.isWarningCheck, postLoading: state.postLoading }));
  const { watch } = useFormContext<PostType>();
  const { description, eventImages } = watch();

  return (
    <div className="flex h-full flex-col justify-between">
      <PostFrame>
        <div className="flex flex-col gap-28">
          <ProgressBar ratio="full" />
          <FunnelTitle step="상세 설명" />
        </div>
        <DetailInput />
      </PostFrame>
      <BottomButton hasBack onBackClick={onPrevStep} isSubmit isDisabled={!isCheck || description.length > 300 || eventImages.length > 5 || postLoading}>
        {postLoading ? <LoadingDot /> : "작성 완료"}
      </BottomButton>
    </div>
  );
};

export default DetailInfo;
