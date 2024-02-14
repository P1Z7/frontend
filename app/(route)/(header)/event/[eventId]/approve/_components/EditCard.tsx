"use client";

import { useQuery } from "@tanstack/react-query";
import { formatDate } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Chip from "@/components/chip/Chip";
import { Api } from "@/api/api";
import { GiftType, LabelType, approveArtistType } from "@/types/index";
import { TAG } from "@/constants/post";
import { SnsIcon } from "@/constants/snsIcon";
import LinkIcon from "@/public/icon/arrow-right_lg.svg";
import ReactionIcon from "./ReactionIcon";

const exceptionList = ["아티스트", "주소", "기간", "특전", "이미지", "주최자"];

interface Props<T> {
  id: number | string; //아마도 실제 db에선 string형식일듯
  type: T;
  editContent: ContentType<T>;
  count: {
    approve: number;
    decline: number;
  };
  createdAt: string;
  category: string;
}

const EditCard = <T extends LabelType>({ id, type, editContent, count, createdAt, category }: Props<T>) => {
  const curPath = usePathname();
  const instance = new Api(process.env.NEXT_PUBLIC_ACCESS_TOKEN);

  console.log(editContent);

  const findGroupName = (groupId: string): string => {
    const { data, isSuccess } = useQuery({
      queryKey: ["group", groupId],
      queryFn: async () => {
        return instance.get("/group", { groupId });
      },
    });
    if (isSuccess) {
      return data.groupName;
    }
    return "";
  };

  const findMemberName = (artistArr: string[]): string[] => {
    const query = artistArr.join(",");
    const { data, isSuccess } = useQuery({
      queryKey: ["group", query],
      queryFn: async () => {
        return instance.get("/artist", { artists: query });
      },
    });
    if (isSuccess) {
      return data.map(({ artistName }: { artistName: string }) => artistName);
    }
    return [];
  };

  const findTagName = (tagArr: string[]) => {
    const idxArr = tagArr.map((tagId) => Object.values(TAG).findIndex((num) => num === tagId));
    return idxArr.map((idx) => Object.keys(TAG)[idx]) as GiftType[];
  };

  return (
    <div className="relative flex w-full flex-col gap-8 border-b border-gray-100 py-16 pr-24 text-14 font-500">
      <div className="text-gray-500">{type}</div>
      {type === "특전" && (
        <div className="flex flex-wrap gap-4">
          {findTagName(editContent.tags).map((gift: GiftType) => (
            <Chip key={gift} kind="goods" label={gift} />
          ))}
        </div>
      )}
      {/* {type === "이미지" && (
        <div className="flex gap-8 overflow-x-scroll scrollbar-hide">
          {(editContent as string[]).map((url: string) => (
            <div key={url} className="relative h-120 w-120 flex-shrink-0">
              <Image alt="수정된 행사 이미지" src={url} fill sizes="12rem, 12rem" className="object-cover" />
            </div>
          ))}
        </div>
      )} */}
      {type === "아티스트" && (
        <div className="truncate text-16 text-gray-900">
          {findMemberName(editContent.artists).join(", ")}
          <span>{`(${findGroupName(editContent.groupId)})`}</span>
        </div>
      )}
      {type === "주최자" && (
        <div className="flex items-center gap-4 text-16 text-gray-900">
          {SnsIcon[editContent.snsType]}
          <p className="truncate">{editContent.organizerSns}</p>
        </div>
      )}
      {type === "주소" && (
        <div className="text-16 text-gray-900">
          <p className="truncate">{editContent.address}</p>
          <p className="truncate">{editContent.addressDetail}</p>
        </div>
      )}
      {type === "기간" && (
        <div className="flex gap-4 text-16 text-gray-900">
          <p>{editContent.startDate}</p>
          <p>~</p>
          <p>{editContent.endDate}</p>
        </div>
      )}
      {!exceptionList.includes(type) && <div className="truncate text-16 text-gray-900">{editContent[category]}</div>}
      <div className="flex items-center gap-12 text-12 text-gray-400">
        <div className="flex gap-4">
          승인
          <ReactionIcon count={count.approve} type="approve" />
        </div>
        <div className="flex gap-4">
          거절
          <ReactionIcon count={count.decline} type="reject" />
        </div>
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

type ContentType<T> = T extends "특전" ? GiftType[] : T extends "이미지" ? string[] : T extends "아티스트" ? approveArtistType : string;
