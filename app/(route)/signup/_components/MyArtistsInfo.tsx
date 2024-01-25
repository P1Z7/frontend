import Image from "next/image";
import { ChangeEvent, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { SignUpFormValues } from "../page";

const MyArtistsInfo = () => {
  const { setValue } = useFormContext<SignUpFormValues>();

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

  const handleOpenModal = () => {
    console.log("모달열기");
  };

  useEffect(() => {
    myArtists.forEach((artistId: string) => {
      const checkbox = document.getElementById(artistId) as HTMLInputElement;
      if (checkbox) {
        checkbox.checked = true;
      }
    });
  }, []);

  return (
    <div className="flex w-screen flex-col gap-8 p-12">
      <p className=" text-16 font-700 text-black">좋아하는 아티스트를 선택해주세요</p>
      <button className="w-fit text-gray-400 underline" onClick={handleOpenModal} type="button">
        찾으시는 아티스트가 없으신가요?
      </button>
      <div>
        <ArtistCard id={"1"} onClick={handleClick} />
        <ArtistCard id={"2"} onClick={handleClick} />
        <ArtistCard id={"3"} onClick={handleClick} />
      </div>
      <button disabled={isButtonDisabled} className="h-40 bg-slate-200 text-12">
        가입하기
      </button>
      <button className="h-40 bg-slate-200 text-12">다음에 할게요.</button>
    </div>
  );
};

export default MyArtistsInfo;

const ArtistCard = ({ id, onClick }: { id: string; onClick: (id: string, isChecked: boolean) => void }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onClick(id, e.target.checked);
  };

  return (
    <>
      <input name="myArtists" type="checkbox" id={id} className={`peer/${id}`} onChange={handleChange} />
      <label htmlFor={id} className={`flex w-100 flex-col items-center justify-center gap-8 rounded-sm p-12 hover:bg-sky-50 peer-checked/${id}:bg-sky-100`}>
        <Image src={"/icon/add-image_gray.svg"} alt="이미지 추가 버튼" width={80} height={80} className="rounded-full" />
        <p className="text-14">이름</p>
      </label>
    </>
  );
};
