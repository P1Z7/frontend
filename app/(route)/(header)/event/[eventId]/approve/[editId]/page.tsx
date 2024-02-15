"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { Api } from "@/api/api";
import { CategoryType, LabelType } from "@/types/index";
import { LABEL_BY_CATEGORY } from "@/constants/post";
import LinkIcon from "@/public/icon/link.svg";
import IdIcon from "@/public/icon/user.svg";
import BottomDoubleButton from "../../_components/BottomDoubleButton";
import { exceptionList } from "../_components/EditCard";
import { OrganizerEdit } from "../_components/EditFormat";
import ReactionIcon from "../_components/ReactionIcon";
import RenderException from "../_components/RenderException";
import EditBox from "./_components/EditBox";

const EditDetailApprove = () => {
  const { editId } = useParams();
  const instance = new Api();
  const { data, isSuccess } = useQuery({
    queryKey: ["approveDetail", editId],
    queryFn: async () => {
      return instance.get(`/event/update/application/${editId}`, { eventUpdateApplicationId: String(editId) });
    },
  });

  useEffect(() => {
    console.log(data);
    // console.log(data.applicationDetail.updateCategory);
    // console.log(data.originEvent[data.applicationDetail.updateCategory]);
  }, [data]);

  return (
    <div className="flex flex-col gap-20 px-20 py-16 pb-96 text-16 font-500 text-gray-900">
      {isSuccess && (
        <>
          <section className="flex flex-col gap-4">
            {LABEL_BY_CATEGORY[data.applicationDetail.updateCategory as CategoryType]}
            <EditBox>
              {exceptionList.includes(LABEL_BY_CATEGORY[data.applicationDetail.updateCategory as CategoryType] as LabelType) ? (
                <RenderException
                  editContent={JSON.parse(data.applicationDetail.updateData)}
                  instance={instance}
                  type={LABEL_BY_CATEGORY[data.applicationDetail.updateCategory as CategoryType] as LabelType}
                />
              ) : (
                <>{data.originEvent[data.applicationDetail.updateCategory] || "기존 내용 없음"}</>
              )}
            </EditBox>
            <EditBox isEdited>
              {exceptionList.includes(LABEL_BY_CATEGORY[data.applicationDetail.updateCategory as CategoryType] as LabelType) ? (
                <RenderException
                  editContent={JSON.parse(data.applicationDetail.updateData)}
                  instance={instance}
                  type={LABEL_BY_CATEGORY[data.applicationDetail.updateCategory as CategoryType] as LabelType}
                />
              ) : (
                <>{JSON.parse(data.applicationDetail.updateData)[data.applicationDetail.updateCategory]}</>
              )}
            </EditBox>
          </section>
          <section className="flex flex-col gap-4">
            승인 현황
            <div className="flex gap-24 py-8">
              <div className="flex gap-8 text-14 font-500 text-gray-500">
                승인
                <ReactionIcon count={Number(data.applicationDetail.approvalCount)} type="approve" size="l" />
              </div>
              <div className="flex gap-8 text-14 font-500 text-gray-500">
                거절
                <ReactionIcon count={Number(data.applicationDetail.rejectionCount)} type="reject" size="l" />
              </div>
            </div>
          </section>
          {(data.originEvent.eventUrl || data.originEvent.organizerSns) && (
            <section className="flex flex-col gap-8 rounded-sm bg-gray-50 px-12 py-8 text-14">
              행사 링크를 통해 위 편집내용이 맞는지 확인해주세요!
              {data.originEvent.eventUrl && (
                <div className="flex gap-12 text-blue">
                  <LinkIcon stroke="#A0A5B1" width="20" height="20" />
                  <Link href={data.originEvent.eventUrl}>{data.originEvent.eventUrl}</Link>
                </div>
              )}
              {data.originEvent.organizerSns && (
                <div className="flex gap-12">
                  <IdIcon stroke="#A0A5B1" width="20" height="20" />
                  <OrganizerEdit snsType={data.originEvent.snsType} snsId={data.originEvent.organizerSns} />
                </div>
              )}
            </section>
          )}
        </>
      )}
      <BottomDoubleButton onClickLeft={() => console.log("거절")} onClickRight={() => console.log("승인")} />
    </div>
  );
};

export default EditDetailApprove;
