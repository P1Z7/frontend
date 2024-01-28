import { useState } from "react";
import { useFormContext } from "react-hook-form";
import ProgressBar from "@/components/ProgressBar";
import { PostType } from "../page";
import FunnelTitle from "./FunnelTitle";
import PostFooter from "./PostFooter";
import DetailInput from "./_inputs/DetailInput";

const DetailInfo = () => {
  const { getValues, setValue, control, watch } = useFormContext<PostType>();
  const [isCheck, setIsCheck] = useState(false);
  const [imgList, setImgList] = useState<File[]>(getValues("images"));
  const { images } = watch();

  const handleNextClick = () => {
    setValue("images", imgList);
  };

  return (
    <div className="flex flex-col gap-24">
      <ProgressBar ratio="full" />
      <FunnelTitle step="상세 설명" />
      <DetailInput
        isCheck={isCheck}
        setIsCheck={setIsCheck}
        imgList={imgList}
        setImgList={setImgList}
        images={images}
        control={control}
        getValues={getValues}
        setValue={setValue}
      />
      <PostFooter onNextStep={handleNextClick} isDisabled={!isCheck || getValues("detailText").length > 100} />
    </div>
  );
};

export default DetailInfo;
