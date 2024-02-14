import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import InputFile from "@/components/input/InputFile";
import CloseIcon from "@/public/icon/close.svg";

interface Props {
  imgList: (File | string)[];
  setImgList: Dispatch<SetStateAction<(File | string)[]>>;
}

const ImageSection = ({ imgList, setImgList }: Props) => {
  return (
    <div className="flex gap-8 overflow-x-scroll scrollbar-hide">
      {imgList.length < 5 && <InputFile name="eventImages" />}
      <div className="flex gap-8">
        {Array.from(imgList).map((file, idx) => (
          <div key={idx} className="relative flex h-120 w-120 shrink-0">
            <button
              onClick={() => setImgList((prev) => prev.filter((item) => item !== file))}
              type="button"
              className="absolute right-4 top-4 z-nav flex h-24 w-24 cursor-pointer items-center justify-center rounded-full bg-gray-900 bg-opacity-65"
            >
              <CloseIcon width="20" height="20" stroke="#FFFFFF" />
            </button>
            {idx === 0 && <span className="absolute left-4 top-4 z-nav rounded-[0.8rem] bg-[#000000]/[.72] px-8 py-4 text-12 text-white-white">대표이미지</span>}
            <Image src={typeof file === "string" ? file : URL.createObjectURL(file)} alt="선택한 이미지 미리보기" fill sizes="120, 120" className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export const MemoizedImageSection = React.memo(ImageSection);
