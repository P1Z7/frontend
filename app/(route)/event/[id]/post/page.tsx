"use client";

import { ButtonHTMLAttributes, ReactNode, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import InputFile from "@/components/input/InputFile";
import InputText from "@/components/input/InputText";

interface FormValues {
  description: string;
  image: File[];
}

const ReviewPostPage = () => {
  const [evaluation, setEvaluation] = useState<boolean | null>(null);
  const isEvaluation = evaluation !== null;

  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid },
  } = useForm<FormValues>({
    defaultValues: {
      description: "",
      image: [],
    },
    mode: "onBlur",
  });

  const postReview: SubmitHandler<FormValues> = (form) => {
    console.log(form);
  };

  return (
    <form noValidate onSubmit={handleSubmit(postReview)} className="h-400 w-full border border-solid border-black p-12">
      <div>
        <span>평가</span>
        <div className="flex">
          <EvaluationButton selected={isEvaluation && evaluation} onClick={() => setEvaluation(true)}>
            최고의 행사, 추천합니다!
          </EvaluationButton>
          <EvaluationButton selected={isEvaluation && !evaluation} onClick={() => setEvaluation(false)}>
            {"아쉬웠어요. :("}
          </EvaluationButton>
        </div>
      </div>
      <InputText control={control} name="description">
        상세 내용
      </InputText>
      <InputFile control={control} name="image" />
      <p className="bg-gray-300">허위 등록, 악의적인 등록은 삭제될 수 있으며, 이로 인한 피해가 발생할 경우 전적으로 게시자가 책임집니다.(대략이런내용)</p>
      <div>
        <input type="checkbox" />
        <span>동의합니다.</span>
      </div>
      <button disabled={!(isDirty && isValid && isEvaluation)} className="h-40 w-full border border-solid border-black disabled:bg-slate-300">
        작성하기
      </button>
    </form>
  );
};

export default ReviewPostPage;

interface EvaluationButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  selected: boolean | null;
}

const EvaluationButton = ({ children, selected, onClick }: EvaluationButtonProps) => {
  return (
    <button onClick={onClick} className={`h-40 w-full border border-solid border-black ${selected ? "bg-gray-500" : "bg-gray-100"}`}>
      {children}
    </button>
  );
};
