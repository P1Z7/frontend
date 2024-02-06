"use client";

import Image from "next/image";

interface Props {
  images: string[] | undefined;
  description: string | undefined;
}

const DescriptionTab = ({ images, description }: Props) => {
  return (
    <div className="mb-40 flex w-full flex-col gap-16 px-20 py-24 pt-24">
      {images?.map((image) => <Image key={image} src={image} alt={"행사 정보 사진"} width={0} height={0} sizes="100vw" className="w-full" />)}
      <p className="whitespace-pre-wrap text-14 font-500">{description}</p>
    </div>
  );
};

export default DescriptionTab;
