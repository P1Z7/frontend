"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { instance } from "@/api/api";
import { MyReviewType } from "@/types/index";
import NoContent from "../../NoContent";
import MyReview from "./MyReview";

interface Props {
  userId: string;
}

const SIZE = 9999;

const MyReviewTab = ({ userId }: Props) => {
  const [dep, setDep] = useState("");
  const { data: myReviewsData, isSuccess } = useQuery({
    queryKey: [userId, dep],
    queryFn: async () => {
      return instance.get(`/reviews/user/${userId}`, { size: SIZE, cursorId: 500, userId: userId });
    },
  });

  if (!isSuccess) return;
  return (
    <ul className="flex-center w-full flex-col pb-88 pt-8 pc:pb-16">
      {myReviewsData.length > 0 ? (
        myReviewsData.map((review: MyReviewType) => (
          <li key={review.id} className="w-full">
            <MyReview data={review} userId={userId} setDep={setDep} />
          </li>
        ))
      ) : (
        <NoContent type="MyReview" />
      )}
    </ul>
  );
};

export default MyReviewTab;
