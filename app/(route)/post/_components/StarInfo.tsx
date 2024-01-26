import { useState } from "react";
import Dropdown from "@/components/Dropdown";
import { useStore } from "@/store/index";

const EVENT_TYPE_LIST = ["생일카페", "상영회", "팬싸", "또뭐하ㅏ지", "모르겠다", "배고프다", "붕어빵", "피자붕어빵"];

interface Props {
  onNextStep: () => void;
}

const StarInfo = ({ onNextStep }: Props) => {
  const { setInfo, info } = useStore((state) => ({
    setInfo: state.setPostInfo,
    info: state.postInfo,
  }));
  const [eventType, setEventType] = useState(info?.eventType ? info.eventType : EVENT_TYPE_LIST[0]);

  const saveStarInfo = () => {
    setInfo({ ...info, eventType });
    onNextStep();
  };

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
      <label>행사 유형</label>
      <Dropdown itemList={EVENT_TYPE_LIST} selected={eventType} setSelected={setEventType} />
      <button onClick={saveStarInfo}>다음으로</button>
    </>
  );
};

export default StarInfo;
