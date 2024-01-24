import { useState } from "react";
import Dropdown from "@/components/Dropdown/Dropdown";
import { useStore } from "@/store/index";

const EVENT_TYPE_LIST = ["생일카페", "상영회", "팬싸", "또뭐하ㅏ지", "모르겠다", "배고프다", "붕어빵", "피자붕어빵"];

const StarInfo = () => {
  const { modal, openModal, setStep, setInfo, info } = useStore((state) => ({
    modal: state.modal,
    openModal: state.openModal,
    setStep: state.setStep,
    setInfo: state.setPostInfo,
    info: state.postInfo,
  }));
  const [eventType, setEventType] = useState(EVENT_TYPE_LIST[0]);

  const saveStarInfo = () => {
    setInfo({ ...info, eventType });
    setStep(2);
  };

  return (
    <>
      <div>누구를 위한 행사인가요🎉?</div>
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
