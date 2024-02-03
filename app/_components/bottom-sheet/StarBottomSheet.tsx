import { PostType } from "@/(route)/(header)/post/page";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Api } from "@/api/api";
import { Req_Post_Type } from "@/types/reqType";
import SearchInput from "../input/SearchInput";
import BottomSheet from "./BottomSheetMaterial";

interface Props {
  closeBottomSheet: () => void;
}
const StarBottomSheet = ({ closeBottomSheet }: Props) => {
  const [groupId, setgroupId] = useState(""); //선택한 그룹 아이디
  const [keyword, setKeyword] = useState("");
  const { setValue } = useFormContext<PostType>();
  const instance = new Api("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IiIsImlhdCI6MTcwNjg3Njc0NX0.J9ihWIZCBxmJGFDsT1O_Gs8XsHgdn6cczO3zGy_d2Yc");
  const {
    data: groupData,
    isSuccess,
    isLoading,
    refetch: refetchGroup,
  } = useQuery({
    queryKey: ["group"],
    queryFn: async () => {
      return instance.get("/group/solo", { size: 12, page: 1 });
      // return instance.post<Req_Post_Type["signup"]>("/users", {
      //   userName: "",
      //   signupMethod: "opener",
      //   email: "post@test.com",
      //   password: "asdf1234",
      //   myArtists: [],
      //   passwordCheck: "asdf1234",
      //   nickName: "post테스트",
      // });
    },
  });
  // const {
  //   data: memberData,
  //   isSuccess: isMemberSuccess,
  //   isLoading: isMemberLoading,
  //   refetch: refetchMember,
  // } = useQuery({
  //   queryKey: ["member", groupId],
  //   queryFn: async () => {
  //     return api("GET", `/artist/${groupId}`);
  //   },
  //   enabled: !!groupId,
  // });

  const handleGroupClick = (id: string) => {
    if (!id) {
      //솔로인 경우, 그냥 솔로 선택 후 바텀시트 close
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

  console.log(groupData);

  return (
    <BottomSheet.Frame closeBottomSheet={closeBottomSheet}>
      <div className="flex flex-col gap-20 p-20 text-16" onClick={(event) => event.stopPropagation()}>
        {/* {groupId ? (
          <>
            {isMemberLoading && <div>멤버 로딩중</div>}
            {isMemberSuccess &&
              memberData.map(({ artist_image, artist_name, artist_id }: any) => (
                <ArtistProfile src={artist_image} artistName={artist_name} size={72} handleClick={() => handleMemberClick(artist_id)} />
              ))}
          </>
        ) : (
          <>
            <SearchInput setKeyword={setKeyword} />
            <div className="grid h-[360px] grid-cols-3 overflow-y-scroll">
              {isLoading && <div>데이터 로딩중 ~~</div>}
              {isSuccess &&
                groupData.groupList.map(({ group_image, group_name, group_id }: any) => (
                  <ArtistProfile src={group_image} artistName={group_name} size={72} handleClick={() => handleGroupClick(group_id)} />
                ))}
            </div>
          </>
        )} */}

        <button className="flex h-48 items-center justify-center rounded-sm border-2 p-16">선택완료</button>
      </div>
    </BottomSheet.Frame>
  );
};

export default StarBottomSheet;
