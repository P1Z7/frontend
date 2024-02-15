import { NoFavCard } from "@/(route)/_components/carousel/FavArtistEventsCarousel";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import ArtistCard from "@/components/ArtistCard";
import { Api } from "@/api/api";
import { MyArtistsType } from "@/types/index";

const MyArtistTab = () => {
  const router = useRouter();
  const instance = new Api(process.env.NEXT_PUBLIC_ACCESS_TOKEN);
  const ID = "b4a2354c-ff70-49c5-be9b-02bdd83e4df9";
  const NoneMyArtistID = "f14ab7e7-ee5c-4707-b68e-ddb6cf8b0f00";

  const { data: myArtistsData, isSuccess } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      return instance.get(`/users/${ID}/artists`);
    },
  });

  if (!isSuccess) return;
  return (
    <div className="flex flex-col items-start gap-16 px-20 py-24">
      <button className="text-14 font-500 text-blue" onClick={() => router.push("/setting/favorite")}>
        팔로우 아티스트 수정하기
      </button>
      <div className="flex w-full flex-col items-center">
        <div className="flex w-full flex-wrap justify-center gap-20">
          {Array.isArray(myArtistsData) ? (
            myArtistsData.map((cardList: MyArtistsType) => (
              <ArtistCard
                isSmall
                key={cardList.artistId}
                profileImage={cardList.artistImage}
                onClick={() => {
                  console.log(`${cardList.artistName}(으)로 검색`);
                }}
              >
                {cardList.artistName}
              </ArtistCard>
            ))
          ) : (
            <NoFavCard buttonName="아티스트 둘러보기" href={"/setting/artist"} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MyArtistTab;
