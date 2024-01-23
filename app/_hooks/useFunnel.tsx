import { ReactElement, ReactNode, useState } from "react";

export const useFunnel = (initial: string[]) => {
  // "카페이름" | "연예인" | "날짜" | "장소";
  const [names, setNames] = useState(initial ?? []);

  // ["카페이름", "연예인"];

  const Funnel = ({ children }: { children: ReactElement[] }) => {
    const currentStep = children.filter((child) => names.includes(child.props.name));
    return currentStep;
  };

  return { Funnel, names, setNames };

  // const Step = (props: any) => {
  //   return <>{props.children}</>;
  // };

  // const Funnel = ({ children }: any) => {
  //   const targetStep = children.find((childStep: any) => childStep.props.name === step);
  //   return Object.assign(targetStep, { Step });
  // };
  // return [Funnel, setStep];
};
