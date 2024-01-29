import classNames from "classnames";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Control, Controller, UseFormGetValues, UseFormSetValue } from "react-hook-form";
import WarningCheck from "@/components/WarningCheck";
import { PostType } from "../../page";
import ImageSection from "../ImageSection";

interface Props {
  control: Control<PostType, any>;
  imgList: (File | string)[];
  setImgList: Dispatch<SetStateAction<(File | string)[]>>;
  images: (File | string)[];
  getValues: UseFormGetValues<PostType>;
  setValue: UseFormSetValue<PostType>;
}

const DetailInput = ({ control, imgList, setImgList, images, getValues, setValue }: Props) => {
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
      <label className="flex flex-col">
        상세 내용
        <Controller
          control={control}
          name="detailText"
          rules={{ maxLength: 100 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <textarea id="detail_text" className="h-120 rounded-sm bg-gray-100 px-16 py-12" placeholder="이벤트를 설명하세요." onChange={onChange} onBlur={onBlur} value={value} />
          )}
        />
        <div className={classNames("text-12 text-[#A2A5AA]", { "text-red-600": getValues("detailText").length > 100 })}>{getValues("detailText").length} / 100</div>
      </label>
      <WarningCheck />
    </>
  );
};

export default DetailInput;
