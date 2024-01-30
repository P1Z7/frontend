import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import Dropdown from "@/components/Dropdown";
import StarBottomSheet from "@/components/bottom-sheet/StarBottomSheet";
import InputText from "@/components/input/InputText";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import { PostType } from "../../page";

const EVENT_TYPE_LIST = ["생일카페", "상영회", "팬싸", "또뭐하ㅏ지", "모르겠다", "배고프다", "붕어빵", "피자붕어빵"];

const StarInput = () => {
  const { getValues, setValue } = useFormContext<PostType>();
  const { bottomSheet, openBottomSheet, closeBottomSheet } = useBottomSheet();
  const [eventType, setEventType] = useState(getValues("eventType"));

  useEffect(() => {
    setValue("eventType", eventType);
  }, [eventType]);

  return (
    <>
      <div className="flex-item flex flex-col gap-20">
        <div>
          연예인
          <InputText name="group" placeholder="그룹선택" readOnly onClick={() => openBottomSheet("starGroup")} />
          <InputText name="member" placeholder="멤버선택" readOnly />
        </div>
        <div>
          <div>행사 유형</div>
          <Dropdown itemList={EVENT_TYPE_LIST} selected={eventType} setSelected={setEventType} />
        </div>
      </div>
      <InputText name="eventType" hidden />
      {bottomSheet === "starGroup" && <StarBottomSheet closeBottomSheet={closeBottomSheet} />}
    </>
  );
};

export default StarInput;
