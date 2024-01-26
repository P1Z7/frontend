import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import Dropdown from "@/components/Dropdown";
import InputText from "@/components/input/InputText";
import { PostType } from "../page";

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
    <>
      <div className="h-4 w-320 rounded-full bg-gray-200 dark:bg-gray-700">
        <div className="h-4 w-1/4 rounded-full bg-blue-600"></div>
      </div>
      <div>누구를 위한 행사인가요🎉?</div>
      <div>*필수 입력 사항입니다.</div>
      <label>
        연예인
        <input placeholder="그룹선택" readOnly />
        <input placeholder="멤버선택" readOnly />
      </label>
      <br />
      <div>행사 유형</div>
      <InputText name="eventType" hidden />
      <Dropdown itemList={EVENT_TYPE_LIST} selected={eventType} setSelected={setEventType} />
      <button onClick={onNextStep}>다음으로</button>
    </>
  );
};

export default StarInfo;
