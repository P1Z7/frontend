"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { Api } from "@/api/api";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { Res_Get_Type } from "@/types/getResType";
import BottomButton from "../BottomButton";
import EventReview from "../EventReview";

const SIZE = 10;
const INITIAL_CURSOR_ID = 100000;

const ReviewTab = () => {
  const instance = new Api();
  const pathname = usePathname();
  const eventId = pathname.split("/").at(-1);

  const getReviews = async ({ pageParam = 1 }) => {
    const data: Res_Get_Type["eventReviews"] = await instance.get(`/reviews/${eventId}`, { size: SIZE, cursorId: pageParam == 1 ? INITIAL_CURSOR_ID : pageParam });
    return data;
  };

  const {
    data: reviews,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["eventReviews"],
    queryFn: getReviews,
    getNextPageParam: (lastPage) => (lastPage.length < SIZE ? null : lastPage.at(-1)?.cursorId),
  });

  const containerRef = useInfiniteScroll({
    handleScroll: fetchNextPage,
    deps: [reviews],
  });

  return (
    <div className="w-full">
      <div className="w-full pt-16">{reviews?.pages.map((page) => page.map((review) => <EventReview key={review.id} data={review} />))}</div>
      <div ref={containerRef} className="h-16 w-full" />
      <BottomButton />
    </div>
  );
};

export default ReviewTab;
