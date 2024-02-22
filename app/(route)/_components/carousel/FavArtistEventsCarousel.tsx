"use client";

import { useQuery } from "@tanstack/react-query";
import { instance } from "app/_api/api";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getSession } from "@/store/session/cookies";
import { Res_Get_Type } from "@/types/getResType";

const Carousel = dynamic(() => import("./Carousel"), { ssr: false });

const MyArtistEventsCarousel = () => {
  const [isLogin, setIsLogin] = useState(false);
  const session = getSession();
  useEffect(() => {
    if (session) {
      setIsLogin(true);
    }
  }, [session]);

  const { data: myArtistEvent, isLoading } = useQuery<Res_Get_Type["eventList"]>({
    queryKey: ["myArtistEvent"],
    queryFn: async () => {
      if (!session) {
        return null;
      }
      return instance.get(`/event/new/${session?.user.userId}/artist`);
    },
    enabled: isLogin,
  });

  const { data: myArtist } = useQuery({
    queryKey: ["myArtist"],
    queryFn: async () => {
      if (!session) {
        return null;
      }
      return instance.get(`/users/${session?.user.userId}/artists`);
    },
    enabled: isLogin,
  });

  return (
    <div className="flex flex-col gap-16 pc:gap-24">
      <div className="flex h-32 items-center justify-between self-stretch px-20 pc:px-48">
        {isLogin && (
          <>
            <h2 className="text-20 font-700 text-gray-900">내 아티스트의 새 행사</h2>
            {!!myArtistEvent?.length && (
              <Link href="/my-artist-event" className="text-12 font-600 text-blue">
                전체보기
              </Link>
            )}
          </>
        )}
      </div>
      <RenderContent status={isLogin} hasMyArtistEvents={!!myArtistEvent?.length} hasMyArtist={!!myArtist?.length} isLoading={isLoading} myArtistEvent={myArtistEvent} />
    </div>
  );
};

interface RenderContentProps {
  status?: boolean;
  hasMyArtistEvents: boolean;
  isLoading: boolean;
  myArtistEvent?: Res_Get_Type["eventList"];
  hasMyArtist: boolean;
}

const RenderContent = ({ status, hasMyArtistEvents, isLoading, myArtistEvent, hasMyArtist }: RenderContentProps) => {
  if (!status) {
    return <LoginHero />;
  }

  if (isLoading) {
    return null;
  }

  if (!hasMyArtist) {
    return <FollowArtistHero />;
  }

  if (hasMyArtist && !hasMyArtistEvents) {
    return <NoNewCard />;
  }

  return <Carousel cards={myArtistEvent} />;
};

const LoginHero = () => {
  const router = useRouter();

  return (
    <div className="w-full px-20 pc:px-40">
      <div className="flex-center relative h-160 overflow-hidden rounded-lg border border-main-pink-50 pc:h-232">
        <img src="/image/hero.avif" className="min-h-180 object-cover pc:h-full" alt="배너이미지" />
        <div className="flex-center absolute top-96 w-full flex-col gap-16 pc:top-152">
          <button onClick={() => router.push("/signin")} className="h-32 rounded-full bg-gray-900 px-16 text-14 font-600 leading-loose text-white-white pc:h-40 pc:text-18">
            로그인 하기
          </button>
        </div>
      </div>
    </div>
  );
};

export const FollowArtistHero = () => {
  const router = useRouter();

  return (
    <div className="w-full px-20 pc:px-40">
      <div className="flex-center relative h-160 overflow-hidden rounded-lg border border-main-pink-50 pc:h-232">
        <img src="/image/pink-hero.webp" className="absolute min-h-200 object-cover pc:h-full" alt="배너이미지" />
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

const NoNewCard = () => {
  return (
    <div className="w-full px-20 pc:px-40">
      <div className="flex-center relative h-160 overflow-hidden rounded-lg border border-gray-200 pc:h-232">
        <img src="/image/gray-hero.webp" className="absolute min-h-180 object-cover pc:h-full" alt="배너이미지" />
        <div className="flex-center z-heart w-full flex-col gap-16">
          <p className="text-center text-18 font-600 text-gray-500 pc:text-20">팔로우한 아티스트의 예정된 새 행사가 없습니다.</p>
        </div>
      </div>
    </div>
  );
};

export default MyArtistEventsCarousel;
