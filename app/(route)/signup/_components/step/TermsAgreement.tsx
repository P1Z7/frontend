import { NodeProps } from "postcss";
import { ReactElement, useState } from "react";
import CheckBox from "@/components/CheckBox";
import BottomButton from "@/components/button/BottomButton";
import TermsAndConditions from "../TermsAndConditions";
import PrivacyPolicy from "./PrivacyPolicy";

const TYPE = {
  이용약관: {
    title: "이용약관 동의 (필수)",
    contents: <TermsAndConditions />,
  },
  개인정보처리방침: {
    title: "개인정보처리방침 (필수)",
    contents: <PrivacyPolicy />,
  },
};

const TermsAgreement = ({ onNext }: { onNext: () => void }) => {
  const [isCheck, setIsCheck] = useState(false);
  return (
    <>
      <div className="flex flex-col gap-20 pb-160 pt-36 pc:pb-0">
        <Term title={TYPE["이용약관"].title} contents={TYPE["이용약관"].contents} />
        <Term title={TYPE["개인정보처리방침"].title} contents={TYPE["개인정보처리방침"].contents} />
      </div>
      <BottomButton onClick={onNext}>다음으로</BottomButton>
    </>
  );
};

export default TermsAgreement;

interface TermProps {
  title: string;
  contents: ReactElement;
}

const Term = ({ title, contents }: TermProps) => {
  const [isCheck, setIsCheck] = useState(false);

  return (
    <div className="flex flex-col gap-12 pb-20">
      <CheckBox isCheck={isCheck} setIsCheck={setIsCheck}>
        {title}
      </CheckBox>
      <div className="flex h-172 w-full overflow-scroll rounded-sm bg-gray-50 px-12 py-8 text-14">{contents}</div>
    </div>
  );
};
