import InitButton from "@/(route)/event/[eventId]/edit/_components/InitButton";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import EventTypeList from "@/components/bottom-sheet/content/EventTypeList";
import InputText from "@/components/input/InputText";
import useBottomSheet from "@/hooks/useBottomSheet";
import useGetWindowWidth from "@/hooks/useGetWindowWidth";
import { useModal } from "@/hooks/useModal";
import { checkArrUpdate } from "@/utils/checkArrUpdate";
import { validateEdit } from "@/utils/editValidate";
import { handleEnterDown } from "@/utils/handleEnterDown";
import { PostType } from "../../page";

const EventTypeBottomSheet = dynamic(() => import("@/components/bottom-sheet/EventTypeBottomSheet"), { ssr: false });
const StarBottomSheet = dynamic(() => import("@/components/bottom-sheet/StarBottomSheet"), { ssr: false });
const ArtistModal = dynamic(() => import("@/components/modal/ArtistModal"), { ssr: false });

const StarInput = () => {
  const { bottomSheet, openBottomSheet, closeBottomSheet, refs } = useBottomSheet();
  const { modal, openModal, closeModal } = useModal();
  const { isPc } = useGetWindowWidth();

  const {
    setValue,
    formState: { defaultValues },
    watch,
  } = useFormContext<PostType>();
  const { eventType, groupId, artistNames, artists } = watch();
  const isNotMember = groupId && artistNames.length === 0;

  const handleArtistInit = () => {
    setValue("groupId", defaultValues?.groupId || "");
    setValue("groupName", defaultValues?.groupName || "");
    setValue("artists", defaultValues?.artists as string[]);
    setValue("artistNames", defaultValues?.artistNames as string[]);
  };

  useEffect(() => {
    if (isPc && bottomSheet) {
      openModal(bottomSheet);
      closeBottomSheet();
    }
    if (!isPc && modal) {
      openBottomSheet(modal);
      closeModal();
    }
  }, [isPc]);

  return (
    <>
      <div className="flex-item flex flex-col gap-20 pc:gap-32">
        <div className="relative flex flex-col">
          <label className="flex items-center gap-4 pc:text-20 pc:font-500">
            아티스트
            {validateEdit(typeof defaultValues?.artists !== "undefined" && (checkArrUpdate(defaultValues?.artists, artists) || defaultValues?.groupId !== groupId)) && (
              <InitButton onClick={() => handleArtistInit()} />
            )}
          </label>
          <div className="grid grid-cols-2 gap-8">
            <InputText
              name="groupName"
              placeholder="아티스트 선택"
              readOnly
              onClick={() => (isPc ? openModal("firstArtist") : openBottomSheet("firstArtist"))}
              onKeyDown={(event) => handleEnterDown(event, () => (isPc ? openModal("firstArtist") : openBottomSheet("firstArtist")))}
              noButton
            />
            <InputText
              name="artistNames"
              placeholder="멤버 선택"
              readOnly
              onClick={() => (isPc ? openModal("secondArtist") : openBottomSheet("secondArtist"))}
              onKeyDown={(event) => handleEnterDown(event, () => (isPc ? openModal("secondArtist") : openBottomSheet("secondArtist")))}
            />
          </div>
          {isNotMember && <div className="pt-4 text-12 font-500 text-red">그룹 선택 시, 멤버 선택이 필수입니다.</div>}
        </div>
        <div className="flex flex-col gap-[0.9rem]">
          <InputText
            name="eventType"
            readOnly
            placeholder="행사 유형을 선택하세요."
            tabIndex={0}
            onClick={() => (isPc ? openModal("event") : openBottomSheet("event"))}
            onKeyDown={(event) => handleEnterDown(event, () => (isPc ? openModal("event") : openBottomSheet("event")))}
            isEdit={validateEdit(defaultValues?.eventType !== eventType)}
            onInit={() => setValue("eventType", defaultValues?.eventType || "카페")}
            noButton
          >
            행사 유형
          </InputText>
          {modal === "event" && <EventTypeList handleClickFunc={closeModal} />}
        </div>
        <InputText name="groupId" hidden />
        <InputText name="artists" hidden />
      </div>
      {modal === "firstArtist" && <ArtistModal closeModal={closeModal} isFirst />}
      {modal === "secondArtist" && <ArtistModal closeModal={closeModal} />}
      {bottomSheet === "event" && <EventTypeBottomSheet closeBottomSheet={closeBottomSheet} refs={refs} />}
      {bottomSheet === "firstArtist" && <StarBottomSheet closeBottomSheet={closeBottomSheet} isFirst refs={refs} />}
      {bottomSheet === "secondArtist" && <StarBottomSheet closeBottomSheet={closeBottomSheet} refs={refs} />}
    </>
  );
};

export default StarInput;
