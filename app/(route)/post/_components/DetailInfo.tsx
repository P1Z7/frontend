import classNames from "classnames";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import InputFile from "@/components/input/InputFile";
import { PostType } from "../page";

const DetailInfo = () => {
  const { getValues, setValue, control } = useFormContext<PostType>();
  const [isCheck, setIsCheck] = useState(false);
  const [imgList, setImgList] = useState<File[]>(getValues("images"));

  useEffect(() => {
    setValue("images", imgList);
  }, [imgList]);

  return (
    <>
      <div className="h-4 w-320 rounded-full bg-gray-200 dark:bg-gray-700">
        <div className="h-4 w-full rounded-full bg-blue-600"></div>
      </div>
      <div>이미지와 설명을 작성해주세요✨</div>
      <div>*선택 입력 사항입니다.</div>
      <div>이미지</div>
      <InputFile name="images" setState={setImgList} />
      <div className="scrollbar-hide flex w-[400px] overflow-x-scroll">
        {imgList.map((file, idx) => (
          <div key={idx} className="relative flex h-120 w-120 shrink-0">
            <div className="absolute right-0 top-0 z-popup" onClick={() => setImgList((prev) => prev.filter((item: File) => item !== file))}>
              삭제
            </div>
            <Image src={URL.createObjectURL(file)} alt="선택한 사진 미리보기" fill className="object-cover" />
          </div>
        ))}
      </div>
      <div>첫번째 이미지 썸네일 등록</div>
      <label>
        상세 내용
        <Controller
          control={control}
          name="detailText"
          render={({ field: { onChange, onBlur, value } }) => (
            <textarea id="detail_text" className="border-2" placeholder="내용을 입력하세요." onChange={onChange} onBlur={onBlur} value={value} />
          )}
        />
      </label>
      <div className=" bg-slate-400">이용약관 어쩌구 저쩌구..</div>
      {isCheck ? <div onClick={() => setIsCheck(false)}>체크됨</div> : <div onClick={() => setIsCheck(true)}>체크안함</div>}
      <button disabled={!isCheck} className={classNames("bg-slate-400", { "bg-red-200": isCheck })}>
        등록하기
      </button>
    </>
  );
};

export default DetailInfo;
