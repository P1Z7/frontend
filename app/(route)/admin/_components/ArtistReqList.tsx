import { useInfiniteQuery } from "@tanstack/react-query";
import classNames from "classnames";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import InputFile from "@/components/input/InputFile";
import { instance } from "@/api/api";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { makeImgUrlList } from "@/utils/changeImgUrl";
import { openToast } from "@/utils/toast";

const SIZE = 12;

const ArtistReqList = () => {
  const [artistList, setArtistList] = useState<any[]>([]);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const { data, fetchNextPage, isSuccess, isLoading } = useInfiniteQuery({
    queryKey: ["admin_artist"],
    queryFn: async ({ pageParam }) => {
      const res = await instance.get("/users/new-artists", { size: SIZE, cursorId: pageParam });
      pageParam === 500 ? setArtistList(res) : setArtistList((prev) => [...prev, ...res]);
      return res;
    },
    initialPageParam: 500,
    getNextPageParam: (lastPage) => (lastPage.length < SIZE ? null : lastPage.at(-1)?.cursorId),
  });
  const containerRef = useInfiniteScroll({ handleScroll: fetchNextPage, deps: [data] });

  const { control, register, watch, getValues } = useForm();
  const { artistProfile, artistName, birthday, option } = watch();
  const isDisabled = !(artistProfile && artistProfile.length > 0 && artistName && birthday);

  const handleArtistSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      setIsSubmitLoading(true);
      const imgUrl = await makeImgUrlList(artistProfile, instance);
      const res =
        option === "아티스트"
          ? await instance.post("/artist", { artistImage: imgUrl[0], artistName, groups: [getValues("groupName")], birthday })
          : await instance.post("/group", { groupImage: imgUrl[0], debutDate: birthday, groupName: artistName });
      openToast.success("아티스트 등록 성공!");
    } catch (err) {
      openToast.error("아티스트 등록 실패!");
    } finally {
      setIsSubmitLoading(false);
    }
  };

  return (
    <div className="flex h-full w-full flex-col overflow-y-scroll pr-4">
      <h1 className="text-20 font-600">아티스트/그룹 등록하기</h1>
      <form className="flex flex-col gap-8 text-black-white" onSubmit={handleArtistSubmit}>
        <p className="text-white-white">*그룹 / 아티스트를 선택해주세요!!!</p>
        <select className="rounded-sm p-8" {...register("option")}>
          <option>그룹</option>
          <option>아티스트</option>
        </select>
        <p className="text-white-white">*이미지 (필수)</p>
        <div className="flex gap-4">
          <InputFile control={control} {...register("artistProfile")} />
          <div className="relative h-120 w-120">
            {artistProfile && <Image alt="등록 요청할 아티스트 이미지" src={URL.createObjectURL(artistProfile[0])} fill sizes="120, 120" className="object-cover" />}
          </div>
        </div>
        {option === "아티스트" && <input placeholder="그룹 ID(선택)" className="rounded-sm p-8" {...register("groupName")} />}
        <input placeholder={option === "아티스트" ? "아티스트 이름(필수)" : "그룹 이름(필수)"} className="rounded-sm p-8" {...register("artistName")} />
        <p className="text-white-white">{option === "아티스트" ? "*생일(필수)" : "*데뷔일(필수)"}</p>
        <input type="date" placeholder="생일(필수)" className="rounded-sm p-8" {...register("birthday")} />
        <button disabled={isDisabled || isSubmitLoading} className={classNames("rounded-sm bg-red px-12 py-8 text-white-white", { "!bg-gray-300": isDisabled || isSubmitLoading })}>
          등록
        </button>
      </form>
      <div className="my-16 border border-white-white" />
      <h1 className="text-20 font-600">아티스트 등록 요청 목록</h1>
      {isSuccess &&
        (data.pages[0].length > 0 ? (
          <div>
            {artistList.map(({ id, name }) => (
              <div key={id}>{name}</div>
            ))}
          </div>
        ) : (
          <p>아티스트 요청 데이터가 없습니다.</p>
        ))}
      {isLoading && <p>로딩중...</p>}
      <div ref={containerRef} className="h-4" />
    </div>
  );
};

export default ArtistReqList;
