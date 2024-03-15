import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import BottomButton from "@/components/button/BottomButton";
import { SignUpFormType } from "@/types/index";
import Term, { TERMS_TYPE } from "../Term";

const TermsAgreement = ({ onNext }: { onNext: () => void }) => {
  const [checkInnerWidth, setCheckInnerWidth] = useState(false);
  const { setValue, watch } = useFormContext<SignUpFormType>();
  const { termsAndConditions, privacyPolicy } = watch();

  useEffect(() => {
    if (window.innerWidth >= 1200) {
      onNext();
    }
    if (window.innerWidth < 1200) {
      setCheckInnerWidth(true);
    }
  }, []);

  if (!checkInnerWidth) return;
  return (
    <>
      <div className="flex flex-col gap-20 pb-160 pt-36 pc:pb-0">
        <Term
          title={TERMS_TYPE["이용약관"].title}
          contents={TERMS_TYPE["이용약관"].contents}
          setValue={setValue}
          formTitle={TERMS_TYPE["이용약관"].formTitle}
          value={termsAndConditions}
        />
        <Term
          title={TERMS_TYPE["개인정보처리방침"].title}
          contents={TERMS_TYPE["개인정보처리방침"].contents}
          setValue={setValue}
          formTitle={TERMS_TYPE["개인정보처리방침"].formTitle}
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
