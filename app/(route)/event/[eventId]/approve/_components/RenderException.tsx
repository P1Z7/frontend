import { Api } from "@/api/api";
import { findGroupName, findMemberName, findTagName } from "@/utils/findName";
import { EditContentType, LabelType } from "@/types/index";
import { AddressEdit, ArtistEdit, DateEdit, ImageEdit, OrganizerEdit, TagEdit } from "./EditFormat";

interface Props {
  type: LabelType;
  editContent: EditContentType;
  instance: Api;
}

const RenderException = ({ type, editContent, instance }: Props) => {
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

export default RenderException;
