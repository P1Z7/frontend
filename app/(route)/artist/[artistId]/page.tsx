"use client";

import { useParams } from "next/navigation";
import DottedLayout from "@/components/layout/DottedLayout";
import { instance } from "@/api/api";
import { getArtist, getGroup } from "@/utils/getArtist";

const ArtistIdPage = () => {
  const { artistId } = useParams() as { artistId: string }; // artists -> 멤버, 솔로 // groupId -> 그룹명

  const group = getGroup(instance, artistId);
  const artist = getArtist(instance, artistId);

  const name = group.groupName || artist.artistName;
  const image = group.groupImage || artist.artistImage;

  return (
    <DottedLayout size="wide">
      <div>
        {/* 카드 영역 */}
        <div>{name}</div>
        <img src={image} />
        {/* 지도 영역 */}
        <div></div>
      </div>
    </DottedLayout>
  );
};

export default ArtistIdPage;
