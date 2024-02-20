"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";
import Alert from "@/components/Alert";
import Chip from "@/components/chip/Chip";
import ReportModal from "@/components/modal/ReportModal";
import { instance } from "@/api/api";
import { useModal } from "@/hooks/useModal";
import { useStore } from "@/store/index";
import { formatDate } from "@/utils/formatString";
import { Res_Get_Type } from "@/types/getResType";
import { EventCardType, EventType, TargetArtistType } from "@/types/index";
import { SnsIcon } from "@/constants/snsIcon";
import CalendarIcon from "@/public/icon/calendar.svg";
import GiftIcon from "@/public/icon/gift.svg";
import LinkIcon from "@/public/icon/link.svg";
import MapIcon from "@/public/icon/map.svg";
import UserIcon from "@/public/icon/user.svg";
import DefaultImage from "@/public/image/no-profile.png";
import HeartButton from "./HeartButton";

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
interface Props {
  data: EventCardType;
  eventId: string;
}

const Banner = ({ data, eventId }: Props) => {
  const { modal, openModal, closeModal } = useModal();
  const { setEventHeader } = useStore((state) => ({ setEventHeader: state.setEventHeader }));
  useEffect(() => {
    setEventHeader(data.placeName);
  }, []);

  const pathname = usePathname();

  const formattedDate = formatDate(data.startDate, data.endDate, true);
  const bannerImage = data.eventImages.find((images) => images.isMain);
  const formattedOrganizerSns = data.organizerSns[0] === "@" ? data.organizerSns : `@${data.organizerSns}`;

  const { data: editApplication } = useQuery<Res_Get_Type["editApplication"]>({
    queryKey: ["approve", eventId],
    queryFn: async () => {
      return instance.get(`/event/${eventId}/update/application`);
    },
  });
  const hasEditApplication = editApplication ? editApplication?.length !== 0 : false;

  return (
    <>
      <section className="w-full pc:flex pc:gap-24 pc:pb-32 pc:pt-[7rem]">
        <div className="relative h-[48rem] w-full pc:h-[55rem] pc:w-[40.5rem]">
          <Image src={bannerImage?.imageUrl ?? DefaultImage} alt={"행사 포스터 썸네일"} priority fill sizes="100vw" className="object-cover" />
        </div>
        <div className="relative bottom-24 grow rounded-t-lg bg-white-black p-24 pb-0 pc:bottom-0 pc:p-0">
          <HeartButton eventId={data.id} initialLikeCount={data.likeCount} />
          <MainDescription placeName={data.placeName} artists={data.targetArtists} eventType={data.eventType} />
          <div className="flex flex-col gap-8 pt-16 text-14 font-500 pc:gap-20 pc:pt-24">
            <SubDescription>
              <div className="pc:hidden">
                <CalendarIcon {...IconStyleProps.mobile} />
              </div>
              <div className="hidden pc:block">
                <CalendarIcon {...IconStyleProps.pc} />
              </div>
              {formattedDate}
            </SubDescription>
            <SubDescription>
              <div className="pc:hidden">
                <MapIcon {...IconStyleProps.mobile} />
              </div>
              <div className="hidden pc:block">
                <MapIcon {...IconStyleProps.pc} />
              </div>
              {`${data.address} ${data.addressDetail}`}
            </SubDescription>
            <SubDescription isVisible={Boolean(data.eventTags.length !== 0)}>
              <div className="pc:hidden">
                <GiftIcon {...IconStyleProps.mobile} />
              </div>
              <div className="hidden pc:block">
                <GiftIcon {...IconStyleProps.pc} />
              </div>
              <div className="flex flex-wrap items-center gap-4 pc:gap-8">
                {data.eventTags.map((tag) => (
                  <Chip key={tag.tagId} kind="goods" label={tag.tagName} />
                ))}
              </div>
            </SubDescription>
            <SubDescription isVisible={Boolean(data.eventUrl)}>
              <div className="pc:hidden">
                <LinkIcon {...IconStyleProps.mobile} />
              </div>
              <div className="hidden pc:block">
                <LinkIcon {...IconStyleProps.pc} />
              </div>
              <Link href={data?.eventUrl ?? ""} target="_blank" rel="noreferrer noopener" className="text-wrap text-blue">
                {data?.eventUrl}
              </Link>
            </SubDescription>
            <SubDescription isVisible={Boolean(data.organizerSns)}>
              <div className="pc:hidden">
                <UserIcon {...IconStyleProps.mobile} />
              </div>
              <div className="hidden pc:block">
                <UserIcon {...IconStyleProps.pc} />
              </div>
              <div className="flex items-center gap-4">
                {SnsIcon[data?.snsType ?? "기타"]}
                <span>{formattedOrganizerSns}</span>
              </div>
            </SubDescription>
            {hasEditApplication && <Alert href={pathname + "/approve"} message="수정요청 정보가 있습니다." />}
          </div>
          <div className="absolute bottom-0 right-0 hidden text-14 font-400 pc:block">
            <Link href={pathname + "/edit"} className="mr-16 text-blue">
              수정하기
            </Link>
            <button className="text-gray-400" onClick={() => openModal("report")}>
              신고하기
            </button>
          </div>
        </div>
      </section>
      {modal === "report" && <ReportModal closeModal={closeModal} type="event" />}
    </>
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
    <div className="flex flex-col gap-8 border-b border-gray-100 pb-16 pc:gap-12 pc:pb-32">
      <h1 className="h-24 text-20 font-600 pc:text-[2.8rem] pc:leading-[2.4rem]">{placeName}</h1>
      <div className="flex items-center gap-8">
        <span className="text-16 font-600 pc:max-w-308 pc:text-20">{formattedArtist}</span>
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
  return <>{isVisible && <div className="flex gap-12 break-all text-14 pc:gap-16 pc:text-16">{children}</div>}</>;
};
