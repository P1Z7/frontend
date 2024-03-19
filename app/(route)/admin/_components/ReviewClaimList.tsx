import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { instance } from "@/api/api";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { getSession } from "@/store/session/cookies";
import { openToast } from "@/utils/toast";

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
    initialPageParam: 9999,
    getNextPageParam: (lastPage) => (lastPage.length < SIZE ? null : lastPage.at(-1)?.cursorId),
  });
  const containerRef = useInfiniteScroll({ handleScroll: fetchNextPage, deps: [data] });

  const session = getSession();
  const deleteReview = async (id: string) => {
    try {
      await instance.delete(`/reviews/${id}/users/${session?.user.userId}`);
      openToast.success("후기 삭제 완료!");
    } catch (error) {
      openToast.error("후기 삭제 실패!");
    }
  };

  return (
    <div className="flex h-full w-full flex-col overflow-y-scroll pr-4">
      {isSuccess &&
        (data.pages[0].length > 0 ? (
          claimList.map(({ id, claims }) => (
            <div key={claims.id} className="flex justify-between gap-4 border-b border-white-white px-4 py-12">
              <div className="flex flex-col gap-12">
                <div>
                  <p>후기 id: {id}</p>
                  <p>신고 개수: {claims.length}</p>
                </div>
                {claims.map(({ content, user }: { content: string; user: { id: string; nickName: string } }) => (
                  <div className="border border-white-white p-8">
                    <p>신고 내용: {content}</p>
                    <p>신고자: {user?.nickName}</p>
                  </div>
                ))}
              </div>
              <button onClick={() => deleteReview(id)} className="rounded-sm bg-red p-4">
                후기 삭제
              </button>
            </div>
          ))
        ) : (
          <p>신고 데이터가 없습니다.</p>
        ))}
      {isLoading && <p>로딩중...</p>}
      <div ref={containerRef} className="h-4" />
    </div>
  );
};

export default ReviewClaimList;
