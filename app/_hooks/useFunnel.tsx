import React, { ReactElement, useState } from "react";
import { FunnelType, SignupStepNameType, StepType } from "../_types";

export const useFunnel = <T extends SignupStepNameType>(defaultStepArray: readonly T[]) => {
  const firstStep = defaultStepArray[0];
  const [step, setStep] = useState(firstStep);

  const Step = (props: StepType<T>): ReactElement => {
    return <>{props.children}</>;
  };

  const Funnel = ({ children }: FunnelType<T>): ReactElement => {
    const targetStep = children.find((childStep) => childStep.props.name === step);

    return <>{targetStep}</>;
  };

  return { Funnel, Step, setStep, currentStep: step } as const;
};
