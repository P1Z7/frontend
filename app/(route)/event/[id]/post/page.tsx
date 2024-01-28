"use client";

import Image from "next/image";
import { ButtonHTMLAttributes, ReactNode, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import InputFile from "@/components/input/InputFile";
import InputText from "@/components/input/InputText";

interface FormValues {
  description: string;
  images: File[];
}

const ReviewPostPage = () => {
  const [evaluation, setEvaluation] = useState<boolean | null>(null);
  const isEvaluated = evaluation !== null;

  const [checked, setChecked] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid },
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      description: "",
      images: [],
    },
    mode: "onBlur",
  });

  const { images } = watch();

  const isDisabled = !(isDirty && isValid && isEvaluated && checked);

  const postReview: SubmitHandler<FormValues> = (form) => {
    console.log({ evaluation, ...form });
  };

  return (
    <form noValidate onSubmit={handleSubmit(postReview)} className="h-400 w-full border border-solid border-black p-12">
      <div>
        <span className="text-14">평가</span>
        <div className="flex">
          <EvaluationButton selected={isEvaluated && evaluation} onClick={() => setEvaluation(true)}>
            최고의 행사, 추천합니다!
          </EvaluationButton>
          <EvaluationButton selected={isEvaluated && !evaluation} onClick={() => setEvaluation(false)}>
            {"아쉬웠어요. :("}
          </EvaluationButton>
        </div>
      </div>
      <InputText
        control={control}
        name="description"
        maxLength={100}
        rules={{
          required: "내용을 작성해주세요.",
          pattern: {
            value: /^.{0,100}$/,
            message: "100자 이내로 작성해주세요.",
          },
        }}
      >
        상세 내용
      </InputText>
      <ul className="flex gap-8 overflow-x-auto">
        <li className="flex-shrink-0">
          <InputFile control={control} name="images">
            이미지
          </InputFile>
        </li>
        {Array.from(images)?.map((image, index) => (
          <li key={index} className="relative h-100 w-100 flex-shrink-0">
            <Image src={URL.createObjectURL(image)} alt="선택한 사진 미리보기" fill className="object-cover" />
          </li>
        ))}
      </ul>
      <div>
        <p className="bg-gray-300">허위 등록, 악의적인 등록은 삭제될 수 있으며, 이로 인한 피해가 발생할 경우 전적으로 게시자가 책임집니다.(대략이런내용)</p>
        <input type="checkbox" checked={checked} onChange={() => setChecked((prev) => !prev)} />
        <span>동의합니다.</span>
      </div>
      <button disabled={isDisabled} className="h-40 w-full border border-solid border-black disabled:bg-slate-300">
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
    <button type="button" onClick={onClick} className={`h-40 w-full border border-solid border-black ${selected ? "bg-gray-500" : "bg-gray-100"}`}>
      {children}
    </button>
  );
};
