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
  const [imgList, setImgList] = useState<(File | string)[]>(getValues("images"));
  const { images } = watch();

  useEffect(() => {
    if (Array.from(images).filter((image) => !imgList.includes(image)).length === 0) {
      return;
    }
    const newList = imgList.length > 0 ? Array.from(images).filter((file) => !imgList?.includes(file)) : images;
    setImgList((prev) => [...prev, ...newList]);
  }, [images]);

  useEffect(() => {
    setValue("images", imgList);
  }, [imgList]);

  return (
    <>
      <ImageSection imgList={imgList} setImgList={setImgList} />
      <InputArea name="detailText" placeholder="이벤트 설명을 입력하세요." rules={{ maxLength: 100 }} isEdit={validateEdit(defaultValues?.detailText !== getValues("detailText"))}>
        상세 내용
      </InputArea>
      <WarningCheck />
    </>
  );
};

export default DetailInput;
