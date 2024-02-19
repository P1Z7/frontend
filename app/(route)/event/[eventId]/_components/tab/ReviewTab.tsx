"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { instance } from "app/_api/api";
import DeferredSuspense from "@/components/skeleton/DeferredSuspense";
import ReviewSkeleton from "@/components/skeleton/ReviewSkeleton";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { getSession } from "@/store/session/cookies";
import { Res_Get_Type } from "@/types/getResType";
import BottomButton from "../BottomButton";
import EventReview from "../EventReview";

const SIZE = 10;
const INITIAL_CURSOR_ID = 100000;
const DEFAULT_USER_ID = "default";

interface Props {
  eventId: string;
}

const ReviewTab = ({ eventId }: Props) => {
  const session = getSession();
  const userId = session?.user.userId ?? DEFAULT_USER_ID;

  const getReviews = async ({ pageParam = 1 }) => {
    const data: Res_Get_Type["eventReviews"] = await instance.get(`/reviews/${eventId}`, { userId, size: SIZE, cursorId: pageParam == 1 ? INITIAL_CURSOR_ID : pageParam });
    return data;
  };

  const {
    data: reviews,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["eventReviews", eventId, userId],
    queryFn: getReviews,
    getNextPageParam: (lastPage) => (lastPage.length < SIZE ? null : lastPage.at(-1)?.cursorId),
  });

  const containerRef = useInfiniteScroll({
    handleScroll: fetchNextPage,
    deps: [reviews],
  });

  const isEmpty = reviews?.pages[0].length === 0;

  return (
    <div className="w-full bg-white-black pt-16 pc:px-40 pc:py-32">
      <div className="min-h-300 w-full text-center">
        {isEmpty ? (
          <span className="text-14 font-500 text-gray-500">등록된 후기가 없습니다.</span>
        ) : (
          reviews?.pages.map((page) => page.map((review) => <EventReview key={review.id} data={review} />))
        )}
      </div>
      <DeferredSuspense fallback={<ReviewSkeleton />} isFetching={isFetching} />
      <div ref={containerRef} className="h-16 w-full" />
      <BottomButton />
    </div>
  );
};

export default ReviewTab;
