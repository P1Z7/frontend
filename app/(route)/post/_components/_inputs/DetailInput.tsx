import InitButton from "@/(route)/event/[eventId]/edit/_components/InitButton";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import WarningCheck from "@/components/WarningCheck";
import InputArea from "@/components/input/InputArea";
import { checkArrUpdate } from "@/utils/checkArrUpdate";
import { validateEdit } from "@/utils/editValidate";
import { PostType } from "../../page";
import { MemoizedImageSection } from "../ImageSection";

const DetailInput = () => {
  const {
    formState: { defaultValues },
    getValues,
    setValue,
    watch,
  } = useFormContext<PostType>();
  const [imgList, setImgList] = useState<(File | string)[]>(getValues("eventImages"));
  const { eventImages } = watch();

  useEffect(() => {
    if (Array.from(eventImages).filter((image) => !imgList.includes(image)).length === 0) {
      return;
    }
    const newList = imgList.length > 0 ? Array.from(eventImages).filter((file) => !imgList?.includes(file)) : eventImages;
    setImgList((prev) => [...prev, ...newList]);
  }, [eventImages]);

  useEffect(() => {
    setValue("eventImages", imgList);
  }, [imgList]);

  return (
    <>
      <section className="flex flex-col gap-8">
        <div className="relative flex items-center gap-4 pc:text-20 pc:font-500">
          이미지
          {validateEdit(typeof defaultValues?.eventImages !== "undefined" && checkArrUpdate(defaultValues?.eventImages, imgList)) && (
            <InitButton onClick={() => setImgList(defaultValues?.eventImages as (string | File)[])} />
          )}
        </div>
        <MemoizedImageSection imgList={imgList} setImgList={setImgList} />
        {imgList.length <= 5 ? (
          <div className="text-12 font-500 text-gray-300">첫번째 이미지가 썸네일로 등록됩니다.</div>
        ) : (
          <div className="text-12 font-500 text-red">이미지는 최대 5개까지 업로드 가능합니다.</div>
        )}
      </section>
      <InputArea
        name="description"
        placeholder="이벤트 설명을 입력하세요."
        rules={{ maxLength: 300 }}
        hasLimit
        isEdit={validateEdit(defaultValues?.description !== getValues("description"))}
        onInit={() => setValue("description", defaultValues?.description || "")}
      >
        상세 내용
      </InputArea>
      <WarningCheck />
    </>
  );
};

export default DetailInput;
