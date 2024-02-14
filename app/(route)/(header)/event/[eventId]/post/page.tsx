"use client";

import LoadingDot from "@/(route)/(bottom-nav)/signin/_components/LoadingDot";
import { useParams, useRouter } from "next/navigation";
import { ButtonHTMLAttributes, ChangeEvent, InputHTMLAttributes, ReactNode, useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import WarningCheck from "@/components/WarningCheck";
import Button from "@/components/button";
import InputArea from "@/components/input/InputArea";
import InputFile from "@/components/input/InputFile";
import { Api } from "@/api/api";
import { useStore } from "@/store/index";
import { makeImgUrlList } from "@/utils/changeImgUrl";
import PartyIcon from "@/public/icon/party.svg";
import SadIcon from "@/public/icon/sad.svg";
import { MemoizedImageList } from "./_components/MemoizedImageList";

const USER_ID = "4a256531-6f40-41de-aba2-d37d7507e5d7";

interface FormValues {
  description: string;
  images: File[];
}

const ReviewPostPage = () => {
  const [evaluation, setEvaluation] = useState<boolean | null>(null);
  const [isPublic, setIsPublic] = useState<boolean | null>(null);
  const { isCheck, setIsCheck } = useStore((state) => ({ isCheck: state.isWarningCheck, setIsCheck: state.setIsWarningCheck }));
  const isEvaluated = evaluation !== null;

  const handleRadioClick = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "공개") {
      setIsPublic(true);
    } else {
      setIsPublic(false);
    }
  };

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
  const [imageList, setImageList] = useState<File[]>([]);

  const handleRemoveImage = useCallback((removingImage: File) => {
    setImageList((prev) => prev.filter((image) => image !== removingImage));
  }, []);

  useEffect(() => {
    const nextImageList = Array.from(images).filter((image) => !imageList.includes(image));
    setImageList((prev) => [...prev, ...nextImageList]);
  }, [images]);

  const isDisabled = !(isDirty && isValid && isEvaluated && isCheck && isPublic !== null);

  const instance = new Api(process.env.NEXT_PUBLIC_ACCESS_TOKEN);
  const { eventId } = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const postReview: SubmitHandler<FormValues> = async (form) => {
    setIsLoading(true);
    const imagesUrl = await makeImgUrlList(imageList, instance);
    try {
      await instance.post("/reviews", {
        userId: USER_ID,
        eventId: Array.isArray(eventId) ? eventId[0] : eventId,
        isPublic: Boolean(isPublic),
        rating: Boolean(evaluation),
        reviewImages: imagesUrl,
        description: form.description,
        isAgree: isCheck,
      });
      router.push(`/event/${eventId}`);
    } catch (e) {
      console.error(e);
      toast.error("후기 등록에 실패하였습니다", {
        position: "bottom-center",
        style: {
          padding: "16px 28px",
          fontFamily: "Pretendard",
          fontWeight: "600",
          fontSize: "16px",
          marginBottom: "90px",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsCheck(false);
  }, []);

  return (
    <form noValidate onSubmit={handleSubmit(postReview)} className="relative w-full">
      <div className="flex w-full flex-col gap-16 px-20 py-16">
        <section>
          <div className="pb-16 text-16 font-400">공개 범위</div>
          <div className="flex w-full justify-between">
            <RadioButton value={"비공개"} onChange={handleRadioClick}>
              나만보기(비공개)
            </RadioButton>
            <RadioButton value={"공개"} onChange={handleRadioClick}>
              전체공개
            </RadioButton>
          </div>
        </section>
        <section>
          <div className="pb-8 text-16 font-400">평가</div>
          <div className="flex gap-8">
            <EvaluationButton selected={isEvaluated && evaluation} onClick={() => setEvaluation(true)}>
              <PartyIcon stroke={isEvaluated && evaluation ? "#EB278C" : "#A0A5B1"} />
              <span className="text-left">
                최고의 행사, <br />
                추천합니다!
              </span>
            </EvaluationButton>
            <EvaluationButton selected={isEvaluated && !evaluation} onClick={() => setEvaluation(false)}>
              <SadIcon stroke={isEvaluated && !evaluation ? "#EB278C" : "#A0A5B1"} />
              <span className="text-left">
                조금 <br />
                아쉬웠어요...
              </span>
            </EvaluationButton>
          </div>
        </section>
        <section>
          <div className="pb-8 text-16 font-400">이미지</div>
          <ul className="flex gap-8 overflow-x-auto">
            <li className="shrink-0">
              <InputFile control={control} name="images" />
            </li>
            <MemoizedImageList imageList={imageList} handleRemoveImage={handleRemoveImage} />
          </ul>
        </section>
        <InputArea control={control} name="description" hasLimit>
          상세 내용
        </InputArea>
        <WarningCheck />
      </div>
      <div className={`sticky bottom-0 h-92 w-full border-t border-gray-50 bg-white-black pb-24 pt-12 transition-all ${isLoading ? "px-72" : "px-20"}`}>
        <Button type="lined" size="xl" isDisabled={isDisabled || isLoading}>
          {isLoading ? <LoadingDot /> : "후기 작성하기"}
        </Button>
      </div>
    </form>
  );
};

export default ReviewPostPage;

interface RadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  children: ReactNode;
}

const RadioButton = ({ children, value, onChange }: RadioButtonProps) => {
  return (
    <label className="flex w-1/2 cursor-pointer items-center gap-4 text-14 font-400">
      <input
        className="h-16 w-16 cursor-pointer appearance-none rounded-full border-2 border-gray-200 checked:border-[0.5rem] checked:border-main-pink-500 hover:bg-main-pink-50"
        name="public"
        type="radio"
        value={value}
        onChange={onChange}
      />
      {children}
    </label>
  );
};

interface EvaluationButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  selected: boolean | null;
}

const EvaluationButton = ({ children, selected, onClick }: EvaluationButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-56 w-1/2 items-center gap-8 rounded-sm border px-12 text-14 font-400 ${selected ? "border-main-pink-300 bg-main-pink-50 text-main-pink-white" : "border-gray-200 text-gray-400"}`}
    >
      {children}
    </button>
  );
};
