"use client";

import { MOCK } from "app/_constants/mock";
import { useForm } from "react-hook-form";
import MyArtistList from "@/components/MyArtistList";
import AlertModal from "@/components/modal/AlertModal";
import InputModal from "@/components/modal/InputModal";
import { useModal } from "@/hooks/useModal";

const FavoritePage = () => {
  const { modal, openModal, closeModal } = useModal();
  const { control } = useForm({ defaultValues: { search: "" } });

  return (
    <>
      <div className="flex flex-col gap-24 px-20 py-36">
        <section className="flex flex-col gap-12">
          <h2 className="text-20 font-700 text-gray-900">좋아하는 아티스트를 알려주세요!</h2>
          <button onClick={() => openModal("noArtist")} className="w-188 text-14 text-gray-500 underline underline-offset-2">
            찾으시는 아티스트가 없으신가요?
          </button>
        </section>
        <MyArtistList data={MOCK} />
      </div>
      {modal === "noArtist" && (
        <InputModal
          title="아티스트 등록 요청"
          label=""
          btnText="요청하기"
          handleBtnClick={() => openModal("confirm")}
          closeModal={closeModal}
          {...{ placeholder: "찾으시는 아티스트를 알려주세요.", rules: { required: "내용을 입력하세요." }, control: control }}
        />
      )}
      {modal === "confirm" && <AlertModal closeModal={closeModal}>등록 요청이 제출되었습니다.</AlertModal>}
    </>
  );
};
export default FavoritePage;
