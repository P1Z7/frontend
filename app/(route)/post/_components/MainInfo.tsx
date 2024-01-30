"use client";

import "react-day-picker/dist/style.css";
import { useFormContext } from "react-hook-form";
import ProgressBar from "@/components/ProgressBar";
import { PostType } from "../page";
import FunnelTitle from "./FunnelTitle";
import PostFooter from "./PostFooter";
import MainInput from "./_inputs/MainInput";

interface Props {
  onNextStep?: () => void;
}

const MainInfo = ({ onNextStep }: Props) => {
  const {
    watch,
    formState: { isValid },
  } = useFormContext<PostType>();

  const { title, address, startDate, endDate } = watch();
  const isDisabled = !title || !address || !startDate || !endDate || !isValid;

  return (
    <div className="flex flex-col gap-24">
      <ProgressBar ratio="1/2" />
      <FunnelTitle step="행사 정보" isRequired />
      <MainInput />
      <PostFooter onNextStep={onNextStep} isDisabled={isDisabled} />
    </div>
  );
};

export default MainInfo;
