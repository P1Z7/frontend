"use client";

import "react-day-picker/dist/style.css";
import { useFormContext } from "react-hook-form";
import ProgressBar from "@/components/ProgressBar";
import BottomButton from "@/components/button/BottomButton";
import { PostType } from "../page";
import FunnelTitle from "./FunnelTitle";
import PostFrame from "./PostFrame";
import MainInput from "./_inputs/MainInput";

interface Props {
  onNextStep?: () => void;
}

const MainInfo = ({ onNextStep }: Props) => {
  const {
    watch,
    formState: { isValid },
  } = useFormContext<PostType>();

  const { placeName, address, startDate, endDate } = watch();
  const isDisabled = !placeName || !address || !startDate || !endDate || !isValid;

  return (
    <PostFrame>
      <div className="flex flex-col gap-28">
        <ProgressBar ratio="1/2" />
        <FunnelTitle step="행사 정보" isRequired />
      </div>
      <MainInput />
      <BottomButton onClick={onNextStep} isDisabled={isDisabled}>
        다음으로
      </BottomButton>
    </PostFrame>
  );
};

export default MainInfo;
