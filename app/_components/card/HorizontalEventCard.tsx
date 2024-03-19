import Image from "next/image";
import Link from "next/link";
import { SyntheticEvent, useState } from "react";
import HeartButton from "@/components/button/HeartButton";
import Chip from "@/components/chip/Chip";
import useBottomSheet from "@/hooks/useBottomSheet";
import useLikeEvent from "@/hooks/useLikeEvent";
import { formatAddress, formatDate } from "@/utils/formatString";
import { EventCardType } from "@/types/index";
import { TAG_ORDER } from "@/constants/post";
import KebabIcon from "@/public/icon/kebab.svg";
import NoImage from "@/public/image/no-profile.png";
import ControlMyDataBottomSheet from "../bottom-sheet/ControlMyDataBottomSheet";
import KebabContents from "./KebabContents";

interface Props {
  data: EventCardType;
  onHeartClick?: () => void; //기본 동작 말고 다른 기능이 필요한 경우
  isGrow?: boolean;
  isMypage?: boolean;
  setDep?: (dep: string) => void;
}

const HorizontalEventCard = ({ data, onHeartClick, isGrow = false, isMypage = false, setDep }: Props) => {
  const formattedDate = formatDate(data.startDate, data.endDate);
  const formattedAddress = formatAddress(data.address);
  const formattedTagsMobile = data.eventTags.sort((a, b) => TAG_ORDER[a.tagName] - TAG_ORDER[b.tagName]).slice(0, 5);
  const extraTagNumberMobile = data.eventTags.length - 5 > 0 ? data.eventTags.length - 5 : 0;
  const formattedTagsPc = data.eventTags.sort((a, b) => TAG_ORDER[a.tagName] - TAG_ORDER[b.tagName]).slice(0, 8);
  const extraTagNumberPc = data.eventTags.length - 8 > 0 ? data.eventTags.length - 8 : 0;

  const { liked, likeCount, handleLikeEvent } = useLikeEvent({ eventId: data.id, initialLike: data.isLike, initialLikeCount: data.likeCount });

  const handleClick = async () => {
    if (onHeartClick) {
      onHeartClick();
      return;
    }

    handleLikeEvent();
  };

  const { bottomSheet, openBottomSheet, closeBottomSheet, refs } = useBottomSheet();
  const [openKebab, setOpenKebab] = useState(false);

  return (
    <Link
      href={`/event/${data.id}`}
      className={`relative flex w-full ${isGrow ? "" : "pc:max-w-[50.8rem]"} items-center gap-12 border-b border-gray-50 bg-white-black py-12 pc:gap-20 pc:py-20`}
    >
      <div
        className="flex-center absolute right-0 top-[1.3rem] z-heart flex-col text-12 font-500 text-gray-500 pc:top-[2.75rem]"
        onClick={(e: SyntheticEvent) => e.preventDefault()}
      >
        {!isMypage ? (
          <>
            <HeartButton isSmall isSelected={liked} isLined onClick={handleClick} />
            <div className="relative bottom-4">{likeCount}</div>
          </>
        ) : (
          <div className="relative">
            <KebabIcon className="rotate-90 transform tablet:hidden" fill="#7E8695" onClick={() => openBottomSheet("myPost")} />
            <KebabIcon className="hidden rotate-90 transform tablet:block" fill="#7E8695" onClick={() => setOpenKebab(!openKebab)} />
            {openKebab && <KebabContents id={data.id} setDep={setDep} />}
          </div>
        )}
      </div>
      <div className="relative h-112 w-84 shrink-0 overflow-hidden pc:h-152 pc:w-116">
        <Image
          src={data.eventImages?.[0]?.imageUrl ?? NoImage}
          className="rounded-[0.4rem] object-cover transition-all hover:scale-110"
          fill
          alt="행사 포스터"
          sizes="116px"
          priority
        />
      </div>
      <div className="relative flex w-full min-w-160 flex-col justify-center gap-4 pc:gap-28">
        <div className="flex flex-col gap-4">
          <h3 className="w-full truncate pr-[3rem] text-16 font-600 pc:text-20">{data.placeName}</h3>
          <div className="flex w-full items-center gap-8 pr-32 pc:gap-12">
            <span className="truncate text-16 font-600">{data.targetArtists?.map((artist) => artist.artistName).join(", ")}</span>
            <Chip kind="event" label={data.eventType} />
          </div>
        </div>
        <div className="flex flex-col gap-4 pc:gap-8">
          <p className="text-12 font-600 text-gray-400 pc:text-16 pc:font-500">
            <span className="mr-8 border-r border-gray-400 pr-8">{formattedDate}</span>
            <span>{formattedAddress}</span>
          </p>
          <ul className="flex flex-wrap items-center gap-4 pc:hidden">
            {formattedTagsMobile.map((tag) => (
              <Chip key={tag.tagId} kind="goods" label={tag.tagName} />
            ))}
            {!!extraTagNumberMobile && <span className="text-center text-12 font-600 text-gray-700">{`외 ${extraTagNumberMobile}개`}</span>}
          </ul>
          <ul className="hidden flex-wrap items-center gap-4 pc:flex">
            {formattedTagsPc.map((tag) => (
              <Chip key={tag.tagId} kind="goods" label={tag.tagName} />
            ))}
            {!!extraTagNumberPc && <span className="text-center text-12 font-600 text-gray-700">{`외 ${extraTagNumberPc}개`}</span>}
          </ul>
        </div>
      </div>
      {bottomSheet === "myPost" && <ControlMyDataBottomSheet closeBottomSheet={closeBottomSheet} refs={refs} eventId={data.id} setDep={setDep} type="event" />}
    </Link>
  );
};

export default HorizontalEventCard;
