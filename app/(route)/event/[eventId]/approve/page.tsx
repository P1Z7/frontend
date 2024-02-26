"use client";

import LoadingDot from "@/(route)/signin/_components/LoadingDot";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import MetaTag from "@/components/MetaTag";
import MobileHeader from "@/components/header/MobileHeader";
import PinkLayout from "@/components/layout/PinkLayout";
import { instance } from "@/api/api";
import { EditApplicationType, LabelType } from "@/types/index";
import { META_TAG } from "@/constants/metaTag";
import { LABEL_BY_CATEGORY } from "@/constants/post";
import EditCard from "./_components/EditCard";

const EditApprove = () => {
  const { eventId } = useParams();
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["approve", eventId],
    queryFn: async () => {
      return instance.get(`/event/${eventId}/update/application`);
    },
    staleTime: 1000 * 60,
  });

  return (
    <>
      <MetaTag title={META_TAG.approve["title"]} description={META_TAG.approve["description"]} />
      <PinkLayout size="middle">
        <MobileHeader />
        <div className="px-20 py-16 pc:p-32">
          <section className="flex justify-center rounded-sm bg-gray-50 px-12 py-8 text-center text-14 text-gray-700">
            <p className="max-w-300">수정사항은 사용자 3인 이상의 승인 후에 반영됩니다. 거절이 3회 누적된 수정사항은 자동으로 삭제됩니다.</p>
          </section>
          {isLoading && (
            <div className="flex justify-center py-40">
              <LoadingDot />
            </div>
          )}
          {isSuccess &&
            (data.length === 0 ? (
              <div className="py-20 text-center text-16 font-500 text-gray-600">요청된 수정사항이 없어요💦</div>
            ) : (
              data.map(({ id, approvalCount, rejectionCount, updateCategory, updateData, createdAt }: EditApplicationType) => (
                <EditCard
                  key={id}
                  id={id}
                  category={updateCategory}
                  type={LABEL_BY_CATEGORY[updateCategory] as LabelType}
                  editContent={JSON.parse(updateData)}
                  count={{ approve: Number(approvalCount), decline: Number(rejectionCount) }}
                  createdAt={createdAt}
                />
              ))
            ))}
        </div>
      </PinkLayout>
    </>
  );
};

export default EditApprove;
