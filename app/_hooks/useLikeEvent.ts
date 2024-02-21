import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { instance } from "@/api/api";
import { getSession } from "@/store/session/cookies";
import { Res_Get_Type } from "@/types/getResType";

const QUERY_KEY = "like";

interface Props {
  eventId: string;
  initialLike: boolean;
  initialLikeCount: number;
}

const useLikeEvent = ({ eventId, initialLike, initialLikeCount }: Props) => {
  const session = getSession();
  const queryClient = useQueryClient();
  const router = useRouter();

  const userId = session?.user.userId ?? "";

  const { data: likeData, refetch } = useQuery<Res_Get_Type["eventLike"]>({
    queryKey: [QUERY_KEY, eventId, userId],
    queryFn: () => instance.get("/event/like", { eventId, userId }),
    enabled: false,
  });

  const likeMutation = useMutation({
    mutationFn: () => instance.post("/event/like", { eventId, userId }),
    onMutate: async () => {
      const prevStatus = queryClient.getQueryData([QUERY_KEY, eventId, userId]);

      if (prevStatus) {
        await queryClient.cancelQueries({
          queryKey: [QUERY_KEY, eventId, userId],
        });

        queryClient.setQueryData([QUERY_KEY, eventId, userId], (prev: Res_Get_Type["eventLike"]) => ({
          status: !prev.status,
          likeCount: prev.status ? prev.likeCount - 1 : prev.likeCount + 1,
        }));

        return prevStatus;
      }

      return { status: initialLike, likeCount: initialLikeCount };
    },
    onError: (error, _, context) => {
      queryClient.setQueryData([QUERY_KEY, eventId, userId], context);
    },
    onSettled: () => {
      refetch();
    },
  });

  const handleLikeEvent = () => {
    if (!session) {
      router.push("/signin");
      return;
    }
    likeMutation.mutate();
  };

  const liked = likeData?.status ?? initialLike;
  const likeCount = likeData?.likeCount ?? initialLikeCount;

  return { liked, likeCount, handleLikeEvent };
};

export default useLikeEvent;
