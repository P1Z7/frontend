import { ProfileSetupType, SignupStepNameType } from "@/types/index";
import AccountInfo from "./step/AccountInfo";
import MyArtistsInfo from "./step/MyArtistsInfo";
import ProfileInfo from "./step/ProfileInfo";

const ProfileSetup = ({ steps, handleNextClick, Funnel, Step }: ProfileSetupType<SignupStepNameType>) => {
  return (
    <Funnel>
      <Step name="계정 정보">
        <AccountInfo onNext={() => handleNextClick(steps[1])} />
      </Step>
      <Step name="프로필 정보">
        <ProfileInfo onNext={() => handleNextClick(steps[2])} />
      </Step>
      <Step name="아티스트 선택">
        <MyArtistsInfo />
      </Step>
    </Funnel>
  );
};

export default ProfileSetup;
