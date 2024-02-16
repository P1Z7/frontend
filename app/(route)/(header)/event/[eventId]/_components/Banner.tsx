"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Api } from "app/_api/api";
import Image from "next/image";
import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode, useEffect, useState } from "react";
import Chip from "@/components/chip/Chip";
import { useStore } from "@/store/index";
import { formatDate } from "@/utils/formatString";
import { EventCardType, EventType, TargetArtistType } from "@/types/index";
import { SnsIcon } from "@/constants/snsIcon";
import CalendarIcon from "@/public/icon/calendar.svg";
import GiftIcon from "@/public/icon/gift.svg";
import HeartIcon from "@/public/icon/heart.svg";
import LinkIcon from "@/public/icon/link.svg";
import MapIcon from "@/public/icon/map.svg";
import UserIcon from "@/public/icon/user.svg";
import DefaultImage from "@/public/image/no-profile.png";

const IconStyleProps = {
  mobile: {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    stroke: "#A0A5B1",
  },
  pc: {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    stroke: "#A0A5B1",
  },
};

const USER_ID = "4a256531-6f40-41de-aba2-d37d7507e5d7";

interface Props {
  data: EventCardType;
  eventId: string;
}

const Banner = ({ data, eventId }: Props) => {
  const { setEventHeader } = useStore((state) => ({ setEventHeader: state.setEventHeader }));
  useEffect(() => {
    setEventHeader(data.placeName);
  }, []);

  const formattedDate = formatDate(data.startDate, data.endDate, true);
  const bannerImage = data.eventImages.find((images) => images.isMain);
  const formattedOrganizerSns = data.organizerSns[0] === "@" ? data.organizerSns : `@${data.organizerSns}`;

  const instance = new Api(process.env.NEXT_PUBLIC_ACCESS_TOKEN);
  const queryClient = useQueryClient();

  const getEventLiked = async (userId: string, eventId: string) => {
    const data: boolean = await instance.get("/event/like", { userId, eventId });
    return data;
  };

  const likeEvent = async (userId: string, eventId: string) => {
    const data = await instance.post("/event/like", { userId, eventId });
  };

  const { data: isLiked } = useQuery({
    queryKey: ["eventLiked", eventId],
    queryFn: () => getEventLiked(USER_ID, eventId),
  });

  const likeMutation = useMutation({
    mutationFn: ({ userId, eventId }: { userId: string; eventId: string }) => likeEvent(userId, eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["eventLiked", eventId] });
    },
  });

  const handleLikeEvent = () => {
    likeMutation.mutate({ userId: USER_ID, eventId });
  };

  return (
    <section className="w-full tablet:flex tablet:gap-24 tablet:pb-32 tablet:pt-[7rem]">
      <div className="relative h-[48rem] w-full tablet:h-[55rem] tablet:w-[40.5rem]">
        <Image src={bannerImage?.imageUrl ?? DefaultImage} alt={"행사 포스터 썸네일"} priority fill sizes="100vw" className="object-cover" />
      </div>
      <div className="relative bottom-24 grow rounded-t-lg bg-white-black p-24 pb-0 tablet:bottom-0 tablet:p-0">
        <HeartButton isLiked={isLiked ?? false} likeCount={data.likeCount} onClick={handleLikeEvent} />
        <MainDescription placeName={data.placeName} artists={data.targetArtists} eventType={data.eventType} />
        <div className="flex flex-col gap-8 pt-16 text-14 font-500 tablet:gap-20 tablet:pt-24">
          <SubDescription>
            <div className="tablet:hidden">
              <CalendarIcon {...IconStyleProps.mobile} />
            </div>
            <div className="hidden tablet:block">
              <CalendarIcon {...IconStyleProps.pc} />
            </div>
            {formattedDate}
          </SubDescription>
          <SubDescription>
            <div className="tablet:hidden">
              <MapIcon {...IconStyleProps.mobile} />
            </div>
            <div className="hidden tablet:block">
              <MapIcon {...IconStyleProps.pc} />
            </div>
            {`${data.address} ${data.addressDetail}`}
          </SubDescription>
          <SubDescription isVisible={Boolean(data.eventTags.length !== 0)}>
            <div className="tablet:hidden">
              <GiftIcon {...IconStyleProps.mobile} />
            </div>
            <div className="hidden tablet:block">
              <GiftIcon {...IconStyleProps.pc} />
            </div>
            <div className="flex items-center gap-4 tablet:gap-8">
              {data.eventTags.map((tag) => (
                <Chip key={tag.tagId} kind="goods" label={tag.tagName} />
              ))}
            </div>
          </SubDescription>
          <SubDescription isVisible={Boolean(data.eventUrl)}>
            <div className="tablet:hidden">
              <LinkIcon {...IconStyleProps.mobile} />
            </div>
            <div className="hidden tablet:block">
              <LinkIcon {...IconStyleProps.pc} />
            </div>
            <Link href={data?.eventUrl ?? ""} target="_blank" rel="noreferrer noopener" className="text-blue">
              {data?.eventUrl}
            </Link>
          </SubDescription>
          <SubDescription isVisible={Boolean(data.organizerSns)}>
            <div className="tablet:hidden">
              <UserIcon {...IconStyleProps.mobile} />
            </div>
            <div className="hidden tablet:block">
              <UserIcon {...IconStyleProps.pc} />
            </div>
            <div className="flex items-center gap-4">
              {SnsIcon[data?.snsType ?? "기타"]}
              <span>{formattedOrganizerSns}</span>
            </div>
          </SubDescription>
        </div>
      </div>
    </section>
  );
};

export default Banner;

interface MainDescriptionProps {
  placeName: string;
  artists: TargetArtistType[];
  eventType: EventType;
}

const MainDescription = ({ placeName, artists, eventType }: MainDescriptionProps) => {
  const formatArtist = (artists: { artistName: string; groupName: string }[]) => {
    return artists.map((artist) => `${artist.artistName}${artist.groupName ? ` (${artist.groupName})` : ""}`).join(", ");
  };
  const formattedArtist = formatArtist(artists);

  return (
    <div className="flex flex-col gap-8 border-b border-gray-100 pb-16 tablet:gap-12 tablet:pb-32">
      <h1 className="h-24 text-20 font-600 tablet:text-[2.8rem] tablet:leading-[2.4rem]">{placeName}</h1>
      <div className="flex items-center gap-8">
        <span className="text-16 font-600 tablet:text-20">{formattedArtist}</span>
        <Chip kind="event" label={eventType} />
      </div>
    </div>
  );
};

interface SubDescriptionProps {
  isVisible?: boolean;
  children: ReactNode;
}

const SubDescription = ({ isVisible = true, children }: SubDescriptionProps) => {
  return <>{isVisible && <div className="flex h-20 items-center gap-12 text-14 tablet:gap-16 tablet:text-16">{children}</div>}</>;
};

interface HeartButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLiked: boolean;
  likeCount: number;
}

const HeartButton = ({ isLiked, likeCount, onClick }: HeartButtonProps) => {
  const [liked, setLiked] = useState(isLiked);

  return (
    <button onClick={onClick} className="absolute right-20 top-24 text-center text-12 font-600 tablet:right-0 tablet:top-0 tablet:text-14">
      <div className="tablet:hidden">
        <HeartIcon stroke={liked ? "#FF50AA" : "#1C1E22"} fill={liked ? "#FF50AA" : "none"} strokeWidth={1.7} />
      </div>
      <div className="hidden tablet:block">
        <HeartIcon stroke={liked ? "#FF50AA" : "#1C1E22"} fill={liked ? "#FF50AA" : "none"} width={32} height={32} viewBox="0 0 24 24" strokeWidth={1.4} />
      </div>
      {likeCount}
    </button>
  );
};
