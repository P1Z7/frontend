import { useQuery } from "@tanstack/react-query";
import { Api } from "@/api/api";
import { TAG } from "@/constants/post";
import { GiftType } from "../_types";

export const findGroupName = (instance: Api, groupId: string): string => {
  const { data, isSuccess } = useQuery({
    queryKey: ["group", groupId],
    queryFn: async () => {
      return instance.get("/group", { groupId });
    },
    staleTime: 1000 * 60 * 4,
  });
  if (isSuccess) {
    return data.groupName;
  }
  return "";
};

export const findMemberName = (instance: Api, artistArr: string[]): string[] => {
  const query = artistArr.join(",");
  const { data, isSuccess } = useQuery({
    queryKey: ["group", query],
    queryFn: async () => {
      return instance.get("/artist", { artists: query });
    },
    staleTime: 1000 * 60 * 4,
  });
  if (isSuccess) {
    return data.map(({ artistName }: { artistName: string }) => artistName);
  }
  return [];
};

export const findTagName = (tagArr: string[]) => {
  const idxArr = tagArr.map((tagId) => Object.values(TAG).findIndex((num) => num === tagId));
  return idxArr.map((idx) => Object.keys(TAG)[idx]) as GiftType[];
};
