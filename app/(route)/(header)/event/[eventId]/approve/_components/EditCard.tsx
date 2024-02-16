"use client";

import { formatDate } from "date-fns";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { instance } from "@/api/api";
import { CategoryType, EditContentType, LabelType, PostValueType } from "@/types/index";
import { exceptionList } from "@/constants/post";
import LinkIcon from "@/public/icon/arrow-right_lg.svg";
import ReactionIcon from "./ReactionIcon";
import RenderException from "./RenderException";

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

  return (
    <div className="relative flex w-full flex-col gap-8 border-b border-gray-100 py-16 pr-24 text-14 font-500">
      <div className="text-gray-500">{type}</div>
      {exceptionList.includes(type) ? (
        <RenderException editContent={editContent} instance={instance} type={type} />
      ) : (
        <div className="truncate text-16 text-gray-900">{editContent[category as PostValueType]}</div>
      )}
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
