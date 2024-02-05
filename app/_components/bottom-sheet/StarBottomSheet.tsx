import { PostType } from "@/(route)/post/page";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Api } from "@/api/api";
import { useFetchMember } from "@/hooks/useFetchMember";
import { useSearch } from "@/hooks/useSearch";
import { BottomSheetBaseType } from "@/types/index";
import BackIcon from "@/public/icon/arrow-left_lg.svg";
import ArtistCard from "../ArtistCard";
import ArtistList from "../ArtistList";
import SearchInput from "../input/SearchInput";
import BottomSheet from "./BottomSheetMaterial";

interface Props extends BottomSheetBaseType {
  isFirst?: boolean;
}

const StarBottomSheet = ({ closeBottomSheet, refs, isFirst = false }: Props) => {
  const { setValue, getValues, watch } = useFormContext<PostType>();
  const { groupName, artistNames } = watch();
  const instance = new Api("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE3MDcxMjgwNDF9.AR8YcpB9rBxRpk8DcWM-JvSbU9oPkLjPRXL7g5GwG8w");
  const {
    data: groupData,
    isSuccess,
    isLoading,
    refetch: refetchGroup,
  } = useQuery({
    queryKey: ["group"],
    queryFn: async () => {
      return instance.get("/group/solo", { size: 12, page: 1, keyword: keyword });
    },
  });
  const { keyword, setKeyword } = useSearch(refetchGroup);
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
      <div className="flex flex-col gap-24 px-24 pt-16 text-16">
        {groupId ? (
          <div className="flex flex-col gap-12">
            <GroupTitle setGroupId={setGroupId} />
            {isMemberLoading && <div>멤버 로딩중</div>}
            {isMemberSuccess &&
              (memberData.length === 0 ? (
                <div>데이터가 없어요ㅠㅠ</div>
              ) : (
                <ArtistList
                  render={() => (
                    <>
                      {memberData.map(({ id, artistName, artistImage }: any) => (
                        <ArtistCard key={id} profileImage={artistImage} isChecked={getValues("artists").includes(id)} onClick={() => handleMemberClick(id, artistName)}>
                          {artistName}
                        </ArtistCard>
                      ))}
                    </>
                  )}
                />
              ))}
          </div>
        ) : (
          <>
            <SearchInput setKeyword={setKeyword} />
            {isLoading && <div>데이터 로딩중 ~~</div>}
            {isSuccess && (
              <ArtistList
                render={() => (
                  <>
                    {groupData.groupAndSoloList.map(({ id, image, name, type }: any) => (
                      <ArtistCard
                        key={id}
                        profileImage={image}
                        isChecked={getValues("groupId") === id || getValues("artists").includes(id)}
                        onClick={() => handleFirstDepthClick(type, id, name)}
                      >
                        {name}
                      </ArtistCard>
                    ))}
                  </>
                )}
              />
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
