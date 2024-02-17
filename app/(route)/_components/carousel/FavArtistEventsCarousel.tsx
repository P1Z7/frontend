"use client";

import { useQuery } from "@tanstack/react-query";
import { instance } from "app/_api/api";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "@/store/session/cookies";
import { Res_Get_Type } from "@/types/getResType";
import Carousel from "./Carousel";

const SIZE = 10;

const FavArtistEventsCarousel = () => {
  const session = useSession();

  const {
    data: favArtistEvent,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ["artistEvent"],
    queryFn: async () => {
      if (!session) {
        return;
      }
      return instance.get(`/event/${session.user.userId}/artist`, {
        userId: session.user.userId,
      });
    },
  });

  return (
    <div className="flex flex-col gap-16 pc:gap-24">
      <div className="flex items-center justify-between self-stretch px-20 pc:px-48">
        {session?.isAuth && (
          <>
            <h2 className="text-20 font-700 text-gray-900">내 아티스트의 새 행사</h2>
            <Link href="/my-artist-event" className="text-12 font-600 text-blue">
              전체보기
            </Link>
          </>
        )}
      </div>
      <RenderContent status={!!session?.isAuth} hasFavoriteEvents={!!favArtistEvent?.length} isLoading={isLoading} isSuccess={isSuccess} />
    </div>
  );
};

interface RenderContentProps {
  status: boolean;
  hasFavoriteEvents: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  favArtistEvent?: Res_Get_Type["eventList"];
}

const RenderContent = ({ status, hasFavoriteEvents, isLoading, isSuccess, favArtistEvent }: RenderContentProps) => {
  if (!status) {
    return <NoFavCard buttonName="로그인 하기" href={"/signin"} />;
  }

  if (!hasFavoriteEvents) {
    return <NoFavCard buttonName="아티스트 둘러보기" href={"/setting/favorite"} />;
  }

  return (
    <>
      {isLoading && <div>로딩중</div>}
      {isSuccess && <Carousel cards={favArtistEvent} />}
    </>
  );
};

interface NoFavCardProps {
  href: string;
  buttonName: string;
}

export const NoFavCard = ({ href, buttonName }: NoFavCardProps) => {
  const router = useRouter();

  return (
    <div className="w-full px-20 pc:px-40">
      <div className="flex-center relative h-160 overflow-hidden rounded-lg border border-main-pink-50 pc:h-232">
        <Image src="/image/hero.png" fill sizes="100%" className="object-cover" alt="배너이미지" />
        <div className="flex-center absolute top-96 w-full flex-col gap-16 pc:top-152">
          <div onClick={() => router.push(href)} className="h-32 cursor-pointer rounded-full bg-gray-900 px-16 text-14 font-600 leading-loose text-white-white pc:h-40 pc:text-18">
            {buttonName}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavArtistEventsCarousel;
