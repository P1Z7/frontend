"use client";

import { PostType } from "@/(route)/post/page";
import LoadingDot from "@/(route)/signin/_components/LoadingDot";
import { instance } from "app/_api/api";
import { format } from "date-fns";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import GenericFormProvider from "@/components/GenericFormProvider";
import MetaTag from "@/components/MetaTag";
import PinkLayout from "@/components/layout/PinkLayout";
import { useStore } from "@/store/index";
import { META_TAG } from "@/constants/metaTag";
import EditContent from "./_components/EditContent";
import DottedLayout from "@/components/layout/DottedLayout";

let INITIAL_DATA: PostType;

const Edit = () => {
  const { eventId } = useParams();
  const [init, setInit] = useState(false);
  const { setWriterId } = useStore((state) => ({ setWriterId: state.setWriterId }));

  useEffect(() => {
    const fetchData = async () => {
      const data = await instance.get(`/event/${eventId}`);
      const { address, addressDetail, description, endDate, startDate, eventImages, eventTags, eventUrl, eventType, organizerSns, placeName, snsType, targetArtists, userId } =
        data;
      const artistNames: string[] = targetArtists.map(({ artistName }: { artistName: string }) => artistName);
      const artists = targetArtists.map(({ artistId }: { artistId: string }) => artistId);
      const tags = eventTags.map(({ tagName }: { tagName: string }) => tagName);
      const imgList = eventImages.map(({ imageUrl }: { imageUrl: string }) => imageUrl);
      setWriterId(userId);

      INITIAL_DATA = {
        placeName,
        eventType,
        groupId: targetArtists[0].groupId || "",
        groupName: targetArtists[0].groupId ? targetArtists[0].groupName : targetArtists[0].artistName,
        artists,
        artistNames: targetArtists[0].groupId ? artistNames : [],
        startDate: format(startDate, "yyyy.MM.dd"),
        endDate: format(endDate, "yyyy.MM.dd"),
        address,
        addressDetail,
        eventImages: imgList,
        description,
        eventUrl,
        organizerSns,
        snsType,
        tags,
      } as PostType;
      setInit(true);
    };
    fetchData();
  }, []);

  return (
    <>
      <MetaTag title={META_TAG.edit["title"]} description={META_TAG.edit["description"]} />
      <DottedLayout size="narrow">
      <div className="p-20 pb-120 text-16 pc:p-0">
        {init ? (
          <GenericFormProvider formOptions={{ mode: "onChange", defaultValues: INITIAL_DATA, shouldFocusError: true }}>
            <EditContent />
          </GenericFormProvider>
        ) : (
          <div className="flex h-[10vh] w-full items-center justify-center">
            <LoadingDot />
          </div>
        )}
      </div>
      </DottedLayout>
    </>
  );
};

export default Edit;
