import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Api } from "@/api/api";
import { Res_Get_Type } from "@/types/getResType";

export const useFetchArtistOfMonth = (instance: Api, month: string) => {
  const { data, isSuccess, isLoading, refetch } = useQuery<Res_Get_Type["artistMonth"]>({
    queryKey: ["artistMonth", month],
    queryFn: async () => {
      return instance.get("/artist/group/month", { month: month });
    },
  });

  useEffect(() => {
    refetch();
  }, [month]);

  return { data, isSuccess, isLoading };
};

export default useFetchArtistOfMonth;
