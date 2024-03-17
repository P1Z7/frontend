import { useInfiniteQuery } from "@tanstack/react-query";
import { instance } from "app/_api/api";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ArtistCard from "@/components/ArtistCard";
import ChipButton from "@/components/chip/ChipButton";
import SearchInput from "@/components/input/SearchInput";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { useModal } from "@/hooks/useModal";
import { openToast } from "@/utils/toast";
import { Res_Get_Type } from "@/types/getResType";
import { ArtistType } from "@/types/index";
import { TOAST_MESSAGE } from "@/constants/toast";

const InputModal = dynamic(() => import("@/components/modal/InputModal"), { ssr: false });

interface Props {
  onClick: (name: string, id: string, isChecked: boolean) => void;
  myArtists: string[];
  myArtistsInfo: { name: string; id: string }[];
}

const SIZE = 50;

const SearchArtist = ({ onClick, myArtists, myArtistsInfo }: Props) => {
  const [keyword, setKeyword] = useState("");

  const getArtists = async ({ pageParam = 1 }) => {
    const data: Res_Get_Type["artistGroup"] = await instance.get("/artist/group", {
      keyword: keyword,
      size: SIZE,
      page: pageParam,
    });
    return data;
  };

  const { data: artistData, fetchNextPage } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["artist", keyword],
    queryFn: getArtists,
    getNextPageParam: (lastPage) => (lastPage.page * SIZE < lastPage.totalCount ? lastPage.page + 1 : null),
  });

  const containerRef = useInfiniteScroll({
    handleScroll: fetchNextPage,
    deps: [artistData],
  });

  const [selected, setSelected] = useState(myArtistsInfo);
  const lastButton = useRef<HTMLButtonElement>(null);

  const handleArtistClick = (name: string, isChecked: boolean, id: string) => {
    onClick(name, id, isChecked);

    setSelected((prevSelected) => {
      const isSelected = prevSelected.some((item) => item.id === id);
      if (isSelected) {
        return prevSelected.filter((item) => item.id !== id);
      } else {
        return [...prevSelected, { name, id }];
      }
    });
  };

  useEffect(() => {
    lastButton.current?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "end" });
  }, [selected]);

  const { modal, openModal, closeModal } = useModal();
  const { control, handleSubmit, setValue, watch } = useForm({ defaultValues: { name: "" } });
  const name = watch("name");

  const notify = () => openToast.success(TOAST_MESSAGE.request.success);

  const onModalSubmit: SubmitHandler<{ name: string }> = async () => {
    if (name) {
      try {
        const res = await instance.post("/artist/request", {
          name: name,
        });
        if (res.error) {
          throw new Error(res.error);
        }
        setValue("name", "");
        closeModal();
        notify();
      } catch (error: any) {
        openToast.error(TOAST_MESSAGE.request.error);
      }
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
      <section className="sticky top-72 z-nav mb-16 mt-8 flex w-full gap-12 overflow-hidden bg-white-black pc:mb-0">
        {selected.map((item, idx) => (
          <div className="mb-8 mt-8 rounded-full bg-white-black" key={idx}>
            <ChipButton
              label={item.name}
              onClick={() => handleArtistClick(item.name, !myArtists.includes(item.id), item.id)}
              ref={idx === selected.length - 1 ? lastButton : undefined}
              canDelete
            />
          </div>
        ))}
      </section>
      <div className="flex-center w-full px-8 pc:px-0">
        <ul className="flex w-full max-w-[60rem] flex-wrap justify-center gap-x-16 gap-y-20 overflow-hidden tablet:max-w-[90rem] tablet:gap-x-32 pc:h-[64rem] pc:gap-y-24 pc:overflow-scroll">
          {artistData?.pages.map((page) => page.artistAndGroupList.map((artist) => <Card data={artist} key={artist.id} onClick={handleArtistClick} myArtists={myArtists} />))}
        </ul>
      </div>
      <div ref={containerRef} className="h-16 w-full pc:h-0" />
      {modal === "reqArtist" && (
        <InputModal
          title="아티스트 등록 요청"
          btnText="요청하기"
          handleBtnClick={handleSubmit(onModalSubmit)}
          closeModal={closeModal}
          {...{ name: "name", placeholder: "찾으시는 아티스트를 알려주세요.", rules: { required: "내용을 입력하세요." }, control, noButton: true }}
        />
      )}
    </div>
  );
};

export default SearchArtist;

interface CardProps {
  data: ArtistType;
  onClick: (name: string, isChecked: boolean, id: string) => void;
  myArtists: string[];
}

const Card = ({ data, onClick, myArtists }: CardProps) => {
  const { name, image, id } = data;

  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    setIsChecked(myArtists.includes(id));
  }, [myArtists]);

  return (
    <li>
      <label htmlFor={id}>
        <ArtistCard isChecked={isChecked} profileImage={image === "http://image.co.kr" ? undefined : image} isSmall>
          {name}
        </ArtistCard>
      </label>

      <input name="myArtists" type="checkbox" id={id} onChange={() => onClick(name, !isChecked, id)} checked={isChecked} hidden />
    </li>
  );
};
