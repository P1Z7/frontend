"use client";

import { PostType } from "@/(route)/post/page";
import { instance } from "app/_api/api";
import { format } from "date-fns";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import GenericFormProvider from "@/components/GenericFormProvider";
import EditContent from "./_components/EditContent";

let INITIAL_DATA: PostType;

const Edit = () => {
  const { eventId } = useParams();
  const [init, setInit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await instance.get(`/event/${eventId}`);
      const { address, addressDetail, description, endDate, startDate, eventImages, eventTags, eventUrl, eventType, organizerSns, placeName, snsType, targetArtists } = data;
      const artistNames: string[] = targetArtists.map(({ artistName }: { artistName: string }) => artistName);
      const artists = targetArtists.map(({ artistId }: { artistId: string }) => artistId);
      const tags = eventTags.map(({ tagName }: { tagName: string }) => tagName);
      const imgList = eventImages.map(({ imageUrl }: { imageUrl: string }) => imageUrl);

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
    <div className="flex flex-col gap-24 p-20 text-16">
      {init && (
        <GenericFormProvider formOptions={{ mode: "onChange", defaultValues: INITIAL_DATA, shouldFocusError: true }}>
          <EditContent />
        </GenericFormProvider>
      )}
    </div>
  );
};

export default Edit;
