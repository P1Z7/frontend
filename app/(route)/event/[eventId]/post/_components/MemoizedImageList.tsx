import Image from "next/image";
import { memo } from "react";
import CloseIcon from "@/public/icon/close.svg";

interface Props {
  imageList: File[];
  handleRemoveImage: (image: File) => void;
}

const ImageList = ({ imageList, handleRemoveImage }: Props) => {
  return (
    <>
      {imageList.map((image, index) => (
        <li key={index} className="relative h-120 w-120 shrink-0">
          <button
            onClick={() => handleRemoveImage(image)}
            type="button"
            className="absolute right-4 top-4 z-nav flex h-24 w-24 cursor-pointer items-center justify-center rounded-full bg-gray-900 bg-opacity-65"
          >
            <CloseIcon width="20" height="20" stroke="#FFFFFF" />
          </button>
          <Image src={URL.createObjectURL(image)} alt="선택한 사진 미리보기" fill className="object-cover" />
        </li>
      ))}
    </>
  );
};

export const MemoizedImageList = memo(ImageList);
