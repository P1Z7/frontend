import { useState } from "react";
import { ArtistType } from "../_types";
import ArtistCard from "./ArtistCard";
import ChipButton from "./chip/ChipButton";
import SearchInput from "./input/SearchInput";

interface Props {
  data: ArtistType[];
}

const MyArtistList = ({ data }: Props) => {
  const [keyword, setKeyword] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  const handleArtistClick = (name: string) => {
    if (selected.includes(name)) {
      setSelected((prevSelected) => prevSelected.filter((item) => item !== name));
    } else {
      setSelected((prevSelected) => [...prevSelected, name]);
    }
  };

  return (
    <div className="flex flex-col gap-24 ">
      <section className="flex flex-col gap-16">
        <SearchInput setKeyword={setKeyword} placeholder="최애의 행사를 찾아보세요!" />
        <div className="flex w-full gap-12 overflow-auto">
          {selected.map((artist) => (
            <ChipButton label={artist} key={artist} onClick={() => handleArtistClick(artist)} canDelete />
          ))}
        </div>
      </section>
      <section className="m-auto w-320">
        <ul className="grid grid-cols-3 gap-x-16 gap-y-20 px-8">
          {data.map((artist, index) => (
            <li key={index}>
              <ArtistCard onClick={() => handleArtistClick(artist.name)} isChecked={selected.includes(artist.name)} profileImage={artist.profileImage}>
                {artist.name}
              </ArtistCard>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default MyArtistList;
