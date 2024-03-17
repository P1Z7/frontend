import { ProfileSetupType, SignupStepNameType } from "@/types/index";
import SignupFunnelTitle from "./SignupFunnelTitle";
import AccountInfo from "./step/AccountInfo";
import MyArtistsInfo from "./step/MyArtistsInfo";
import ProfileInfo from "./step/ProfileInfo";
import TermsAgreement from "./step/TermsAgreement";

const ProfileSetup = ({ steps, handleNextClick, handlePrevClick, Funnel, Step }: ProfileSetupType<SignupStepNameType>) => {
  return (
    <Funnel>
      <Step name="약관 동의">
        <SignupFunnelTitle name="약관 동의" />
        <TermsAgreement onNext={() => handleNextClick(steps[1])} />
      </Step>
      <Step name="계정 정보">
        <SignupFunnelTitle name="계정 정보" />
        <AccountInfo onNext={() => handleNextClick(steps[2])} onPrev={handlePrevClick} />
      </Step>
      <Step name="프로필 정보">
        <SignupFunnelTitle name="프로필 정보" />
        <ProfileInfo onNext={() => handleNextClick(steps[3])} onPrev={handlePrevClick} />
      </Step>
      <Step name="아티스트 선택">
        <SignupFunnelTitle name="아티스트 선택" />
        <MyArtistsInfo />
      </Step>
    </Funnel>
  );
};

export default ProfileSetup;
