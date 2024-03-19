import InitButton from "@/(route)/event/[eventId]/edit/_components/InitButton";
import dynamic from "next/dynamic";
import { useFormContext } from "react-hook-form";
import InputText from "@/components/input/InputText";
import useBottomSheet from "@/hooks/useBottomSheet";
import { validateEdit } from "@/utils/editValidate";
import { handleEnterDown } from "@/utils/handleEnterDown";
import { PostType } from "../../page";

const AddressBottomSheet = dynamic(() => import("@/components/bottom-sheet/AddressBottomSheet"), { ssr: false });
const CalenderBottomSheet = dynamic(() => import("@/components/bottom-sheet/CalendarBottomSheet"), { ssr: false });

const MainInput = () => {
  const { bottomSheet, openBottomSheet, closeBottomSheet, refs } = useBottomSheet();
  const {
    formState: { defaultValues },
    watch,
    setValue,
  } = useFormContext<PostType>();
  const { placeName, address, addressDetail, startDate, endDate } = watch();

  return (
    <>
      <InputText
        name="placeName"
        placeholder="장소 이름을 입력하세요."
        rules={{ required: "장소 이름을 입력해주세요." }}
        isEdit={validateEdit(defaultValues?.placeName !== placeName)}
        onInit={() => setValue("placeName", defaultValues?.placeName || "")}
      >
        장소 이름
      </InputText>
      <div className="flex flex-col">
        <InputText
          name="address"
          placeholder="도로명주소 검색"
          readOnly
          onKeyDown={(event) => handleEnterDown(event, () => openBottomSheet("address"))}
          onClick={() => openBottomSheet("address")}
          isEdit={validateEdit(defaultValues?.address !== address || defaultValues?.addressDetail !== addressDetail)}
          onInit={() => {
            setValue("address", defaultValues?.address || "");
            setValue("addressDetail", defaultValues?.addressDetail || "");
          }}
        >
          주소
        </InputText>
        <InputText name="addressDetail" placeholder="상세 주소 입력" />
      </div>
      <div className="flex flex-col">
        <div className="relative flex items-center gap-4 pc:text-20 pc:font-500">
          기간
          {validateEdit(defaultValues?.startDate !== startDate || defaultValues?.endDate !== endDate) && (
            <InitButton
              onClick={() => {
                setValue("startDate", defaultValues?.startDate || "");
                setValue("endDate", defaultValues?.endDate || "");
              }}
            />
          )}
        </div>
        <div className="flex">
          <div className="w-1/2">
            <InputText
              name="startDate"
              placeholder="날짜 선택"
              readOnly
              onKeyDown={(event) => handleEnterDown(event, () => openBottomSheet("date"))}
              onClick={() => openBottomSheet("date")}
            />
          </div>
          <div className="flex items-center px-4">~</div>
          <div className="w-1/2">
            <InputText
              name="endDate"
              placeholder="날짜 선택"
              readOnly
              onKeyDown={(event) => handleEnterDown(event, () => openBottomSheet("date"))}
              onClick={() => openBottomSheet("date")}
            />
          </div>
        </div>
      </div>
      {bottomSheet === "address" && <AddressBottomSheet closeBottomSheet={closeBottomSheet} refs={refs} />}
      {bottomSheet === "date" && (
        <CalenderBottomSheet
          closeBottomSheet={closeBottomSheet}
          setEndDateFilter={(date: string) => setValue("endDate", date)}
          setStartDateFilter={(date: string) => setValue("startDate", date)}
          refs={refs}
        />
      )}
    </>
  );
};

export default MainInput;
