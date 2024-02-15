"use client";

import { formatDate } from "date-fns";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Api } from "@/api/api";
import { findGroupName, findMemberName, findTagName } from "@/utils/findName";
import { CategoryType, EditContentType, LabelType, PostValueType } from "@/types/index";
import LinkIcon from "@/public/icon/arrow-right_lg.svg";
import { AddressEdit, ArtistEdit, DateEdit, ImageEdit, OrganizerEdit, TagEdit } from "./EditFormat";
import ReactionIcon from "./ReactionIcon";

const exceptionList: LabelType[] = ["아티스트", "주소", "기간", "특전", "이미지", "주최자"];

interface Props {
  id: string;
  type: LabelType;
  editContent: EditContentType;
  count: {
    approve: number;
    decline: number;
  };
  createdAt: string;
  category: CategoryType;
}

const EditCard = ({ id, type, editContent, count, createdAt, category }: Props) => {
  const curPath = usePathname();
  const instance = new Api(process.env.NEXT_PUBLIC_ACCESS_TOKEN);

  const renderException = () => {
    return (
      <>
        {type === "특전" && <TagEdit tagList={findTagName(editContent.tags || [])} />}
        {type === "이미지" && <ImageEdit imgList={editContent.eventImages || []} />}
        {type === "아티스트" && <ArtistEdit memberList={findMemberName(instance, editContent.artists || [])} groupName={findGroupName(instance, editContent.groupId || "")} />}
        {type === "주최자" && <OrganizerEdit snsType={editContent.snsType || "기타"} snsId={editContent.organizerSns || ""} />}
        {type === "주소" && <AddressEdit address={editContent.address || ""} detail={editContent.addressDetail || ""} />}
        {type === "기간" && <DateEdit startDate={editContent.startDate || ""} endDate={editContent.endDate || ""} />}
      </>
    );
  };

  return (
    <div className="relative flex w-full flex-col gap-8 border-b border-gray-100 py-16 pr-24 text-14 font-500">
      <div className="text-gray-500">{type}</div>
      {exceptionList.includes(type) ? renderException() : <div className="truncate text-16 text-gray-900">{editContent[category as PostValueType]}</div>}
      <div className="flex items-center gap-12 text-12 text-gray-400">
        <div className="flex gap-4">
          승인
          <ReactionIcon count={count.approve} type="approve" />
        </div>
        <div className="flex gap-4">
          거절
          <ReactionIcon count={count.decline} type="reject" />
        </div>
        <p className="text-gray-300">{formatDate(createdAt, "yyyy.MM.dd")}</p>
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
