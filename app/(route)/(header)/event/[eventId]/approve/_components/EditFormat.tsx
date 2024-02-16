import classNames from "classnames";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import Chip from "@/components/chip/Chip";
import { GiftType } from "@/types/index";
import { EDIT_ERR_MSG } from "@/constants/errorMsg";
import { SnsIcon } from "@/constants/snsIcon";

interface ImageEditProps {
  imgList: string[];
}

export const ImageEdit = ({ imgList }: ImageEditProps) => {
  const router = useRouter();
  const { eventId, editId } = useParams();
  const curPath = usePathname();
  const isPreview = curPath === `/event/${eventId}/approve/${editId}`;

  return (
    <div className="flex gap-8 overflow-x-scroll scrollbar-hide">
      {imgList.length > 0
        ? imgList.map((url: string) => (
            <div key={url} className={classNames("relative h-120 w-120 flex-shrink-0", { "cursor-pointer": isPreview })} onClick={() => (isPreview ? router.push(url) : null)}>
              <Image alt="수정된 행사 이미지" src={url} fill sizes="12rem, 12rem" className="object-cover" />
            </div>
          ))
        : EDIT_ERR_MSG["noInfo"]}
    </div>
  );
};

interface ArtistEditProps {
  memberList: string[];
  groupName: string;
}

export const ArtistEdit = ({ memberList, groupName }: ArtistEditProps) => {
  return (
    <div className="truncate text-16 text-gray-900">
      {memberList.join(", ")}
      {groupName && <span>{`(${groupName})`}</span>}
    </div>
  );
};

interface OrganizerEditProps {
  snsType: "트위터" | "유튜브" | "인스타그램" | "기타";
  snsId: string;
}

export const OrganizerEdit = ({ snsType, snsId }: OrganizerEditProps) => {
  return (
    <div className="flex items-center gap-4 text-16 text-gray-900">
      {snsId ? (
        <>
          {SnsIcon[snsType]}
          <p className="truncate">{snsId}</p>
        </>
      ) : (
        EDIT_ERR_MSG["noInfo"]
      )}
    </div>
  );
};

interface TagEditProps {
  tagList: GiftType[];
}

export const TagEdit = ({ tagList }: TagEditProps) => {
  return (
    <div className="flex flex-wrap gap-4">{tagList.length === 0 ? EDIT_ERR_MSG["noInfo"] : tagList.map((gift: GiftType) => <Chip key={gift} kind="goods" label={gift} />)}</div>
  );
};

interface AddressEditProps {
  address: string;
  detail: string;
}

export const AddressEdit = ({ address, detail }: AddressEditProps) => {
  return (
    <div className="text-16 text-gray-900">
      <p className="truncate">{address}</p>
      <p className="truncate">{detail}</p>
    </div>
  );
};

interface DateEditProps {
  startDate: string;
  endDate: string;
}

export const DateEdit = ({ startDate, endDate }: DateEditProps) => {
  return (
    <div className="flex gap-4 text-16 text-gray-900">
      <p>{startDate}</p>
      <p>~</p>
      <p>{endDate}</p>
    </div>
  );
};
