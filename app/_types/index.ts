import { ReactElement, ReactNode } from "react";

export interface MapType {
  name: string;
  address: string;
}

export type StepNameType = "계정 정보" | "프로필 정보" | "아티스트 선택";

export interface StepType {
  name: StepNameType;
  children: ReactNode;
}

export interface FunnelType {
  children: Array<ReactElement<StepType>>;
}

export interface ProfileSetupType {
  steps: StepNameType[];
  handleNextClick: (nextStep: StepNameType) => void;
  Funnel: React.ComponentType<FunnelType>;
  Step: React.ComponentType<StepType>;
}

export interface SignUpFormType {
  email: string;
  password: string;
  passwordCh: string;
  profileImg: string;
  nickName: string;
  myArtists: string[] | [];
}
