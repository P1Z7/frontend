import { SignupStepNameType } from "@/types/index";

const SIGNUP_FUNNEL_TITLE: Record<SignupStepNameType, string> = {
  "계정 정보": "로그인 정보를 입력해주세요",
  "프로필 정보": "프로필을 입력해주세요",
  "아티스트 선택": "좋아하는 아티스트를 선택해주세요",
};

interface Props {
  name: SignupStepNameType;
}

const SignupFunnelTitle = ({ name }: Props) => {
  return <div className="pt-36 text-20 font-700 text-gray-900">{SIGNUP_FUNNEL_TITLE[name]}</div>;
};

export default SignupFunnelTitle;
