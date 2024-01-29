import { useState } from "react";
import { useFormContext } from "react-hook-form";
import ProgressBar from "@/components/ProgressBar";
import { useStore } from "@/store/index";
import { PostType } from "../page";
import FunnelTitle from "./FunnelTitle";
import PostFooter from "./PostFooter";
import DetailInput from "./_inputs/DetailInput";

const DetailInfo = () => {
  const { isCheck } = useStore((state) => ({ isCheck: state.isWarningCheck }));
  const { getValues, setValue, control, watch } = useFormContext<PostType>();
  const [imgList, setImgList] = useState<(File | string)[]>(getValues("images"));
  const { images } = watch();

  return (
    <div className="flex flex-col gap-24">
      <ProgressBar ratio="full" />
      <FunnelTitle step="상세 설명" />
      <DetailInput imgList={imgList} setImgList={setImgList} images={images} control={control} getValues={getValues} setValue={setValue} />
      <PostFooter isDisabled={!isCheck || getValues("detailText").length > 100} />
    </div>
  );
};

export default DetailInfo;
