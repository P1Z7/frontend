import classNames from "classnames";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Control, Controller, UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { PostType } from "../../page";
import ImageSection from "../ImageSection";

interface Props {
  control: Control<PostType, any>;
  isCheck: boolean;
  setIsCheck: Dispatch<SetStateAction<boolean>>;
  imgList: File[];
  setImgList: Dispatch<SetStateAction<File[]>>;
  images: File[];
  getValues: UseFormGetValues<PostType>;
  setValue: UseFormSetValue<PostType>;
}

const DetailInput = ({ control, isCheck, setIsCheck, imgList, setImgList, images, getValues, setValue }: Props) => {
  useEffect(() => {
    const newList = imgList.length > 0 ? Array.from(images).filter((file) => !Array.from(imgList).includes(file)) : images;
    setImgList((prev) => [...prev, ...newList]);
  }, [images]);

  // useEffect(() => {
  // 완벽하게 두 값을 동기화하려면 이 로직이 필요한데....... 무한루프탑승이고,, ㅎr.......
  //   setValue('images', imgList);
  // }, [imgList]);

  return (
    <main>
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
      <div className="rounded-sm bg-[#DDD] px-12 py-8">
        허위 등록, 악의적인 등록은 삭제될 수 있으며, 이로 인한 피해가 발생할 경우 전적으로 게시자가 책임집니다.(대략이런내용) 이용약관 상수로 관리할까여말까여 흠 고민고민..
      </div>
      {isCheck ? <div onClick={() => setIsCheck(false)}>체크됨</div> : <div onClick={() => setIsCheck(true)}>클릭하면 체크</div>}
    </main>
  );
};

export default DetailInput;
