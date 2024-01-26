import React, { ReactElement, useState } from "react";
import { FunnelType, StepNameType, StepType } from "../_types";

export const useFunnel = (defaultStep: StepNameType) => {
  const [step, setStep] = useState(defaultStep);

  const Step = (props: StepType): ReactElement => {
    return <>{props.children}</>;
  };

  const Funnel = ({ children }: FunnelType): ReactElement => {
    const targetStep = children.find((childStep) => childStep.props.name === step);

    return <>{targetStep}</>;
  };

  return { Funnel, Step, setStep, currentStep: step } as const;
};
