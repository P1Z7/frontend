"use client";

import GenericFormProvider from "@/components/GenericFormProvider";
import MetaTag from "@/components/MetaTag";
import DottedLayout from "@/components/layout/DottedLayout";
import { useFunnel } from "@/hooks/useFunnel";
import { ResetPasswordNameType, ResetPwFormType } from "@/types/index";
import { META_TAG } from "@/constants/metaTag";
import ResetPwSetup from "./_components/ResetPwSetup";

const STEPS: ResetPasswordNameType[] = ["인증", "재설정"];

const DEFAULT_VALUES: ResetPwFormType = {
  email: "",
  password: "",
  passwordCheck: "",
  verificationNumber: "",
};

const ResetPassword = () => {
  const { Funnel, Step, setStep, currentStep } = useFunnel(STEPS);

  const handleNextClick = (step: ResetPasswordNameType) => {
    setStep(step);
  };
  const handlePrevClick = () => {
    const stepIndex = STEPS.indexOf(currentStep);
    setStep(STEPS[stepIndex - 1]);
  };

  return (
    <>
      <MetaTag title={META_TAG.resetPassword["title"]} description={META_TAG.resetPassword["description"]} />
      <DottedLayout size="extraNarrow">
        <div className="flex h-[calc(100%-13.8rem)] grow flex-col px-20 tablet:px-40 pc:px-0">
          <GenericFormProvider<ResetPwFormType> formOptions={{ mode: "onBlur", defaultValues: DEFAULT_VALUES }}>
            <ResetPwSetup steps={STEPS} handleNextClick={handleNextClick} handlePrevClick={handlePrevClick} Funnel={Funnel} Step={Step} />
          </GenericFormProvider>
        </div>
      </DottedLayout>
    </>
  );
};

export default ResetPassword;
