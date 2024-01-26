"use client";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import GiftTag from "@/components/GiftTag";
import InputText from "@/components/input/InputText";
import { PostType } from "../page";

const SNS_TYPE_LIST = ["트위터", "인스타그램", "유튜브", "기타"];
const GIFT_LIST = ["컵홀더", "포토카드", "엽서", "티켓", "포스터", "스티커", "굿즈", "기타"];

interface Props {
  onNextStep: () => void;
}

const SubInfo = ({ onNextStep }: Props) => {
  const { setValue, getValues } = useFormContext<PostType>();
  const [snsType, setSnsType] = useState(getValues("snsType"));
  const [giftList, setGiftList] = useState<string[]>(getValues("gift"));

  const handleRadioChange = (event: any) => {
    setSnsType(event.target.value);
  };

  const handleGiftClick = (gift: any) => {
    if (giftList.includes(gift)) return setGiftList((prev) => prev.filter((item) => item !== gift));
    setGiftList((prev) => [...prev, gift]);
  };

  useEffect(() => {
    setValue("gift", giftList);
  }, [giftList]);

  useEffect(() => {
    setValue("snsType", snsType);
  }, [snsType]);

  return (
    <>
      <div className="h-4 w-320 rounded-full bg-gray-200 dark:bg-gray-700">
        <div className="h-4 w-3/4 rounded-full bg-blue-600"></div>
      </div>
      <div>주최자와 특전 정보를 추가해주세요🎁</div>
      <div>*선택 입력 사항입니다.</div>
      <InputText name="snsId" placeholder="SNS 아이디 입력">
        주최자
      </InputText>
      {SNS_TYPE_LIST.map((type) => (
        <label key={type}>
          <input name="sns" value={type} type="radio" onChange={handleRadioChange} checked={snsType === type} />
          {type}
        </label>
      ))}
      <InputText name="eventUrl" placeholder="URL 입력">
        행사 링크
      </InputText>
      <label>
        특전
        {GIFT_LIST.map((gift) => (
          <GiftTag key={gift} handleClick={handleGiftClick} initialChecked={giftList.includes(gift)}>
            {gift}
          </GiftTag>
        ))}
      </label>
      <InputText name="gift" hidden />
      <InputText name="snsType" hidden />
      <br />
      <button onClick={onNextStep}>다음으로</button>
    </>
  );
};

export default SubInfo;
