import { MOCK } from "app/_constants/mock";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ArtistCard from "@/components/ArtistCard";
import ChipButton from "@/components/chip/ChipButton";
import SearchInput from "@/components/input/SearchInput";
import { useModal } from "@/hooks/useModal";
import { ArtistType } from "@/types/index";
import InputModal from "./modal/InputModal";

interface Props {
  data: ArtistType[];
  onClick: (id: string, isChecked: boolean) => void;
  myArtists: string[];
}

const SearchArtist = ({ data, onClick, myArtists }: Props) => {
  const [keyword, setKeyword] = useState("");
  const [searchedData, setSearchedData] = useState(data);

  useEffect(() => {
    // 검색 API 들어갈 자리
    setSearchedData(
      MOCK.filter((item) => {
        return item.name.toLowerCase().includes(keyword.toLowerCase()) || (item.group && item.group.some((group) => group.toLowerCase().includes(keyword.toLowerCase())));
      }),
    );
  }, [keyword]);

  const [selected, setSelected] = useState<string[]>(myArtists);
  const lastButton = useRef<HTMLButtonElement>(null);

  const handleArtistClick = (name: string, isChecked: boolean) => {
    onClick(name, isChecked);

    if (selected.includes(name)) {
      setSelected((prevSelected) => prevSelected.filter((item) => item !== name));
    } else {
      setSelected((prevSelected) => [...prevSelected, name]);
    }
  };

  useEffect(() => {
    lastButton.current?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "end" });
  }, [selected]);

  const { modal, openModal, closeModal } = useModal();
  const { control, handleSubmit, setValue } = useForm({ defaultValues: { request: "" } });

  const notify = () =>
    toast.success("등록 요청이 제출되었습니다.", {
      position: "bottom-center",
      style: {
        padding: "16px 28px",
        fontFamily: "Pretendard",
        fontWeight: "600",
        fontSize: "16px",
      },
    });

  const onModalSubmit: SubmitHandler<{ request: string }> = ({ request }) => {
    if (request) {
      setValue("request", "");
      closeModal();
      notify();
    }
  };

  return (
    <div className="flex w-full flex-col pt-8">
      <button className="w-fit text-14 font-500 text-gray-400 underline" onClick={() => openModal("reqArtist")} type="button">
        찾으시는 아티스트가 없으신가요?
      </button>
      <section className="pt-24">
        <SearchInput placeholder="입력해주세요." setKeyword={setKeyword} />
      </section>
      <div className="sticky top-72 z-nav mb-16 mt-8 flex w-full gap-12 overflow-hidden bg-white-black">
        {selected.map((name, idx) => (
          <div className="mb-8 mt-8 rounded-full bg-white-black" key={name}>
            <ChipButton label={name} onClick={() => handleArtistClick(name, !myArtists.includes(name))} ref={idx === selected.length - 1 ? lastButton : undefined} canDelete />
          </div>
        ))}
      </div>
      <ul className="flex w-full flex-wrap justify-center gap-x-16 gap-y-20 overflow-hidden px-8">
        {searchedData.map((cardList) => (
          <Card data={cardList} onClick={handleArtistClick} myArtists={myArtists} key={cardList.name} />
        ))}
      </ul>
      {modal === "reqArtist" && (
        <InputModal
          title="아티스트 등록 요청"
          btnText="요청하기"
          handleBtnClick={handleSubmit(onModalSubmit)}
          closeModal={closeModal}
          {...{ name: "request", placeholder: "찾으시는 아티스트를 알려주세요.", rules: { required: "내용을 입력하세요." }, control, noButton: true }}
        />
      )}
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

  const [isChecked, setIsChecked] = useState<boolean>(false);

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

      <input name="myArtists" type="checkbox" id={name} onChange={() => onClick(name, !isChecked)} checked={isChecked} hidden />
    </li>
  );
};