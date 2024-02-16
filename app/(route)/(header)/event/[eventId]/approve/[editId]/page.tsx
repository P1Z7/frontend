"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { instance } from "@/api/api";
import { CategoryType, EditContentType, LabelType, PostValueType } from "@/types/index";
import { EDIT_ERR_MSG } from "@/constants/errorMsg";
import { LABEL_BY_CATEGORY, exceptionList } from "@/constants/post";
import ApproveIcon from "@/public/icon/edit-approve.svg";
import DeclineIcon from "@/public/icon/edit-reject.svg";
import LinkIcon from "@/public/icon/link.svg";
import IdIcon from "@/public/icon/user.svg";
import BottomDoubleButton from "../../_components/BottomDoubleButton";
import { OrganizerEdit } from "../_components/EditFormat";
import ReactionIcon from "../_components/ReactionIcon";
import RenderException from "../_components/RenderException";
import EditBox from "./_components/EditBox";

const EditDetailApprove = () => {
  const router = useRouter();
  const { eventId } = useParams();
  const [originData, setOriginData] = useState<EditContentType>();
  const { editId } = useParams();
  const { data, isSuccess, refetch } = useQuery({
    queryKey: ["approveDetail", editId],
    queryFn: async () => {
      return instance.get(`/event/update/application/${editId}`, { eventUpdateApplicationId: String(editId) });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      const { eventImages, eventTags, targetArtists } = data.originEvent;
      const artists = targetArtists.map(({ artistId }: { artistId: string }) => artistId);
      const tags = eventTags.map(({ tagId }: { tagId: string }) => tagId);
      const imgList = eventImages.map(({ imageUrl }: { imageUrl: string }) => imageUrl);
      data.originEvent.groupId = targetArtists[0].groupId;
      data.originEvent.artists = artists;
      data.originEvent.tags = tags;
      data.originEvent.eventImages = imgList;
      setOriginData(data.originEvent);
    }
  }, [data]);

  const handleApplicationSubmit = async (isApproved: boolean) => {
    const res = await instance.post("/event/update/approval", { eventUpdateApplicationId: String(editId), isApproved, userId: "edit-api" });
    refetch();
    if (res.error) {
      toast.error(EDIT_ERR_MSG[res.statusCode as "409" | "500"], { className: "text-14 !text-red font-600" });
    } else {
      toast(EDIT_ERR_MSG[isApproved ? "approve" : "reject"], {
        icon: isApproved ? <ApproveIcon width="20" height="20" /> : <DeclineIcon width="20" height="20" />,
        className: "text-16 font-500",
      });
      router.replace(`/event/${eventId}/approve`);
    }
  };

  return (
    <div className="flex flex-col gap-20 px-20 py-16 pb-96 text-16 font-500 text-gray-900">
      {isSuccess && (
        <>
          <section className="flex flex-col gap-4">
            {LABEL_BY_CATEGORY[data.applicationDetail.updateCategory as CategoryType]}
            <EditBox>
              {originData &&
                (exceptionList.includes(LABEL_BY_CATEGORY[data.applicationDetail.updateCategory as CategoryType] as LabelType) ? (
                  <RenderException editContent={originData} instance={instance} type={LABEL_BY_CATEGORY[data.applicationDetail.updateCategory as CategoryType] as LabelType} />
                ) : (
                  <>{originData[data.applicationDetail.updateCategory as PostValueType] || EDIT_ERR_MSG["noInfo"]}</>
                ))}
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
          {originData && (originData.eventUrl || originData.organizerSns) && (
            <section className="flex flex-col gap-8 rounded-sm bg-gray-50 px-12 py-8 text-14">
              행사 링크를 통해 위 편집내용이 맞는지 확인해주세요!
              {originData.eventUrl && (
                <div className="flex gap-12 text-blue">
                  <LinkIcon stroke="#A0A5B1" width="20" height="20" />
                  <Link href={originData.eventUrl}>{originData.eventUrl}</Link>
                </div>
              )}
              {originData.organizerSns && (
                <div className="flex gap-12">
                  <IdIcon stroke="#A0A5B1" width="20" height="20" />
                  <OrganizerEdit snsType={originData.snsType || "기타"} snsId={originData.organizerSns} />
                </div>
              )}
            </section>
          )}
        </>
      )}
      <BottomDoubleButton onClickLeft={() => handleApplicationSubmit(false)} onClickRight={() => handleApplicationSubmit(true)} />
    </div>
  );
};

export default EditDetailApprove;
