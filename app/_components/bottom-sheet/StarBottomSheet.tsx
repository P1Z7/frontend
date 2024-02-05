import { PostType } from "@/(route)/post/page";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Api } from "@/api/api";
import { BottomSheetBaseType } from "@/types/index";
import ArtistCard from "../ArtistCard";
import SearchInput from "../input/SearchInput";
import BottomSheet from "./BottomSheetMaterial";

const StarBottomSheet = ({ closeBottomSheet, refs }: BottomSheetBaseType) => {
  const [groupId, setgroupId] = useState(""); //선택한 그룹 아이디
  const [keyword, setKeyword] = useState("");
  const { setValue, getValues } = useFormContext<PostType>();
  const instance = new Api("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IiIsImlhdCI6MTcwNjg3Njc0NX0.J9ihWIZCBxmJGFDsT1O_Gs8XsHgdn6cczO3zGy_d2Yc");
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
  const {
    data: memberData,
    isSuccess: isMemberSuccess,
    isLoading: isMemberLoading,
    refetch: refetchMember,
  } = useQuery({
    queryKey: ["member", groupId],
    queryFn: async () => {
      return instance.get(`/artist/${groupId}`);
    },
    enabled: !!groupId,
  });

  const handleFirstDepthClick = (type: string, id: string, name: string) => {
    if (type === "solo") {
      setValue("groupName", name);
      setValue("artists", [id]);
      return;
    }
    setgroupId(id);
  };

  const handleMemberClick = (id: string) => {};

  useEffect(() => {
    refetchGroup();
  }, [keyword]);

  // useEffect(() => {
  //   refetchMember();
  // }, [groupId]);

  // console.log(groupData);

  return (
    <BottomSheet.Frame closeBottomSheet={closeBottomSheet} ref={refs.sheet}>
      <BottomSheet.Title>아티스트 선택</BottomSheet.Title>
      <div className="flex flex-col gap-20 px-24 pt-16 text-16" onClick={(event) => event.stopPropagation()} ref={refs.content}>
        {groupId ? (
          <>
            {/* {isMemberLoading && <div>멤버 로딩중</div>}
            {isMemberSuccess &&
              memberData.map(({ artist_image, artist_name, artist_id }: any) => (
                <ArtistCard profileImage={artist_image} ={artist_name} size={72} handleClick={() => handleMemberClick(artist_id)} />
              ))} */}
          </>
        ) : (
          <>
            <SearchInput setKeyword={setKeyword} />
            <div className="scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-gray-100 grid h-[34rem] grid-cols-3 justify-items-center overflow-y-scroll">
              {isLoading && <div>데이터 로딩중 ~~</div>}
              {isSuccess &&
                groupData.groupAndSoloList.map(({ id, image, name, type }: any) => (
                  <ArtistCard key={id} profileImage={image} isChecked={getValues("groupName") === name} onClick={() => handleFirstDepthClick(type, id, name)}>
                    {name}
                  </ArtistCard>
                ))}
            </div>
          </>
        )}
      </div>
      <BottomSheet.Button onClick={closeBottomSheet} />
    </BottomSheet.Frame>
  );
};

export default StarBottomSheet;
