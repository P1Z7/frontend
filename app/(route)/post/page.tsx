"use client";

import { useEffect, useState } from "react";
import GenericFormProvider from "@/components/GenericFormProvider";
import MetaTag from "@/components/MetaTag";
import DottedLayout from "@/components/layout/DottedLayout";
import { useFunnel } from "@/hooks/useFunnel";
import useGetWindowWidth from "@/hooks/useGetWindowWidth";
import { PostStepNameType } from "@/types/index";
import { META_TAG } from "@/constants/metaTag";
import LoadingDot from "../signin/_components/LoadingDot";
import PostFunnel from "./_components/PostFunnel";
import PostPc from "./_components/PostPc";

const DEFAULT_INPUT_VALUES = {
  placeName: "",
  eventType: "",
  groupId: "",
  artists: [],
  groupName: "",
  artistNames: [],
  startDate: "",
  endDate: "",
  address: "",
  addressDetail: "",
  userId: "",
  eventImages: [],
  description: "",
  eventUrl: "",
  organizerSns: "",
  snsType: "트위터",
  tags: [],
};

const POST_STEPS: PostStepNameType[] = ["행사 대상", "행사 정보", "특전 정보", "상세 설명"];

export type PostType = Omit<typeof DEFAULT_INPUT_VALUES, "artists" | "artistNames" | "eventImages" | "tags"> & {
  artists: string[];
  artistNames: string[];
  eventImages: (File | string)[];
  tags: string[];
};

const Post = () => {
  const { Funnel, Step, setStep, currentStep } = useFunnel<PostStepNameType>(POST_STEPS);
  const [defaultValue, setDefaultValue] = useState(DEFAULT_INPUT_VALUES);
  const [isInit, setIsInit] = useState(false);
  const [isPc, setIsPc] = useState(false);
  const { isPc: isPcSize } = useGetWindowWidth();

  useEffect(() => {
    setIsPc(isPcSize);
  }, [isPcSize]);

  useEffect(() => {
    if (sessionStorage.getItem("post")) {
      setDefaultValue(JSON.parse(sessionStorage.getItem("post") as string));
    }
    setIsInit(true);
  }, []);

  return (
    <>
      <MetaTag title={META_TAG.post["title"]} description={META_TAG.post["description"]} />
      <DottedLayout size="narrow">
        <div className="flex h-full flex-col">
          <div className="h-full p-20 pb-116 pt-36 text-16 pc:relative pc:min-h-[59.5vh] pc:px-0 pc:pb-0 pc:pt-56 pc:text-20 pc:font-500">
            {isInit ? (
              <GenericFormProvider formOptions={{ mode: "onBlur", defaultValues: defaultValue, shouldFocusError: true }}>
                {isPc ? <PostPc /> : <PostFunnel Funnel={Funnel} Step={Step} setStep={setStep} currentStep={currentStep} />}
              </GenericFormProvider>
            ) : (
              <div className="flex h-[10vh] w-full items-center justify-center">
                <LoadingDot />
              </div>
            )}
          </div>
        </div>
      </DottedLayout>
    </>
  );
};

export default Post;
