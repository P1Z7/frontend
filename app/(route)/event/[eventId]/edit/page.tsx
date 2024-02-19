"use client";

import { PostType } from "@/(route)/post/page";
import { instance } from "app/_api/api";
import { format } from "date-fns";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import GenericFormProvider from "@/components/GenericFormProvider";
import MobileHeader from "@/components/header/MobileHeader";
import PinkLayout from "@/components/layout/PinkLayout";
import { useAuth } from "@/hooks/useAuth";
import { useStore } from "@/store/index";
import EditContent from "./_components/EditContent";

let INITIAL_DATA: PostType;

const Edit = () => {
  const session = useAuth("/signin");
  const { eventId } = useParams();
  const [init, setInit] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const { setWriterId } = useStore((state) => ({ setWriterId: state.setWriterId }));

  useEffect(() => {
    if (session) setIsLogin(true);
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
      {isLogin && (
        <PinkLayout size="narrow">
          <MobileHeader />
          <div className="p-20 pb-116 text-16 pc:p-32 pc:pb-0">
            {init && (
              <GenericFormProvider formOptions={{ mode: "onChange", defaultValues: INITIAL_DATA, shouldFocusError: true }}>
                <EditContent />
              </GenericFormProvider>
            )}
          </div>
        </PinkLayout>
      )}
    </>
  );
};

export default Edit;
