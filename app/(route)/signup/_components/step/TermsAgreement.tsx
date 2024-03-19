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
        {["이용약관", "개인정보처리방침"].map((item) => (
          <Term {...TERMS_TYPE[item]} setValue={setValue} value={termsAndConditions} />
        ))}
      </div>
      <BottomButton onClick={onNext} isDisabled={!termsAndConditions || !privacyPolicy}>
        다음으로
      </BottomButton>
    </>
  );
};

export default TermsAgreement;
