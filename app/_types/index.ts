import { ReactElement, ReactNode } from "react";

export interface MapType {
  name: string;
  address: string;
}

export type SignupStepNameType = "계정 정보" | "프로필 정보" | "아티스트 선택";

export interface StepType<T> {
  name: T;
  children: ReactNode;
}

export interface FunnelType<T> {
  children: Array<ReactElement<StepType<T>>>;
}

export interface ProfileSetupType<T> {
  steps: SignupStepNameType[];
  handleNextClick: (nextStep: SignupStepNameType) => void;
  Funnel: React.ComponentType<FunnelType<T>>;
  Step: React.ComponentType<StepType<T>>;
}

export interface SignUpFormType {
  email: string;
  password: string;
  passwordCh: string;
  profileImg: string;
  nickName: string;
  myArtists: string[] | [];
}
