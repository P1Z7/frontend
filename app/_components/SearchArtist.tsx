import { MOCK } from "app/_constants/mock";
import { useEffect, useRef, useState } from "react";
import ArtistCard from "@/components/ArtistCard";
import ChipButton from "@/components/chip/ChipButton";
import SearchInput from "@/components/input/SearchInput";
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
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState<string[]>([]);
  const [searchedData, setSearchedData] = useState(data);
  const lastButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setSearchedData(
      MOCK.filter((item) => {
        return item.name.toLowerCase().includes(value.toLowerCase()) || (item.group && item.group.some((group) => group.toLowerCase().includes(value.toLowerCase())));
      }),
    );
  }, [value]);

  useEffect(() => {
    lastButton.current?.scrollIntoView({ behavior: "smooth" });
  }, [lastButton.current]);

  return (
    <div className="flex flex-col gap-24 pt-8">
      <button className="w-fit text-14 font-500 text-gray-400 underline" onClick={() => openModal("req_artist")} type="button">
        찾으시는 아티스트가 없으신가요?
      </button>
      <SearchInput placeholder="입력해주세요." setKeyword={setValue} />
      <ul className="flex w-full gap-12 overflow-hidden">
        {data.map((cardList) => (
          <Chip name={cardList.name} onClick={onClick} myArtists={myArtists} key={cardList.name} />
        ))}
      </ul>
      <ul className="flex w-full flex-wrap justify-center gap-x-16 gap-y-20 px-8">
        {searchedData.map((cardList) => (
          <Card data={cardList} onClick={onClick} myArtists={myArtists} key={cardList.name} setChecked={setChecked} />
        ))}
      </ul>
      {modal === "req_artist" && <ReqNewArtistModal closeModal={closeModal} />}
    </div>
  );
};

export default SearchArtist;

interface ChipProps {
  name: string;
  onClick: (id: string, isChecked: boolean) => void;
  myArtists: string[];
}

const Chip = ({ name, onClick, myArtists }: ChipProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleDelete = () => {
    onClick(name, !myArtists.includes(name));
  };

  useEffect(() => {
    setIsChecked(myArtists.includes(name));
  }, [myArtists]);

  if (!isChecked) return;

  return (
    <li>
      <ChipButton key={name} label={name} onDelete={handleDelete} />
    </li>
  );
};

interface CardProps {
  data: { name: string; profileImage: string };
  onClick: (id: string, isChecked: boolean) => void;
  myArtists: string[];
  setChecked: any;
}

const Card = ({ data, onClick, myArtists, setChecked }: CardProps) => {
  const { name, profileImage } = data;

  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleClick = () => {
    onClick(name, !isChecked);
  };

  useEffect(() => {
    setIsChecked(myArtists.includes(name));
  }, [myArtists]);

  return (
    <li>
      <label htmlFor={name}>
        <ArtistCard isChecked={isChecked} profileImage={profileImage} isSmall>
          {name}
        </ArtistCard>
      </label>

      <input name="myArtists" type="checkbox" id={name} onChange={handleClick} checked={isChecked} hidden />
    </li>
  );
};
