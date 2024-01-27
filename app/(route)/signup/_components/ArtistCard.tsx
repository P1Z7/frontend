import Image from "next/image";
import { useState } from "react";

interface Props {
  data: { name: string; profileImage: string };
  onClick: (id: string, isChecked: boolean) => void;
  myArtists: string[];
}

const ArtistCard = ({ data, onClick, myArtists }: Props) => {
  const { name, profileImage } = data;
  const [isChecked, setIsChecked] = useState<boolean>(myArtists.includes(name));

  const handleChange = () => {
    onClick(name, !isChecked);
    setIsChecked(!isChecked);
  };

  return (
    <>
      <label htmlFor={name} className="flex w-100 flex-col items-center justify-center gap-8 rounded-sm p-12 hover:bg-sky-50">
        <Image
          src={profileImage ? profileImage : "/icon/add-image_gray.svg"}
          alt="이미지 추가 버튼"
          width={80}
          height={80}
          className={`rounded-full border-red-500 ${isChecked ? "border" : ""}`}
        />
        <p className="text-14">{name}</p>
      </label>
      <input name="myArtists" type="checkbox" id={name} onChange={handleChange} checked={isChecked} hidden />
    </>
  );
};

export default ArtistCard;
