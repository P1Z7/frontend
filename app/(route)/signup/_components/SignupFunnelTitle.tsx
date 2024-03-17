import { SignupStepNameType } from "@/types/index";

const SIGNUP_FUNNEL_TITLE: Record<SignupStepNameType, string> = {
  "약관 동의": "오프너의 이용 약관에 동의해주세요.",
  "계정 정보": "로그인 정보를 입력해주세요",
  "프로필 정보": "프로필을 입력해주세요",
  "아티스트 선택": "좋아하는 아티스트를 선택해주세요",
};

interface Props {
  name: SignupStepNameType;
}

const SignupFunnelTitle = ({ name }: Props) => {
  return (
    <>
      <h2 className="hidden pt-36 text-14 font-600 text-gray-500 pc:block">회원가입</h2>
      <h1 className="pt-36 text-20 font-700 text-gray-900 pc:pt-32">{SIGNUP_FUNNEL_TITLE[name]}</h1>
    </>
  );
};

export default SignupFunnelTitle;
