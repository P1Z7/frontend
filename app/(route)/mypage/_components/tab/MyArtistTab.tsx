"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import ArtistCard from "@/components/ArtistCard";
import { instance } from "@/api/api";
import { ArtistType } from "@/types/index";

interface Props {
  userId: string;
}

const MyArtistTab = ({ userId }: Props) => {
  const router = useRouter();

  const { data: myArtistsData, isSuccess } = useQuery<ArtistType[]>({
    queryKey: ["myArtist"],
    queryFn: async () => {
      return instance.get(`/users/${userId}/artists`);
    },
  });

  if (!isSuccess) return;
  return (
    <div className="flex flex-col items-start gap-16 px-20 py-24 pb-88 pc:gap-24 pc:p-32 pc:pb-16">
      {!!myArtistsData?.length && (
        <button className="pl- text-14 font-500 text-blue" onClick={() => router.push("/setting/my-artist")}>
          팔로우 아티스트 수정하기
        </button>
      )}
      <div className="flex w-full flex-col items-center">
        <div className="flex w-full flex-wrap justify-center gap-20 pc:justify-start pc:gap-32">
          {myArtistsData?.length ? (
            myArtistsData.map((artist) => {
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
            })
          ) : (
            <FollowArtistHero />
          )}
        </div>
      </div>
    </div>
  );
};

const FollowArtistHero = () => {
  const router = useRouter();

  return (
    <div className="w-full px-20 pc:px-40">
      <div className="flex-center relative h-232 overflow-hidden rounded-lg border border-main-pink-50 pc:h-280">
        <img src="/image/pink-hero.webp" className="absolute min-h-280 object-cover pc:h-full" alt="배너이미지" />
        <div className="flex-center z-heart w-full flex-col gap-16">
          <p className="text-center text-18 font-700 text-main-pink-500 pc:text-20">
            좋아하는 아티스트를 설정하여
            <br />
            원하는 행사만 더 빠르게 확인해 보세요!
          </p>
          <button
            onClick={() => router.push("/setting/my-artist")}
            className="h-32 rounded-full bg-main-pink-500 px-16 text-14 font-600 leading-loose text-white-white pc:h-40 pc:text-18"
          >
            설정하러 가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyArtistTab;
