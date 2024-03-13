"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
  name: string;
  image: string;
}

const ArtistProfile = ({ id, name, image }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/artist/${id}`);
  };
  return (
    <button onClick={handleClick}>
      <div className="relative h-108 w-108 overflow-hidden rounded-full">
        <Image src={image} alt="아티스트 이미지" fill className="object-cover" />
      </div>
      <div className="pt-4 text-18 font-500">{name}</div>
    </button>
  );
};

export default ArtistProfile;
