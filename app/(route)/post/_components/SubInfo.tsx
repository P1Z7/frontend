"use client";

import { useFormContext } from "react-hook-form";
import ProgressBar from "@/components/ProgressBar";
import { PostType } from "../page";
import FunnelTitle from "./FunnelTitle";
import PostFooter from "./PostFooter";
import SubInput from "./_inputs/SubInput";

interface Props {
  onNextStep?: () => void;
}

const SubInfo = ({ onNextStep }: Props) => {
  const { setValue, getValues } = useFormContext<PostType>();

  return (
    <div className="flex flex-col gap-24">
      <ProgressBar ratio="3/4" />
      <FunnelTitle step="특전 정보" />
      <SubInput setValue={setValue} getValues={getValues} />
      <PostFooter onNextStep={onNextStep} />
    </div>
  );
};

export default SubInfo;
