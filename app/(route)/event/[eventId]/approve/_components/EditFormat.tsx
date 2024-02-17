import classNames from "classnames";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import Chip from "@/components/chip/Chip";
import ModalPortal from "@/components/modal/ModalPortal";
import { useModal } from "@/hooks/useModal";
import { GiftType } from "@/types/index";
import { EDIT_ERR_MSG } from "@/constants/errorMsg";
import { SnsIcon } from "@/constants/snsIcon";

interface ImageEditProps {
  imgList: string[];
}

export const ImageEdit = ({ imgList }: ImageEditProps) => {
  const { eventId, editId } = useParams();
  const curPath = usePathname();
  const isPreview = curPath === `/event/${eventId}/approve/${editId}`;
  const { modal, openModal, closeModal } = useModal();

  return (
    <div className="flex gap-8 overflow-x-scroll scrollbar-hide">
      {imgList.length > 0
        ? imgList.map((url: string) => (
            <div key={url} className={classNames("relative h-120 w-120 flex-shrink-0", { "cursor-pointer": isPreview })} onClick={() => (isPreview ? openModal(url) : null)}>
              <Image alt="수정된 행사 이미지" src={url} fill sizes="12rem, 12rem" className="object-cover" />
            </div>
          ))
        : EDIT_ERR_MSG["noInfo"]}
      {modal && (
        <ModalPortal>
          <div onClick={closeModal} className="fixed left-0 top-0 z-popup flex h-screen w-full items-center justify-center bg-gray-900 bg-opacity-70 px-20 py-32">
            <div className="relative z-popup h-full w-full">
              <Image alt="크게보기" src={modal} width={0} height={0} sizes="100vw, 100vh" className="h-full w-full object-contain" />
            </div>
          </div>
        </ModalPortal>
      )}
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
