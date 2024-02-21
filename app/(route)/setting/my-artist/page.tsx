"use client";

import dynamic from "next/dynamic";
import { SubmitHandler, useForm } from "react-hook-form";
import MetaTag from "@/components/MetaTag";
import MyArtistList from "@/components/MyArtistList";
import MobileHeader from "@/components/header/MobileHeader";
import PinkLayout from "@/components/layout/PinkLayout";
import { instance } from "@/api/api";
import { useModal } from "@/hooks/useModal";
import { META_TAG } from "@/constants/metaTag";

const AlertModal = dynamic(() => import("@/components/modal/AlertModal"), { ssr: false });
const InputModal = dynamic(() => import("@/components/modal/InputModal"), { ssr: false });

const MyArtistEditPage = () => {
  const { modal, openModal, closeModal } = useModal();
  const { control, handleSubmit, setValue } = useForm({ defaultValues: { request: "" } });

  const onSubmit: SubmitHandler<{ request: string }> = async ({ request }) => {
    try {
      if (request) {
        const res = await instance.post("/artist/request", {
          name: request,
        });
      }
    } catch (e) {
    } finally {
      openModal("confirm");
      setValue("request", "");
    }
  };

  return (
    <>
      <MetaTag title={META_TAG.myArtist["title"]} description={META_TAG.myArtist["title"]} />
      <PinkLayout size="wide">
        <MobileHeader />
        <div className="flex flex-col gap-24 px-20 py-36">
          <section className="flex flex-col gap-12">
            <h2 className="text-20 font-700 text-gray-900">좋아하는 아티스트를 알려주세요!</h2>
            <button onClick={() => openModal("noArtist")} className="w-188 text-14 text-gray-500 underline underline-offset-2">
              찾으시는 아티스트가 없으신가요?
            </button>
          </section>
          <MyArtistList />
        </div>
        {modal === "noArtist" && (
          <InputModal
            title="아티스트 등록 요청"
            btnText="요청하기"
            handleBtnClick={handleSubmit(onSubmit)}
            closeModal={closeModal}
            {...{ name: "request", placeholder: "찾으시는 아티스트를 알려주세요.", rules: { required: "내용을 입력하세요." }, control, noButton: true }}
          />
        )}
        {modal === "confirm" && <AlertModal closeModal={closeModal}>등록 요청이 제출되었습니다.</AlertModal>}
      </PinkLayout>
    </>
  );
};
export default MyArtistEditPage;
