import { ReactElement, ReactNode, useState } from "react";

export type StepNameType = "계정 정보" | "프로필 정보" | "아티스트 선택";

export interface StepType<T> {
  name: T;
  children: ReactNode;
}

export interface FunnelType<T> {
  children: Array<ReactElement<StepType<T>>>;
}

const useFunnel = <T extends StepNameType>(defaultStepArray: readonly T[]) => {
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
