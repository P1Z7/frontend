import { MOCK } from "@/(route)/setting/favorite/page";
import Image from "next/image";
import { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import ReqNewArtistModal from "@/components/modal/ReqNewArtistModal";
import { useModal } from "@/hooks/useModal";
import { SignUpFormType } from "@/types/index";

const MyArtistsInfo = () => {
  const { setValue } = useFormContext<SignUpFormType>();
  const { modal, openModal, closeModal } = useModal();

  const myArtists = useWatch({ name: "myArtists" });
  const isButtonDisabled = !myArtists.length;

  const handleClick = (id: string, isChecked: boolean) => {
    if (isChecked) {
      setValue("myArtists", [...myArtists, id]);
    } else {
      setValue(
        "myArtists",
        myArtists.filter((artistId: string) => artistId !== id),
      );
    }
  };

  return (
    <div className="flex w-screen flex-col gap-8 p-12">
      <p className=" text-16 font-700 text-black">좋아하는 아티스트를 선택해주세요</p>
      <button className="w-fit text-gray-400 underline" onClick={() => openModal("req_artist")} type="button">
        찾으시는 아티스트가 없으신가요?
      </button>
      <div className="grid w-fit grid-cols-3 gap-8">
        {MOCK.map((cardList) => (
          <ArtistCard data={cardList} onClick={handleClick} myArtists={myArtists} key={cardList.name} />
        ))}
      </div>
      {modal === "req_artist" && <ReqNewArtistModal closeModal={closeModal} />}
      <button disabled={isButtonDisabled} className="h-40 bg-slate-200 text-12">
        가입하기
      </button>
      <button className="h-40 bg-slate-200 text-12">다음에 할게요.</button>
    </div>
  );
};

export default MyArtistsInfo;

interface ArtistCardProps {
  data: { name: string; profileImage: string };
  onClick: (id: string, isChecked: boolean) => void;
  myArtists: string[];
}

const ArtistCard = ({ data, onClick, myArtists }: ArtistCardProps) => {
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
