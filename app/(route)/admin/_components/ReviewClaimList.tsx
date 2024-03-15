import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { instance } from "@/api/api";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { getSession } from "@/store/session/cookies";

const mockup = [
  {
    cursorId: 0,
    id: "9b8b2f7d-d3b5-44f0-948b-c512139a29c2",
    claims: {
      id: "1",
      description: "내용이 너무 부실해요",
      user: {
        id: "string",
        nickName: "string",
      },
    },
  },
  {
    cursorId: 1,
    id: "9b8b2f7d-d3b5-44f0-948b-c512139a29c2",
    claims: {
      id: "2",
      description: "맘에 안들어요",
      user: {
        id: "string",
        nickName: "string",
      },
    },
  },
  {
    cursorId: 2,
    id: "string",
    claims: {
      id: "3",
      description: "모르겠어요",
      user: {
        id: "string",
        nickName: "string",
      },
    },
  },
];

const SIZE = 12;

const ReviewClaimList = () => {
  const [claimList, setClaimList] = useState<any[]>([]);
  const { data, fetchNextPage, isSuccess, isLoading } = useInfiniteQuery({
    queryKey: ["admin_review_claim"],
    queryFn: async ({ pageParam }) => {
      const res = await instance.get("/reviews/claims/all", { size: SIZE, cursorId: pageParam });
      pageParam === 1 ? setClaimList(res) : setClaimList((prev) => [...prev, ...res]);
      return res;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.length < SIZE ? null : lastPage.at(-1)?.cursorId),
  });
  const containerRef = useInfiniteScroll({ handleScroll: fetchNextPage, deps: [data] });

  const session = getSession();
  const deleteReview = async (id: string) => {
    await instance.delete(`/reviews/${id}/users/${session?.user.userId}`);
  };
  return (
    <div className="flex w-full flex-col gap-12">
      {claimList.length > 0 ? (
        claimList.map((claim) => (
          <div key={claim.claims.id} className="flex justify-between">
            <div>
              <p>후기 id: {claim.id}</p>
              <p>신고 내용: {claim.claims.description}</p>
            </div>
            <button onClick={() => deleteReview(claim.id)} className="w-72 rounded-sm bg-red p-4">
              후기 삭제
            </button>
          </div>
        ))
      ) : (
        <p>신고 데이터가 없습니다.</p>
      )}
      <div ref={containerRef} className="h-4" />
    </div>
  );
};

export default ReviewClaimList;
