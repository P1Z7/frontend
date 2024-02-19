import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { instance } from "@/api/api";
import { useSession } from "@/store/session/cookies";
import { Res_Get_Type } from "@/types/getResType";

const DEFAULT_USER_ID = "default";
const QUERY_KEY = "like";

interface Props {
  eventId: string;
  initialLikeCount: number;
}

const useLikeEvent = ({ eventId, initialLikeCount }: Props) => {
  const session = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();

  const userId = session?.user.userId ?? DEFAULT_USER_ID;

  const { data: likeData } = useQuery<Res_Get_Type["eventLike"]>({
    queryKey: [QUERY_KEY, eventId, userId],
    queryFn: () => instance.get("/event/like", { eventId, userId }),
  });

  const likeMutation = useMutation({
    mutationFn: () => instance.post("/event/like", { eventId, userId }),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY, eventId, userId],
      });

      const prevStatus = queryClient.getQueryData([QUERY_KEY, eventId, userId]);

      queryClient.setQueryData([QUERY_KEY, eventId, userId], (prev: Res_Get_Type["eventLike"]) => ({
        status: !prev.status,
        likeCount: prev.status ? prev.likeCount - 1 : prev.likeCount + 1,
      }));

      return prevStatus;
    },
    onError: (error, _, context) => {
      queryClient.setQueryData([QUERY_KEY, eventId, userId], context);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, eventId, userId],
      });
    },
  });

  const handleLikeEvent = () => {
    if (!session) {
      router.push("/signin");
    }
    likeMutation.mutate();
  };

  const liked = likeData?.status ?? false;
  const likeCount = likeData?.likeCount ?? initialLikeCount;

  return { liked, likeCount, handleLikeEvent };
};

export default useLikeEvent;
