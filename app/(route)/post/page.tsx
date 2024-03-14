"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import GenericFormProvider from "@/components/GenericFormProvider";
import MetaTag from "@/components/MetaTag";
import DottedLayout from "@/components/layout/DottedLayout";
import AlertModal from "@/components/modal/AlertModal";
import { useModal } from "@/hooks/useModal";
import { META_TAG } from "@/constants/metaTag";
import LoadingDot from "../signin/_components/LoadingDot";
import PostContent from "./_components/PostContent";

const DEFAULT_INPUT_VALUES = {
  placeName: "",
  eventType: "",
  groupId: "",
  artists: [],
  groupName: "",
  artistNames: [],
  startDate: "",
  endDate: "",
  address: "",
  addressDetail: "",
  userId: "",
  eventImages: [],
  description: "",
  eventUrl: "",
  organizerSns: "",
  snsType: "트위터",
  tags: [],
};

export type PostType = Omit<typeof DEFAULT_INPUT_VALUES, "artists" | "artistNames" | "eventImages" | "tags"> & {
  artists: string[];
  artistNames: string[];
  eventImages: (File | string)[];
  tags: string[];
};

const Post = () => {
  const [defaultValue, setDefaultValue] = useState(DEFAULT_INPUT_VALUES);
  const [isInit, setIsInit] = useState(false);
  const { modal, openModal, closeModal } = useModal();
  const _ = require("lodash");

  const importAutoSave = () => {
    toast("저장 내용을 불러옵니다.", { className: "text-16 font-500" });
    setDefaultValue(JSON.parse(localStorage.getItem("post") as string));
    setIsInit(true);
    closeModal();
  };

  const clearAutoSave = () => {
    localStorage.clear();
    setIsInit(true);
    closeModal();
  };

  useEffect(() => {
    if (localStorage.getItem("post") && !_.isEqual(JSON.parse(localStorage.getItem("post") as string), DEFAULT_INPUT_VALUES)) {
      openModal("autoSave");
    } else setIsInit(true);
  }, []);

  useEffect(() => {
    if (isInit) toast("작성 내용이 자동 저장됩니다.", { className: "text-16 font-500" });
  }, [isInit]);

  return (
    <>
      <MetaTag title={META_TAG.post["title"]} description={META_TAG.post["description"]} />
      <DottedLayout size="narrow">
        <div className="flex h-full flex-col">
          <div className="h-full p-20 pb-116 pt-36 text-16 pc:relative pc:min-h-[59.5vh] pc:px-0 pc:pb-0 pc:pt-56 pc:text-20 pc:font-500">
            {isInit ? (
              <GenericFormProvider formOptions={{ mode: "onBlur", defaultValues: defaultValue, shouldFocusError: true }}>
                <PostContent />
              </GenericFormProvider>
            ) : (
              <div className="flex h-[10vh] w-full items-center justify-center">
                <LoadingDot />
              </div>
            )}
          </div>
        </div>
      </DottedLayout>
      {modal === "autoSave" && (
        <AlertModal closeModal={closeModal} hasCancelBtn handleBtnClick={importAutoSave} handleCancelClick={clearAutoSave}>
          자동 저장된 내용이 있습니다.
          <br />
          이어서 작성할까요?
        </AlertModal>
      )}
    </>
  );
};

export default Post;
