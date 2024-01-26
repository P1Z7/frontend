"use client";

import classNames from "classnames";
import { useEffect, useState } from "react";
import "react-day-picker/dist/style.css";
import { useForm, useFormContext } from "react-hook-form";
import InputText from "@/components/input/InputText";
import AddressModal from "@/components/modal/AddressModal";
import CalendarModal from "@/components/modal/CalendarModal";
import { useModal } from "@/hooks/useModal";
import { useStore } from "@/store/index";
import { PostType } from "../page";

interface Props {
  onNextStep: () => void;
}

const MainInfo = ({ onNextStep }: Props) => {
  const { setValue } = useFormContext<PostType>();
  const { modal, openModal, closeModal } = useModal();

  return (
    <>
      <div className="h-4 w-320 rounded-full bg-gray-200 dark:bg-gray-700">
        <div className="h-4 w-1/2 rounded-full bg-blue-600"></div>
      </div>
      <div>행사 정보를 입력해주세요🎈</div>
      <InputText name="title" placeholder="카페 이름">
        제목
      </InputText>
      <InputText name="address" placeholder="도로명주소 검색" readOnly onClick={() => openModal("address")}>
        주소
      </InputText>
      <InputText name="detailAddress" placeholder="상세주소 입력" />
      <InputText name="startDate" placeholder="날짜 선택" readOnly onClick={() => openModal("date")}>
        기간
      </InputText>
      <InputText name="endDate" placeholder="날짜 선택" readOnly onClick={() => openModal("date")} />
      <button onClick={onNextStep} className={classNames("bg-slate-400")}>
        다음으로
      </button>
      {modal === "address" && <AddressModal setValue={setValue} closeModal={closeModal} />}
      {modal === "date" && <CalendarModal setValue={setValue} closeModal={closeModal} />}
    </>
  );
};

export default MainInfo;
