import { ResetPasswordNameType, ResetPwSetupType } from "@/types/index";
import ResetPasswordTitle from "./ResetPasswordTitle";
import AuthEmail from "./step/AuthEmail";
import SetNewPw from "./step/SetNewPw";

const ResetPwSetup = ({ steps, handleNextClick, handlePrevClick, Funnel, Step }: ResetPwSetupType<ResetPasswordNameType>) => {
  return (
    <Funnel>
      <Step name="인증">
        <ResetPasswordTitle name="인증" />
        <AuthEmail onNext={() => handleNextClick(steps[1])} />
      </Step>
      <Step name="재설정">
        <ResetPasswordTitle name="재설정" />
        <SetNewPw onPrev={handlePrevClick} />
      </Step>
    </Funnel>
  );
};

export default ResetPwSetup;
