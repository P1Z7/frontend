import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import Dropdown from "@/components/Dropdown";
import ProgressBar from "@/components/ProgressBar";
import InputText from "@/components/input/InputText";
import { PostType } from "../page";
import FunnelTitle from "./FunnelTitle";
import PostFooter from "./PostFooter";

const EVENT_TYPE_LIST = ["생일카페", "상영회", "팬싸", "또뭐하ㅏ지", "모르겠다", "배고프다", "붕어빵", "피자붕어빵"];

interface Props {
  onNextStep: () => void;
}

const StarInfo = ({ onNextStep }: Props) => {
  const { setValue, getValues } = useFormContext<PostType>();
  const [eventType, setEventType] = useState(getValues("eventType"));

  useEffect(() => {
    setValue("eventType", eventType);
  }, [eventType]);

  return (
    <div className="flex flex-col gap-24">
      <ProgressBar ratio="1/4" />
      <FunnelTitle step="행사 대상" />
      <main className="flex-item flex flex-col gap-20">
        <label>
          연예인
          <input placeholder="그룹선택" readOnly />
          <input placeholder="멤버선택" readOnly />
        </label>
        <div>
          <div>행사 유형</div>
          <Dropdown itemList={EVENT_TYPE_LIST} selected={eventType} setSelected={setEventType} />
        </div>
      </main>
      <InputText name="eventType" hidden />
      <PostFooter onNextStep={onNextStep} />
    </div>
  );
};

export default StarInfo;
