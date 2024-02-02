import Image from "next/image";
import Link from "next/link";
import Chip from "@/components/chip/Chip";
import { EventCardType } from "@/types/index";
import CalendarIcon from "@/public/icon/calendar.svg";
import GiftIcon from "@/public/icon/gift.svg";
import HeartIcon from "@/public/icon/heart.svg";
import LinkIcon from "@/public/icon/link.svg";
import MapIcon from "@/public/icon/map.svg";
import UserIcon from "@/public/icon/user.svg";

interface Props {
  data: EventCardType;
}

const Banner = ({ data }: Props) => {
  return (
    <section className="w-full">
      <div className="relative h-[48rem] w-full">
        <Image src={data.eventImage} alt={"행사 포스터 썸네일"} priority fill className="object-cover" />
      </div>
      <div className="relative bottom-24 rounded-t-lg bg-white-black p-24 pb-0">
        <button className="absolute right-20 top-24 text-center text-12 font-600">
          <HeartIcon stroke="#1C1E22" />
          {100}
        </button>
        <MainDescription />
        <div className="flex flex-col gap-8 pt-16 text-14 font-500">
          <div className="flex h-20 items-center gap-12">
            <CalendarIcon width={20} height={20} viewBox="0 0 24 24" stroke="#A0A5B1" />
            {"24.01.19 ~ 24.01.20"}
          </div>
          <div className="flex h-20 items-center gap-12">
            <MapIcon width={20} height={20} viewBox="0 0 24 24" stroke="#A0A5B1" />
            {"24.01.19 ~ 24.01.20"}
          </div>
          <div className="flex h-20 items-center gap-12">
            <GiftIcon width={20} height={20} viewBox="0 0 24 24" stroke="#A0A5B1" />
            {data.gifts?.map((gift) => <Chip kind="goods" label={gift} />)}
          </div>
          {data.link}
          <div className="flex h-20 items-center gap-12">
            <LinkIcon width={20} height={20} viewBox="0 0 24 24" stroke="#A0A5B1" />
            <Link href={data.link} />
          </div>
          <div className="flex h-20 items-center gap-12">
            <UserIcon width={20} height={20} viewBox="0 0 24 24" stroke="#A0A5B1" />
            {"24.01.19 ~ 24.01.20"}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;

const MainDescription = () => {
  return (
    <div className="flex flex-col gap-8 border-b border-gray-100 pb-16">
      <h1 className="h-24 text-20 font-600">파이키</h1>
      <div className="flex gap-8">
        <span className="text-16 font-600">민지 (NewJeans)</span>
        <Chip kind="event" label="팝업스토어" />
      </div>
    </div>
  );
};
