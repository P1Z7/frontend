import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Api } from "@/api/api";

export const useFetchMember = (instance: Api, getValues: (name: string) => string, isFirst: boolean) => {
  const [groupId, setGroupId] = useState(getValues("groupId"));
  const {
    data,
    isSuccess,
    isLoading,
    refetch: refetchMember,
  } = useQuery({
    queryKey: ["member", groupId],
    queryFn: async () => {
      return instance.get(`/artist/${groupId}`);
    },
    enabled: !!groupId,
  });

  useEffect(() => {
    if (getValues("groupId")) {
      refetchMember();
    }
  }, [groupId]);

  useEffect(() => {
    if (isFirst) setGroupId("");
    else setGroupId(getValues("groupId"));
  }, []);

  return { groupId, setGroupId, data, isLoading, isSuccess };
};
