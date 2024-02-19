import { keepPreviousData, useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import BottomButton from "@/components/button/BottomButton";
import { instance } from "@/api/api";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { getSession } from "@/store/session/cookies";
import { Res_Get_Type } from "@/types/getResType";
import { ArtistType } from "../_types";
import ArtistCard from "./ArtistCard";
import ChipButton from "./chip/ChipButton";
import SearchInput from "./input/SearchInput";

const SIZE = 12;

const MyArtistList = () => {
  const [keyword, setKeyword] = useState("");
  const session = getSession();
  const userId = session?.user.userId;
  const { data: myArtistData } = useQuery({ queryKey: ["myArtist"], queryFn: async (): Promise<Res_Get_Type["myArtist"][]> => await instance.get(`/users/${userId}/artists`) });

  const [selected, setSelected] = useState<ArtistType[]>([]);

  useEffect(() => {
    if (myArtistData) {
      setSelected(myArtistData.map((item) => ({ id: item.artistId, name: item.artistName, image: item.asrtistImage, type: "" })));
    }
  }, [myArtistData]);

  const [deleteData, setDeleteData] = useState<Set<string>>(new Set());
  const [addData, setAddData] = useState<Set<string>>(new Set());

  const handleArtistClick = (cur: ArtistType) => {
    if (selected.some((item) => item.id === cur.id)) {
      setSelected((prevSelected) => prevSelected.filter((item) => item.id !== cur.id));

      if (myArtistData?.some((item) => item.artistId === cur.id)) {
        setDeleteData((prev) => prev.add(cur.id));
      }
      if (!myArtistData?.some((item) => item.artistId === cur.id)) {
        setAddData((prev) => (prev.delete(cur.id), prev));
      }
    } else {
      setSelected((prevSelected) => [...prevSelected, cur]);

      if (myArtistData?.some((item) => item.artistId === cur.id)) {
        setDeleteData((prev) => (prev.delete(cur.id), prev));
      }
      if (!myArtistData?.some((item) => item.artistId === cur.id)) {
        setAddData((prev) => prev.add(cur.id));
      }
    }
  };

  const handleSubmit = async () => {
    const session = getSession();
    if (addData.size) {
      const res = await instance.post(`/users/${session?.user.userId}/artists`, {
        artistIds: [...addData],
      });
    }
    if (deleteData.size) {
      const deleteRes = await instance.delete(`/users/${session?.user.userId}/artists`, {
        artistIds: [...deleteData],
      });
    }
  };

  const queryClient = useQueryClient();
  const artistMutation = useMutation({
    mutationFn: handleSubmit,
    onSuccess: () => queryClient.refetchQueries({ queryKey: ["myArtist"] }),
  });

  const {
    data: artistData,
    fetchNextPage,
    isFetching,
    refetch,
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["artist"],
    queryFn: async ({ pageParam = 1 }): Promise<Res_Get_Type["artistGroup"]> => await instance.get("/artist/group", { size: SIZE, page: pageParam, keyword }),
    getNextPageParam: (lastPage) => (lastPage.page * SIZE < lastPage.totalCount ? lastPage.page + 1 : null),
    placeholderData: keepPreviousData,
  });

  const containerRef = useInfiniteScroll({
    handleScroll: fetchNextPage,
    deps: [artistData],
  });

  return (
    <div className="flex flex-col gap-24 ">
      <section className="flex flex-col gap-16">
        <SearchInput setKeyword={setKeyword} placeholder="최애의 행사를 찾아보세요!" />
        <div className="flex w-full gap-12 overflow-auto">
          {selected.map((artist) => (
            <ChipButton label={artist.name} key={artist.id} onClick={() => handleArtistClick(artist)} canDelete />
          ))}
        </div>
      </section>
      <section className="m-auto w-320">
        <ul className="grid grid-cols-3 gap-x-16 gap-y-20 px-8">
          {artistData?.pages.map((page, index) =>
            page.artistAndGroupList.map((artist) => (
              <li key={artist.id}>
                <ArtistCard onClick={() => handleArtistClick(artist)} isChecked={selected.map((item) => item.id).includes(artist.id)} profileImage={artist.image}>
                  {artist.name}
                </ArtistCard>
              </li>
            )),
          )}
          <div ref={containerRef} />
        </ul>
      </section>
      <BottomButton onClick={() => artistMutation.mutate()}>변경 내용 저장</BottomButton>
    </div>
  );
};

export default MyArtistList;
