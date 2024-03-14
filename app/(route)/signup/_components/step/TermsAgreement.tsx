import { ReactElement, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import CheckBox from "@/components/CheckBox";
import BottomButton from "@/components/button/BottomButton";
import { SignUpFormType } from "@/types/index";
import PrivacyPolicy from "../PrivacyPolicy";
import TermsAndConditions from "../TermsAndConditions";

const TYPE = {
  이용약관: {
    formTitle: "termsAndConditions" as keyof SignUpFormType,
    title: "이용약관 동의 (필수)",
    contents: <TermsAndConditions />,
  },
  개인정보처리방침: {
    formTitle: "privacyPolicy" as keyof SignUpFormType,
    title: "개인정보처리방침 (필수)",
    contents: <PrivacyPolicy />,
  },
};

const TermsAgreement = ({ onNext }: { onNext: () => void }) => {
  const { setValue, watch } = useFormContext<SignUpFormType>();
  const { termsAndConditions, privacyPolicy } = watch();

  return (
    <>
      <div className="flex flex-col gap-20 pb-160 pt-36 pc:pb-0">
        <Term title={TYPE["이용약관"].title} contents={TYPE["이용약관"].contents} setValue={setValue} formTitle={TYPE["이용약관"].formTitle} value={termsAndConditions} />
        <Term
          title={TYPE["개인정보처리방침"].title}
          contents={TYPE["개인정보처리방침"].contents}
          setValue={setValue}
          formTitle={TYPE["개인정보처리방침"].formTitle}
          value={privacyPolicy}
        />
      </div>
      <BottomButton onClick={onNext} isDisabled={!termsAndConditions || !privacyPolicy}>
        다음으로
      </BottomButton>
    </>
  );
};

export default TermsAgreement;

interface TermProps {
  title: string;
  contents: ReactElement;
  setValue: (formTitle: keyof SignUpFormType, isCheck: boolean) => void;
  formTitle: keyof SignUpFormType;
  value: boolean;
}

const Term = ({ title, contents, setValue, value, formTitle }: TermProps) => {
  const [isCheck, setIsCheck] = useState(value);

  useEffect(() => {
    setValue(formTitle, isCheck);
  }, [isCheck]);

  return (
    <div className="flex flex-col gap-12 pb-20">
      <CheckBox isCheck={isCheck} setIsCheck={setIsCheck}>
        {title}
      </CheckBox>
      <div className="flex h-172 w-full rounded-sm bg-gray-50 px-12 py-8 text-14 tablet:h-320">{contents}</div>
    </div>
  );
};
