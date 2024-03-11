import { useRouter } from "next/navigation";
import ArtistCard from "@/components/ArtistCard";
import { ArtistType } from "@/types/index";

const MyArtists = ({ data }: { data: ArtistType[] }) => {
  const router = useRouter();

  return (
    <div className="flex w-full flex-col gap-16">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-20 font-700 text-gray-900">내 아티스트</h1>
        <button className="pl- text-14 font-500 text-blue" onClick={() => router.push("/setting/my-artist")}>
          팔로우 아티스트 수정하기
        </button>
      </div>
      <div className="flex w-full flex-col items-center">
        <div className="flex w-full flex-wrap justify-center gap-20 tablet:justify-start pc:gap-32">
          {data.map((artist) => {
            if (!artist) {
              return null;
            }
            return (
              <ArtistCard
                key={artist.id}
                profileImage={artist.image}
                onClick={() => {
                  router.push(`/search?keyword=${artist.name}`);
                }}
              >
                {artist.name}
              </ArtistCard>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyArtists;
