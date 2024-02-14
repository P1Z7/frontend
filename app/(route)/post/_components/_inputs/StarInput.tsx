import { useFormContext } from "react-hook-form";
import EventTypeBottomSheet from "@/components/bottom-sheet/EventTypeBottomSheet";
import StarBottomSheet from "@/components/bottom-sheet/StarBottomSheet";
import InputText from "@/components/input/InputText";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import { checkArrUpdate } from "@/utils/checkArrUpdate";
import { validateEdit } from "@/utils/editValidate";
import { handleEnterDown } from "@/utils/handleEnterDown";
import { PostType } from "../../page";

const StarInput = () => {
  const { bottomSheet, openBottomSheet, closeBottomSheet, refs } = useBottomSheet();

  const {
    formState: { defaultValues },
    watch,
  } = useFormContext<PostType>();
  const { eventType, groupId, artistNames, artists } = watch();
  const isNotMember = groupId && artistNames.length === 0;

  return (
    <>
      <div className="flex-item flex flex-col gap-20">
        <div className="flex flex-col">
          <label className="flex items-center gap-4">
            아티스트
            {validateEdit(typeof defaultValues?.artists !== "undefined" && (checkArrUpdate(defaultValues?.artists, artists) || defaultValues?.groupId !== groupId)) && (
              <p className="text-12 font-600 text-blue">수정됨</p>
            )}
          </label>
          <div className="grid grid-cols-2 gap-8">
            <InputText
              name="groupName"
              placeholder="아티스트 선택"
              readOnly
              onClick={() => openBottomSheet("firstArtist")}
              onKeyDown={(event) => handleEnterDown(event, () => openBottomSheet("firstArtist"))}
            />
            <InputText
              name="artistNames"
              placeholder="멤버 선택"
              readOnly
              onClick={() => openBottomSheet("secondArtist")}
              onKeyDown={(event) => handleEnterDown(event, () => openBottomSheet("secondArtist"))}
            />
          </div>
          {isNotMember && <div className="pt-4 text-12 font-500 text-red">그룹 선택 시, 멤버 선택이 필수입니다.</div>}
        </div>
        <InputText
          name="eventType"
          readOnly
          placeholder="행사 유형을 선택하세요."
          tabIndex={0}
          onClick={() => openBottomSheet("event")}
          onKeyDown={(event) => handleEnterDown(event, () => openBottomSheet("event"))}
          isEdit={validateEdit(defaultValues?.eventType !== eventType)}
        >
          행사 유형
        </InputText>
        <InputText name="groupId" hidden />
        <InputText name="artists" hidden />
      </div>
      {bottomSheet === "event" && <EventTypeBottomSheet closeBottomSheet={closeBottomSheet} refs={refs} />}
      {bottomSheet === "firstArtist" && <StarBottomSheet closeBottomSheet={closeBottomSheet} isFirst refs={refs} />}
      {bottomSheet === "secondArtist" && <StarBottomSheet closeBottomSheet={closeBottomSheet} refs={refs} />}
    </>
  );
};

export default StarInput;
