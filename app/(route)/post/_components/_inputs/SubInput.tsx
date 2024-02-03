import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import ChipButton from "@/components/chip/ChipButton";
import InputText from "@/components/input/InputText";
import { validateEdit } from "@/utils/editValidate";
import { PostType } from "../../page";

const SNS_TYPE_LIST = ["트위터", "인스타그램", "유튜브", "기타"];
const GIFT_LIST = ["컵홀더", "포스터", "포토카드", "굿즈", "엽서", "스티커", "티켓", "기타"];

const SubInput = () => {
  const {
    formState: { defaultValues },
    watch,
    getValues,
    setValue,
  } = useFormContext<PostType>();
  const [snsType, setSnsType] = useState(getValues("snsType"));
  const [giftList, setGiftList] = useState<string[]>(getValues("gift"));
  const { snsId, eventUrl } = watch();

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
      <div className="flex flex-col gap-20">
        <div className="flex flex-col gap-16">
          <InputText name="snsId" placeholder="sns 계정을 입력해주세요." isEdit={validateEdit(defaultValues?.snsId !== snsId)}>
            주최자
          </InputText>
          <div className="flex gap-16">
            {SNS_TYPE_LIST.map((type) => (
              <label key={type} className="flex cursor-pointer items-center gap-4">
                <input
                  className="h-16 w-16 cursor-pointer appearance-none rounded-full border-2 border-gray-200 checked:border-[0.5rem] checked:border-main-purple-500 hover:bg-main-purple-50"
                  name="sns"
                  value={type}
                  type="radio"
                  onChange={handleRadioChange}
                  checked={snsType === type}
                />
                {type}
              </label>
            ))}
          </div>
        </div>
        <InputText name="eventUrl" placeholder="URL을 입력해주세요." isEdit={validateEdit(defaultValues?.eventUrl !== eventUrl)}>
          링크
        </InputText>
        <div className="flex flex-col gap-8">
          특전
          <ul className="flex flex-wrap gap-8 gap-y-12">
            {GIFT_LIST.map((gift) => (
              <li>
                <ChipButton key={gift} label={gift} onClick={() => handleGiftClick(gift)} selected={giftList.includes(gift)} />
              </li>
              // <GiftTag key={gift} handleClick={handleGiftClick} initialChecked={giftList.includes(gift)}>
              //   {gift}
              // </GiftTag>
            ))}
          </ul>
        </div>
      </div>
      <InputText name="gift" hidden />
      <InputText name="snsType" hidden />
    </>
  );
};

export default SubInput;
