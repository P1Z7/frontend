import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import WarningCheck from "@/components/WarningCheck";
import InputArea from "@/components/input/InputArea";
import { validateEdit } from "@/utils/editValidate";
import { PostType } from "../../page";
import ImageSection from "../ImageSection";

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
      <ImageSection imgList={imgList} setImgList={setImgList} />
      <InputArea
        name="description"
        placeholder="이벤트 설명을 입력하세요."
        hasLimit
        rules={{ maxLength: 100 }}
        isEdit={validateEdit(defaultValues?.description !== getValues("description"))}
      >
        상세 내용
      </InputArea>
      <WarningCheck />
    </>
  );
};

export default DetailInput;
