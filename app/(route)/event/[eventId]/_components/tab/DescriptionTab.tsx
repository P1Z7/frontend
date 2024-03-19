"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { EventImageType } from "@/types/index";

interface Props {
  images: EventImageType[];
  description: string | undefined;
}

const DescriptionTab = ({ images, description }: Props) => {
  const [sizes, setSizes] = useState("150px");

  useEffect(() => {
    const viewportWidth = window.innerWidth;
    viewportWidth > 768 ? setSizes("800px") : setSizes("500px");
  }, []);

  return (
    <div className="mb-40 flex w-full flex-col gap-16 px-20 py-24 pt-24 pc:gap-24 pc:px-40 pc:py-32">
      <p className="whitespace-pre-wrap border-b border-gray-50 pb-16 text-14 font-500 text-gray-700 pc:pb-32 pc:text-16">{description}</p>
      {images?.map((image) => <Image key={image.id} src={image.imageUrl} alt={"행사 정보 사진"} width={0} height={0} priority sizes={sizes} className="w-full" />)}
    </div>
  );
};

export default DescriptionTab;
