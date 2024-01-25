import { FunnelProps, StepProps } from "../../../_hooks/useFunnel";
import { AccountInfo } from "./AccountInfo";
import MyArtistsInfo from "./MyArtistsInfo";
import ProfileInfo from "./ProfileInfo";

export interface ProfileSetupProps {
  steps: string[];
  nextClickHandler: (nextStep: string) => void;
  Funnel: React.ComponentType<FunnelProps>;
  Step: React.ComponentType<StepProps>;
}

const ProfileSetup = ({ steps, nextClickHandler, Funnel, Step }: ProfileSetupProps) => {
  return (
    <Funnel>
      <Step name="계정 정보">
        <AccountInfo onNext={() => nextClickHandler(steps[1])} />
      </Step>
      <Step name="프로필 정보">
        <ProfileInfo onNext={() => nextClickHandler(steps[2])} />
      </Step>
      <Step name="아티스트 선택">
        <MyArtistsInfo />
      </Step>
    </Funnel>
  );
};

export default ProfileSetup;
