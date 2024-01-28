import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import InputFile from "@/components/input/InputFile";

interface Props {
  imgList: File[];
  setImgList: Dispatch<SetStateAction<File[]>>;
}

const ImageSection = ({ imgList, setImgList }: Props) => {
  return (
    <div className="flex flex-col gap-8">
      <div>이미지</div>
      <div className="flex gap-8">
        <InputFile name="images" />
        <div className="scrollbar-hide flex w-[400px] gap-8 overflow-x-scroll">
          {Array.from(imgList).map((file, idx) => (
            <div key={idx} className="relative flex h-120 w-120 shrink-0">
              <div className="absolute right-0 top-0 z-popup cursor-pointer" onClick={() => setImgList((prev) => prev.filter((item: File) => item !== file))}>
                삭제
              </div>
              <Image src={URL.createObjectURL(file)} alt="선택한 사진 미리보기" fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>
      <div className="text-12 text-[#A2A5AA]">첫번째 이미지 썸네일 등록</div>
    </div>
  );
};

export default ImageSection;
