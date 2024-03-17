import { ReactElement, useEffect, useState } from "react";
import CheckBox from "@/components/CheckBox";
import { SignUpFormType } from "@/types/index";
import ArrowIcon from "@/public/icon/arrow-right_sm.svg";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsAndConditions from "./TermsAndConditions";

export const TERMS_TYPE = {
  이용약관: {
    formTitle: "termsAndConditions" as keyof SignUpFormType,
    title: "이용약관 동의 (필수)",
    contents: <TermsAndConditions />,
    link: "https://myopener.notion.site/1-8106e4b6dac949fe9c7b388ddf8da8d6",
  },
  개인정보처리방침: {
    formTitle: "privacyPolicy" as keyof SignUpFormType,
    title: "개인정보처리방침 (필수)",
    contents: <PrivacyPolicy />,
    link: "https://myopener.notion.site/2-7c91f8ae420b4849b872b45edc40d76d",
  },
};

interface TermProps {
  title: string;
  contents: ReactElement;
  setValue: (formTitle: keyof SignUpFormType, isCheck: boolean) => void;
  formTitle: keyof SignUpFormType;
  value: boolean;
  link?: string;
}

const Term = ({ title, contents, setValue, value, formTitle, link }: TermProps) => {
  const [isCheck, setIsCheck] = useState(value);

  useEffect(() => {
    setValue(formTitle, isCheck);
  }, [isCheck]);

  return (
    <div className="flex flex-col gap-12 pb-20 pc:flex-row pc:items-center pc:justify-between pc:gap-0 pc:pb-0">
      <CheckBox isCheck={isCheck} setIsCheck={setIsCheck}>
        {title}
      </CheckBox>
      <div className="flex h-172 w-full rounded-sm bg-gray-50 px-12 py-8 text-14 tablet:h-320 pc:hidden">{contents}</div>
      <button className="hidden items-center pc:flex" onClick={() => window.open(link)} type="button">
        <p className="text-14 font-500 text-gray-500">전체보기</p>
        <ArrowIcon stroke="#7E8695" />
      </button>
    </div>
  );
};

export default Term;
