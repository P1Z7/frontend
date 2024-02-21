import { keepPreviousData, useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import BottomButton from "@/components/button/BottomButton";
import { instance } from "@/api/api";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { getSession } from "@/store/session/cookies";
import { Res_Get_Type } from "@/types/getResType";
import { ArtistType } from "../_types";
import ArtistCard from "./ArtistCard";
import ChipButton from "./chip/ChipButton";
import SearchInput from "./input/SearchInput";

const SIZE = 24;

const MyArtistList = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  const session = getSession();
  const userId = session?.user.userId;
  const { data: myArtistData } = useQuery<ArtistType[]>({
    queryKey: ["myArtist"],
    queryFn: async () => await instance.get(`/users/${userId}/artists`),
    placeholderData: keepPreviousData,
  });

  const [selected, setSelected] = useState<ArtistType[]>([]);
  useEffect(() => {
    if (myArtistData) {
      setSelected(myArtistData);
    }
  }, [myArtistData]);

  const [deleteData, setDeleteData] = useState<Set<string>>(new Set());
  const [addData, setAddData] = useState<Set<string>>(new Set());

  console.log(deleteData);
  console.log(addData);

  const handleArtistClick = (cur: ArtistType) => {
    if (selected.some((item) => item?.id === cur.id)) {
      setSelected((prevSelected) => prevSelected.filter((item) => item?.id !== cur.id));

      if (myArtistData?.some((item) => item?.id === cur.id)) {
        setDeleteData((prev) => prev.add(cur.id));
      }
      if (!myArtistData?.some((item) => item?.id === cur.id)) {
        setAddData((prev) => (prev.delete(cur.id), prev));
      }
    } else {
      setSelected((prevSelected) => [cur, ...prevSelected]);

      if (myArtistData?.some((item) => item?.id === cur.id)) {
        setDeleteData((prev) => (prev.delete(cur.id), prev));
      }
      if (!myArtistData?.some((item) => item?.id === cur.id)) {
        setAddData((prev) => prev.add(cur.id));
      }
    }
  };

  const [isError, setIsError] = useState(false);

  const handleSubmit = async () => {
    const session = getSession();

    try {
      if (addData.size) {
        const addRes = await instance.post(`/users/${session?.user.userId}/artists`, {
          artistIds: [...addData],
        });
        if (addRes) {
          router.push("/mypage");
          toast.success("아티스트와 가까워진 기분이에요!", {
            className: "text-16 font-600",
          });
        }
      }
      if (deleteData.size) {
        const deleteRes = await instance.delete(`/users/${session?.user.userId}/artists`, {
          artistIds: [...deleteData],
        });
        if (deleteRes) {
          router.push("/mypage");
          toast.success("아티스트와 조금 멀어졌어요...", {
            className: "text-16 font-600",
          });
        }
      }
    } catch (e) {
      setIsError(true);
      setSelected(myArtistData!.map((item) => ({ id: item.id, name: item.name, image: item.image, type: "" })));
      toast.error("앗! 다시 시도해 볼까요?", {
        className: "text-16 font-600",
      });
    } finally {
      setDeleteData(new Set());
      setAddData(new Set());
    }
  };

  const queryClient = useQueryClient();
  const artistMutation = useMutation({
    mutationFn: handleSubmit,
    onSuccess: () => queryClient.refetchQueries({ queryKey: ["myArtist"] }),
    onError: () => queryClient.refetchQueries({ queryKey: ["myArtist"] }),
  });

  const {
    data: artistData,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["artist"],
    queryFn: async ({ pageParam = 1 }): Promise<Res_Get_Type["artistGroup"]> => await instance.get("/artist/group", { size: SIZE, page: pageParam, keyword }),
    getNextPageParam: (lastPage) => (lastPage.page * SIZE < lastPage.totalCount ? lastPage.page + 1 : null),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    refetch();
  }, [keyword]);

  const containerRef = useInfiniteScroll({
    handleScroll: fetchNextPage,
    deps: [artistData],
  });

  return (
    <div className="flex flex-col gap-24">
      <section className="flex flex-col gap-16">
        <SearchInput setKeyword={setKeyword} placeholder="최애의 행사를 찾아보세요!" />
        <div className="flex w-full max-w-[52rem] snap-x snap-mandatory gap-12 overflow-auto">
          {selected.map((artist) => {
            if (!artist) {
              return null;
            }
            return (
              <div key={artist?.id} className="snap-end">
                <ChipButton label={artist?.name} onClick={() => handleArtistClick(artist)} canDelete />
              </div>
            );
          })}
        </div>
      </section>
      <section className="m-auto flex snap-y snap-mandatory">
        <ul className="flex-center max-w-[52rem] flex-wrap gap-x-16 gap-y-20 px-8 pc:max-w-[76rem]">
          {artistData?.pages.map((page) =>
            page.artistAndGroupList.map((artist) => (
              <li key={artist.id} className="snap-start">
                <ArtistCard isSmall onClick={() => handleArtistClick(artist)} isChecked={selected.map((item) => item?.id).includes(artist.id)} profileImage={artist.image}>
                  {artist.name}
                </ArtistCard>
              </li>
            )),
          )}
          <div className="h-[1px]" ref={containerRef} />
        </ul>
      </section>
      <BottomButton onClick={() => artistMutation.mutate()}>{isError ? "다시 시도하기" : "변경 내용 저장"}</BottomButton>
    </div>
  );
};

export default MyArtistList;
