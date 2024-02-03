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
  const [eventType, setEventType] = useState("");

  useEffect(() => {
    setValue("eventType", eventType);
  }, [eventType]);

  return (
    <>
      <div className="flex-item flex flex-col gap-20">
        <div className="flex flex-col gap-4">
          아티스트
          <div className="flex gap-8">
            <InputText name="group" placeholder="그룹 선택" readOnly onClick={() => openBottomSheet("starGroup")} />
            <InputText name="member" placeholder="멤버 선택" readOnly />
          </div>
        </div>
        <InputText name="eventType" readOnly placeholder="행사 유형을 선택하세요.">
          행사 유형
        </InputText>
        {/* <Dropdown itemList={EVENT_TYPE_LIST} selected={eventType} setSelected={setEventType} /> */}
      </div>

      {bottomSheet === "starGroup" && <StarBottomSheet closeBottomSheet={closeBottomSheet} />}
    </>
  );
};

export default StarInput;
