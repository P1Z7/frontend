import { MOCK } from "app/_constants/mock";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ArtistCard from "@/components/ArtistCard";
import ChipButton from "@/components/chip/ChipButton";
import SearchInput from "@/components/input/SearchInput";
import { useModal } from "@/hooks/useModal";
import { ArtistType } from "@/types/index";
import AlertModal from "./modal/AlertModal";
import InputModal from "./modal/InputModal";

interface Props {
  data: ArtistType[];
  onClick: (id: string, isChecked: boolean) => void;
  myArtists: string[];
}

const SearchArtist = ({ data, onClick, myArtists }: Props) => {
  const { modal, openModal, closeModal } = useModal();
  const [artistList, setArtistList] = useState("");
  const [checked, setChecked] = useState<string[]>([]);
  const [searchedData, setSearchedData] = useState(data);
  const lastButton = useRef<HTMLButtonElement>(null);
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

  const onSubmit: SubmitHandler<{ request: string }> = ({ request }) => {
    if (request) {
      setValue("request", "");
      closeModal();
      notify();
    }
  };

  useEffect(() => {
    // 검색 API 들어갈 자리
    setSearchedData(
      MOCK.filter((item) => {
        return item.name.toLowerCase().includes(artistList.toLowerCase()) || (item.group && item.group.some((group) => group.toLowerCase().includes(artistList.toLowerCase())));
      }),
    );
  }, [artistList]);

  useEffect(() => {
    lastButton.current?.scrollIntoView({ behavior: "smooth" });
  }, [lastButton.current]);

  return (
    <div className="flex flex-col gap-24 pt-8">
      <button className="w-fit text-14 font-500 text-gray-400 underline" onClick={() => openModal("reqArtist")} type="button">
        찾으시는 아티스트가 없으신가요?
      </button>
      <SearchInput placeholder="입력해주세요." setKeyword={setArtistList} />
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
      {modal === "reqArtist" && (
        <InputModal
          title="아티스트 등록 요청"
          btnText="요청하기"
          handleBtnClick={handleSubmit(onSubmit)}
          closeModal={closeModal}
          {...{ name: "request", placeholder: "찾으시는 아티스트를 알려주세요.", rules: { required: "내용을 입력하세요." }, control, noButton: true }}
        />
      )}
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
      <ChipButton key={name} label={name} onClick={handleDelete} canDelete />
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
