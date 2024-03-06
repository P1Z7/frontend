"use client";

import { FollowArtistHero } from "@/(route)/_components/carousel/FavArtistEventsCarousel";
import { useQuery } from "@tanstack/react-query";
import { instance } from "@/api/api";
import { ArtistType } from "@/types/index";
import MyArtistEvent from "./MyArtistEvent";
import MyArtists from "./MyArtists";

interface Props {
  userId: string;
}

const MyArtistTab = ({ userId }: Props) => {
  const { data: myArtistsData, isSuccess } = useQuery<ArtistType[]>({
    queryKey: ["myArtist"],
    queryFn: async () => {
      return instance.get(`/users/${userId}/artists`);
    },
  });

  if (!isSuccess) return;
  return (
    <>
      {!myArtistsData?.length ? (
        <div className="px-20 py-24 pb-88 pc:gap-24 pc:p-32 pc:pb-16">
          <FollowArtistHero />
        </div>
      ) : (
        <div className="flex w-full flex-col items-start gap-80 px-20 py-24 pb-88 pc:gap-60 pc:p-32 pc:pb-16">
          <MyArtists data={myArtistsData} />
          <MyArtistEvent userId={userId} />
        </div>
      )}
    </>
  );
};

export default MyArtistTab;
