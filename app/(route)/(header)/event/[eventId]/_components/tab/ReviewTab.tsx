"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { Api, instance } from "app/_api/api";
import { usePathname } from "next/navigation";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { Res_Get_Type } from "@/types/getResType";
import BottomButton from "../BottomButton";
import EventReview from "../EventReview";

const SIZE = 10;
const INITIAL_CURSOR_ID = 100000;

interface Props {
  eventId: string;
}

const ReviewTab = ({ eventId }: Props) => {
  const pathname = usePathname();

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
    queryKey: ["eventReviews", eventId],
    queryFn: getReviews,
    getNextPageParam: (lastPage) => (lastPage.length < SIZE ? null : lastPage.at(-1)?.cursorId),
  });

  const containerRef = useInfiniteScroll({
    handleScroll: fetchNextPage,
    deps: [reviews],
  });

  return (
    <div className="w-full bg-white-black pt-16 tablet:px-40 tablet:py-32">
      <div className="w-full">{reviews?.pages.map((page) => page.map((review) => <EventReview key={review.id} data={review} />))}</div>
      <div ref={containerRef} className="h-16 w-full" />
      <BottomButton />
    </div>
  );
};

export default ReviewTab;
