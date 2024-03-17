import { useQuery } from "@tanstack/react-query";
import { Api } from "@/api/api";

export const getGroup = (instance: Api, groupId: string) => {
  const { data, isSuccess } = useQuery({
    queryKey: ["group", groupId],
    queryFn: async () => {
      return instance.get("/group", { groupId });
    },
    staleTime: 1000 * 60 * 4,
  });
  if (isSuccess) {
    return data;
  }
  return {};
};

export const getArtist = (instance: Api, artists: string) => {
  const { data, isSuccess } = useQuery({
    queryKey: ["artistName", artists],
    queryFn: async () => {
      return instance.get("/artist", { artists });
    },
    staleTime: 1000 * 60 * 4,
  });
  if (isSuccess) {
    return data[0] || {};
  }
  return {};
};
