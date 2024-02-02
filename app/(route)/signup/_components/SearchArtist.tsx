import { ArtistNGroupType } from "app/_constants/mock";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ArtistCard from "@/components/ArtistCard";
import InputText from "@/components/input/InputText";
import ReqNewArtistModal from "@/components/modal/ReqNewArtistModal";
import { useModal } from "@/hooks/useModal";

interface Props {
  data: ArtistNGroupType[];
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
      setSearchedData(data);
    }, 300);

    return () => {
      clearPreviousTimer();
    };
  }, [searchValue]);

  return (
    <>
      <InputText name="search" autoComplete="입력해주세요." control={control}></InputText>
      <button className="w-fit text-gray-400 underline" onClick={() => openModal("req_artist")} type="button">
        찾으시는 아티스트가 없으신가요?
      </button>
      <div className="grid w-fit grid-cols-3 gap-8">
        {searchedData.map((card) => (
          <Card data={card} onClick={onClick} myArtists={myArtists} key={card.id} />
        ))}
      </div>
      {modal === "req_artist" && <ReqNewArtistModal closeModal={closeModal} />}
    </>
  );
};

export default SearchArtist;

interface CardProps {
  data: ArtistNGroupType;
  onClick: (id: string, isChecked: boolean) => void;
  myArtists: string[];
}

const Card = ({ data, onClick, myArtists }: CardProps) => {
  const { name, image } = data;

  const [isChecked, setIsChecked] = useState<boolean>(myArtists.includes(name));

  const handleChange = () => {
    onClick(name, !isChecked);
    setIsChecked((prev) => !prev);
  };

  return (
    <>
      <label htmlFor={name}>
        <ArtistCard isChecked={isChecked} profileImage={image} isSmall>
          {name}
        </ArtistCard>
      </label>

      <input name="myArtists" type="checkbox" id={name} onChange={handleChange} checked={isChecked} hidden />
    </>
  );
};
