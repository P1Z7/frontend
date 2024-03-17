import { ResetPasswordNameType } from "@/types/index";

const RESET_PASSWORD_FUNNEL_TITLE: Record<ResetPasswordNameType, string> = {
  인증: "이메일 인증을 진행해주세요.",
  재설정: "비밀번호를 새로 설정해주세요.",
};

interface Props {
  name: ResetPasswordNameType;
}

const ResetPasswordTitle = ({ name }: Props) => {
  return (
    <>
      <h2 className="hidden pt-36 text-14 font-600 text-gray-500 pc:block">비밀번호 찾기</h2>
      <h1 className="pt-36 text-20 font-700 text-gray-900 pc:pt-32">{RESET_PASSWORD_FUNNEL_TITLE[name]}</h1>
    </>
  );
};

export default ResetPasswordTitle;
