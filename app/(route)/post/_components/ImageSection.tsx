import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import InputFile from "@/components/input/InputFile";
import CloseIcon from "@/public/icon/close.svg";

interface Props {
  imgList: (File | string)[];
  setImgList: Dispatch<SetStateAction<(File | string)[]>>;
}

const ImageSection = ({ imgList, setImgList }: Props) => {
  return (
    <div className="flex flex-col gap-8">
      <div>이미지</div>
      <div className="flex gap-8">
        {imgList.length < 5 && <InputFile name="images" />}
        <div className="flex w-[400px] gap-8 overflow-x-scroll scrollbar-hide">
          {Array.from(imgList).map((file, idx) => (
            <div key={idx} className="relative flex h-120 w-120 shrink-0" onClick={() => setImgList((prev) => prev.filter((item) => item !== file))}>
              <button className="absolute right-4 top-4 z-nav cursor-pointer">
                <CloseIcon width="24" height="24" stroke="#FFFFFF" />
              </button>
              {idx === 0 && <span className="absolute left-4 top-4 z-nav rounded-[0.8rem] bg-[#000000]/[.72] px-8 py-4 text-12 text-white-white">대표이미지</span>}
              <Image src={typeof file === "string" ? file : URL.createObjectURL(file)} alt="선택한 사진 미리보기" fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>
      {imgList.length <= 5 ? (
        <div className="text-12 font-500 text-gray-300">첫번째 이미지가 썸네일로 등록됩니다.</div>
      ) : (
        <div className="text-12 font-500 text-red">이미지는 최대 5개까지 업로드 가능합니다.</div>
      )}
    </div>
  );
};

export default ImageSection;
