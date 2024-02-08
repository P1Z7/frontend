"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Chip from "@/components/chip/Chip";
import { GiftType, LabelType } from "@/types/index";
import LinkIcon from "@/public/icon/arrow-right_lg.svg";

interface Props<T> {
  id: number | string; //아마도 실제 db에선 string형식일듯
  type: T;
  editContent: ContentType<T>;
  count: {
    approve: number;
    decline: number;
  };
}

const EditCard = <T extends LabelType>({ id, type, editContent, count }: Props<T>) => {
  const curPath = usePathname();

  return (
    <div className="relative flex w-full flex-col gap-4 border-b border-gray-100 py-12 pr-24 text-14 font-500">
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
      {typeof editContent === "string" && <div className="truncate text-16 text-gray-900">{editContent}</div>}
      <div className="flex gap-12">
        <div className="text-blue">승인: {count.approve}</div>
        <div className="text-red">거절: {count.decline}</div>
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

type ContentType<T> = T extends "특전" ? GiftType[] : T extends "이미지" ? string[] : string;
