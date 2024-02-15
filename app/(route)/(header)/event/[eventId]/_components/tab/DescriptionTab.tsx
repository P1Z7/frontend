"use client";

import Image from "next/image";
import { EventImageType } from "@/types/index";

interface Props {
  images: EventImageType[];
  description: string | undefined;
}

const DescriptionTab = ({ images, description }: Props) => {
  return (
    <div className="mb-40 flex w-full flex-col gap-16 px-20 py-24 pt-24 tablet:p-32">
      <p className="whitespace-pre-wrap border-b border-gray-50 pb-16 text-14 font-500 text-gray-700">{description}</p>
      {images?.map((image) => <Image key={image.id} src={image.imageUrl} alt={"행사 정보 사진"} width={0} height={0} sizes="100vw" className="w-full" />)}
    </div>
  );
};

export default DescriptionTab;
