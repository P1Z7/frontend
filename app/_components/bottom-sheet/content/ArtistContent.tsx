import { PostType } from "@/(route)/post/page";
import LoadingDot from "@/(route)/signin/_components/LoadingDot";
import { instance } from "app/_api/api";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import ArtistCard from "@/components/ArtistCard";
import SearchInput from "@/components/input/SearchInput";
import { useFetchGroupSolo } from "@/hooks/useFetchGroupSolo";
import { useFetchMember } from "@/hooks/useFetchMember";
import { GroupAndSoloType, MemberDataType } from "@/types/index";
import BackIcon from "@/public/icon/arrow-left_lg.svg";

interface Props {
  isFirst: boolean;
  contentRef?: (node: HTMLElement | null) => void;
}

const ArtistContent = ({ isFirst, contentRef }: Props) => {
  const { setValue, getValues, watch } = useFormContext<PostType>();
  const { groupName, artistNames } = watch();
  const { setKeyword, groupList, containerRef, isSuccess, isLoading } = useFetchGroupSolo(instance);
  const { groupId, setGroupId, isLoading: isMemberLoading, isSuccess: isMemberSuccess, data: memberData } = useFetchMember(instance, getValues, isFirst);

  const handleFirstDepthClick = (type: string, id: string, name: string) => {
    if (getValues("groupId") !== id) {
      setValue("artistNames", []);
    }
    setValue("groupName", name);
    if (type === "solo") {
      setValue("groupId", "");
      setValue("artists", [id]);
      return;
    }
    setValue("groupId", id);
    setGroupId(id);
  };

  const handleMemberClick = (id: string, name: string) => {
    if (artistNames.includes(name)) {
      setValue(
        "artistNames",
        getValues("artistNames").filter((item) => item !== name),
      );
      setValue(
        "artists",
        getValues("artists").filter((item) => item !== id),
      );
      return;
    }
    setValue("artistNames", [...getValues("artistNames"), name]);
    setValue("artists", [...getValues("artists"), id]);
  };

  useEffect(() => {
    if (groupName === "") setValue("groupId", "");
    if (groupId && artistNames.length === 0) setValue("artists", []);
  }, [groupName, artistNames]);

  return (
    <div className="flex flex-col gap-24 px-24 pt-16 text-16 pc:p-0 pc:pt-48" ref={contentRef}>
      {groupId ? (
        <div className="flex flex-col gap-12">
          <GroupTitle setGroupId={setGroupId} />
          {isMemberLoading && (
            <div className="flex justify-center py-40">
              <LoadingDot />
            </div>
          )}
          {isMemberSuccess &&
            (memberData.length === 0 ? (
              <div>아직 데이터가 없어요💦</div>
            ) : (
              <div className="h-[34rem] overflow-y-scroll pc:h-[40rem]">
                <div className="flex flex-wrap justify-center gap-16 px-8 tablet:gap-x-32 pc:grid pc:grid-cols-5 pc:gap-x-20 pc:gap-y-24">
                  {memberData.map(({ id, artistName, artistImage }: MemberDataType) => (
                    <ArtistCard key={id} profileImage={artistImage} isPost isChecked={getValues("artists").includes(id)} onClick={() => handleMemberClick(id, artistName)}>
                      {artistName}
                    </ArtistCard>
                  ))}
                </div>
              </div>
            ))}
        </div>
      ) : (
        <>
          <SearchInput setKeyword={setKeyword} />
          {isLoading && (
            <div className="flex justify-center py-40">
              <LoadingDot />
            </div>
          )}
          {isSuccess &&
            (groupList.length === 0 ? (
              <div className="flex h-[34rem] w-full justify-center">검색 결과가 없어요💦</div>
            ) : (
              <div ref={containerRef} className="flex h-[34rem] overflow-y-scroll pc:h-[40rem]">
                <div className="flex flex-wrap justify-center gap-x-16 gap-y-20 px-8 tablet:gap-x-32 pc:grid pc:grid-cols-5 pc:gap-x-20 pc:gap-y-24">
                  {groupList.map(({ id, image, name, type }: GroupAndSoloType) => (
                    <ArtistCard
                      key={id}
                      profileImage={image}
                      isChecked={getValues("groupId") === id || getValues("artists").includes(id)}
                      onClick={() => handleFirstDepthClick(type, id, name)}
                      isPost
                    >
                      {name}
                    </ArtistCard>
                  ))}
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default ArtistContent;

interface GroupTitleProps {
  setGroupId: Dispatch<SetStateAction<string>>;
}

const GroupTitle = ({ setGroupId }: GroupTitleProps) => {
  const { getValues } = useFormContext<PostType>();
  return (
    <div className="flex gap-4">
      <button onClick={() => setGroupId("")}>
        <BackIcon />
      </button>
      <div className="text-16 font-600 text-gray-900">{getValues("groupName")}</div>
    </div>
  );
};
