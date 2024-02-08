"use client";

import { formatDate } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Chip from "@/components/chip/Chip";
import { targetArtistType } from "@/types/getType";
import { GiftType, LabelType } from "@/types/index";
import LinkIcon from "@/public/icon/arrow-right_lg.svg";
import ApproveIcon from "@/public/icon/check.svg";
import DeclineIcon from "@/public/icon/close.svg";

interface Props<T> {
  id: number | string; //아마도 실제 db에선 string형식일듯
  type: T;
  editContent: ContentType<T>;
  count: {
    approve: number;
    decline: number;
  };
  createdAt: string;
}

const EditCard = <T extends LabelType>({ id, type, editContent, count, createdAt }: Props<T>) => {
  const curPath = usePathname();

  return (
    <div className="relative flex w-full flex-col gap-4 border-b border-gray-100 py-16 pr-24 text-14 font-500">
      <div className="text-gray-500">{type}</div>
      {type === "특전" && (
        <div className="flex flex-wrap gap-4">
          {(editContent as GiftType[]).map((gift: GiftType) => (
            <Chip key={gift} kind="goods" label={gift} />
          ))}
        </div>
      )}
      {type === "이미지" && (
        <div className="flex gap-8 overflow-x-scroll scrollbar-hide">
          {(editContent as string[]).map((url: string) => (
            <div key={url} className="relative h-120 w-120 flex-shrink-0">
              <Image alt="수정된 행사 이미지" src={url} fill sizes="12rem, 12rem" className="object-cover" />
            </div>
          ))}
        </div>
      )}
      {type === "아티스트" && (
        <div className="text-16 text-gray-900">
          {(editContent as targetArtistType[]).map(({ artistName }) => artistName).join(", ")}
          <span>{`(${(editContent as targetArtistType[])[0]["groupName"]})`}</span>
        </div>
      )}
      {typeof editContent === "string" && <div className="truncate text-16 text-gray-900">{editContent}</div>}
      <div className="flex items-center gap-12 text-12 text-gray-400">
        <div>승인: {count.approve}</div>
        <div>거절: {count.decline}</div>
        <div className="text-gray-300">{formatDate(createdAt, "yyyy.MM.dd")}</div>
      </div>
      <button className="absolute right-0 top-0 flex h-full items-center">
        <Link href={`${curPath}/${id}`}>
          <LinkIcon />
        </Link>
      </button>
    </div>
  );
};

export default EditCard;

type ContentType<T> = T extends "특전" ? GiftType[] : T extends "이미지" ? string[] : T extends "아티스트" ? targetArtistType[] : string;
