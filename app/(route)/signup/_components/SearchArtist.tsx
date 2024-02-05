import { MOCK } from "app/_constants/mock";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ArtistCard from "@/components/ArtistCard";
import InputText from "@/components/input/InputText";
import ReqNewArtistModal from "@/components/modal/ReqNewArtistModal";
import { useModal } from "@/hooks/useModal";
import { ArtistType } from "@/types/index";

interface Props {
  data: ArtistType[];
  onClick: (id: string, isChecked: boolean) => void;
  myArtists: string[];
}

const SearchArtist = ({ data, onClick, myArtists }: Props) => {
  const { modal, openModal, closeModal } = useModal();

  const { control, watch } = useForm({ defaultValues: { search: "" } });
  const searchValue = watch("search");
  const [searchedData, setSearchedData] = useState(data);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    const clearPreviousTimer = () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };

    clearPreviousTimer();

    timerId = setTimeout(() => {
      setSearchedData(
        MOCK.filter((item) => {
          return item.name.toLowerCase().includes(searchValue.toLowerCase()) || (item.group && item.group.some((group) => group.toLowerCase().includes(searchValue.toLowerCase())));
        }),
      );
    }, 300);

    return () => {
      clearPreviousTimer();
    };
  }, [searchValue]);

  return (
    <div className="flex flex-col gap-24 pt-8">
      <button className="w-fit text-14 font-500 text-gray-400 underline" onClick={() => openModal("req_artist")} type="button">
        찾으시는 아티스트가 없으신가요?
      </button>
      <InputText name="search" autoComplete="입력해주세요." control={control}></InputText>
      <div className="flex w-full flex-wrap justify-center gap-x-16 gap-y-20 px-8">
        {searchedData.map((cardList) => (
          <Card data={cardList} onClick={onClick} myArtists={myArtists} key={cardList.name} />
        ))}
      </div>
      {modal === "req_artist" && <ReqNewArtistModal closeModal={closeModal} />}
    </div>
  );
};

export default SearchArtist;

interface CardProps {
  data: { name: string; profileImage: string };
  onClick: (id: string, isChecked: boolean) => void;
  myArtists: string[];
}

const Card = ({ data, onClick, myArtists }: CardProps) => {
  const { name, profileImage } = data;

  const [isChecked, setIsChecked] = useState<boolean>(myArtists.includes(name));

  const handleChange = () => {
    onClick(name, !isChecked);
    setIsChecked((prev) => !prev);
  };

  return (
    <>
      <label htmlFor={name}>
        <ArtistCard isChecked={isChecked} profileImage={profileImage} isSmall>
          {name}
        </ArtistCard>
      </label>

      <input name="myArtists" type="checkbox" id={name} onChange={handleChange} checked={isChecked} hidden />
    </>
  );
};
