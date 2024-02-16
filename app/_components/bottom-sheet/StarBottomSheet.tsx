import { PostType } from "@/(route)/post/page";
import { instance } from "app/_api/api";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useFetchGroupSolo } from "@/hooks/useFetchGroupSolo";
import { useFetchMember } from "@/hooks/useFetchMember";
import { BottomSheetBaseType } from "@/types/index";
import BackIcon from "@/public/icon/arrow-left_lg.svg";
import ArtistCard from "../ArtistCard";
import SearchInput from "../input/SearchInput";
import BottomSheet from "./BottomSheetMaterial";

interface Props extends BottomSheetBaseType {
  isFirst?: boolean;
}

const StarBottomSheet = ({ closeBottomSheet, refs, isFirst = false }: Props) => {
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
    <BottomSheet.Frame closeBottomSheet={closeBottomSheet} ref={refs.sheet}>
      <BottomSheet.Title>아티스트 선택</BottomSheet.Title>
      <div className="flex flex-col gap-24 px-24 pt-16 text-16" ref={refs.content}>
        {groupId ? (
          <div className="flex flex-col gap-12">
            <GroupTitle setGroupId={setGroupId} />
            {isMemberLoading && <div>멤버 로딩중</div>}
            {isMemberSuccess &&
              (memberData.length === 0 ? (
                <div>데이터가 없어요ㅠㅠ</div>
              ) : (
                <div className="h-[34rem] overflow-y-scroll">
                  <div className="flex flex-wrap justify-center gap-16">
                    {memberData.map(({ id, artistName, artistImage }: any) => (
                      <ArtistCard key={id} profileImage={artistImage} isChecked={getValues("artists").includes(id)} onClick={() => handleMemberClick(id, artistName)}>
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
            {isLoading && <div>로딩중</div>}
            {isSuccess && (
              <div ref={containerRef} className="flex h-[34rem] overflow-y-scroll">
                <div className="flex flex-wrap justify-center gap-x-16 gap-y-20 px-8">
                  {groupList.map(({ id, image, name, type }: any) => (
                    <ArtistCard
                      key={id}
                      profileImage={image}
                      isChecked={getValues("groupId") === id || getValues("artists").includes(id)}
                      onClick={() => handleFirstDepthClick(type, id, name)}
                    >
                      {name}
                    </ArtistCard>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <BottomSheet.Button onClick={closeBottomSheet} />
    </BottomSheet.Frame>
  );
};

export default StarBottomSheet;

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
