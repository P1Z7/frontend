import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import Chip from "@/components/chip/Chip";
import { formatDate } from "@/utils/formatString";
import { EventCardType, EventType, TargetArtistType } from "@/types/index";
import CalendarIcon from "@/public/icon/calendar.svg";
import GiftIcon from "@/public/icon/gift.svg";
import HeartIcon from "@/public/icon/heart.svg";
import InstagramIcon from "@/public/icon/instagram.svg";
import LinkIcon from "@/public/icon/link.svg";
import MapIcon from "@/public/icon/map.svg";
import TwitterIcon from "@/public/icon/twitter.svg";
import UserIcon from "@/public/icon/user.svg";
import YoutubeIcon from "@/public/icon/youtube.svg";

const IconStyleProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  stroke: "#A0A5B1",
};

const SnsIcon = {
  트위터: <TwitterIcon />,
  인스타그램: <InstagramIcon />,
  유튜브: <YoutubeIcon />,
  기타: null,
};

interface Props {
  data: EventCardType;
}

const Banner = ({ data }: Props) => {
  const formattedDate = formatDate(data.startDate, data.endDate, true);
  const bannerImage = data.eventImages.find((images) => images.isMain);

  return (
    <section className="w-full">
      <div className="relative h-[48rem] w-full">
        <Image src={bannerImage?.imageUrl ?? ""} alt={"행사 포스터 썸네일"} priority fill className="object-cover" />
      </div>
      <div className="relative bottom-24 rounded-t-lg bg-white-black p-24 pb-0">
        <button className="absolute right-20 top-24 text-center text-12 font-600">
          <HeartIcon stroke="#1C1E22" />
          {100}
        </button>
        <MainDescription placeName={data.placeName} artists={data.targetArtists} eventType={data.eventType} />
        <div className="flex flex-col gap-8 pt-16 text-14 font-500">
          <SubDescription>
            <CalendarIcon {...IconStyleProps} />
            {formattedDate}
          </SubDescription>
          <SubDescription>
            <MapIcon {...IconStyleProps} />
            {`${data.address} ${data.addressDetail}`}
          </SubDescription>
          <SubDescription>
            <GiftIcon {...IconStyleProps} />
            {data.eventTags.map((tag) => (
              <Chip key={tag.tagId} kind="goods" label={tag.tagName} />
            ))}
          </SubDescription>
          <SubDescription isVisible={Boolean(data?.eventUrl)}>
            <LinkIcon {...IconStyleProps} />
            <Link href={data?.eventUrl ?? ""} target="_blank" rel="noreferrer noopener" className="text-blue">
              {data?.eventUrl}
            </Link>
          </SubDescription>
          <SubDescription isVisible={Boolean(data?.organizerSns)}>
            <UserIcon width={20} height={20} viewBox="0 0 24 24" stroke="#A0A5B1" />
            <div className="flex items-center gap-4">
              {SnsIcon[data?.snsType ?? "기타"]}
              <span>{`@${data?.organizerSns}`}</span>
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
    return artists.map((artist) => `${artist.artistName}${artist.groupName && ` (${artist.groupName})`}`).join(", ");
  };
  const formattedArtist = formatArtist(artists);

  return (
    <div className="flex flex-col gap-8 border-b border-gray-100 pb-16">
      <h1 className="h-24 text-20 font-600">{placeName}</h1>
      <div className="flex items-center gap-8">
        <span className="text-16 font-600">{formattedArtist}</span>
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
  return <>{isVisible && <div className="flex h-20 items-center gap-12">{children}</div>}</>;
};
