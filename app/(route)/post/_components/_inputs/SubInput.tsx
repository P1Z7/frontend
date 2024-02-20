import InitButton from "@/(route)/event/[eventId]/edit/_components/InitButton";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import CheckBox from "@/components/CheckBox";
import ChipButton from "@/components/chip/ChipButton";
import InputText from "@/components/input/InputText";
import { checkArrUpdate } from "@/utils/checkArrUpdate";
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
  const [giftList, setGiftList] = useState<string[]>(getValues("tags") || []);
  const [hasNotOrganizer, setHasNotOrganizer] = useState(getValues("organizerSns") ? false : true);
  const { organizerSns, eventUrl } = watch();

  const handleRadioChange = (event: any) => {
    setSnsType(event.target.value);
  };

  const handleGiftClick = (gift: any) => {
    if (giftList.includes(gift)) return setGiftList((prev) => prev.filter((item) => item !== gift));
    setGiftList((prev) => [...prev, gift]);
  };

  useEffect(() => {
    setValue("tags", giftList);
  }, [giftList]);

  useEffect(() => {
    setValue("snsType", snsType);
  }, [snsType]);

  useEffect(() => {
    if (hasNotOrganizer) {
      setSnsType("트위터");
      setValue("organizerSns", "");
    }
  }, [hasNotOrganizer]);

  return (
    <div>
      <div className="flex flex-col gap-20 pc:gap-32">
        <div className="flex flex-col gap-12">
          <div className="relative flex flex-col gap-16 ">
            <label className="flex items-center">
              주최자 SNS
              {validateEdit(defaultValues?.organizerSns !== organizerSns || defaultValues.snsType !== snsType) && (
                <InitButton
                  onClick={() => {
                    setSnsType(defaultValues?.snsType || "트위터");
                    setValue("organizerSns", defaultValues?.organizerSns || "");
                    setHasNotOrganizer(defaultValues?.organizerSns ? false : true);
                  }}
                />
              )}
            </label>
            <div className="flex gap-16">
              {SNS_TYPE_LIST.map((type) => (
                <label key={type} className={classNames("flex cursor-pointer items-center gap-4", { "!text-gray-400 hover:cursor-not-allowed": hasNotOrganizer })}>
                  <input
                    className={classNames(
                      "h-16 w-16 cursor-pointer appearance-none rounded-full border-2 border-gray-200 checked:border-[0.5rem] checked:border-main-pink-500 hover:bg-main-pink-50",
                      { "checked:!border-gray-200 hover:cursor-not-allowed hover:!bg-white-black": hasNotOrganizer },
                    )}
                    name="sns"
                    value={type}
                    type="radio"
                    onChange={handleRadioChange}
                    checked={snsType === type}
                    disabled={hasNotOrganizer}
                  />
                  {type}
                </label>
              ))}
            </div>
            <InputText name="organizerSns" placeholder="sns 계정을 입력해주세요." disabled={hasNotOrganizer} />
          </div>
          <CheckBox isCheck={hasNotOrganizer} setIsCheck={setHasNotOrganizer}>
            주최자 입력안함
          </CheckBox>
        </div>
        <InputText
          name="eventUrl"
          placeholder="URL을 입력해주세요."
          isEdit={validateEdit(defaultValues?.eventUrl !== eventUrl)}
          onInit={() => setValue("eventUrl", defaultValues?.eventUrl || "")}
        >
          링크
        </InputText>
        <div className="flex flex-col gap-8">
          <div className="relative flex items-center gap-4">
            특전
            {validateEdit(typeof defaultValues?.tags !== "undefined" && checkArrUpdate(defaultValues?.tags, giftList)) && (
              <InitButton onClick={() => setGiftList(defaultValues?.tags as string[])} />
            )}
          </div>
          <ul className="flex flex-wrap gap-8 gap-y-12">
            {GIFT_LIST.map((gift) => (
              <li key={gift}>
                <ChipButton label={gift} onClick={() => handleGiftClick(gift)} selected={giftList.includes(gift)} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <InputText name="tags" hidden />
      <InputText name="snsType" hidden />
    </div>
  );
};

export default SubInput;
