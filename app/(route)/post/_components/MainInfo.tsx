"use client";

import { useEffect, useState } from "react";
import "react-day-picker/dist/style.css";
import { useForm } from "react-hook-form";
import AddressModal from "@/components/Modal/AddressModal/AddressModal";
import CalendarModal from "@/components/Modal/CalendarModal/CalendarModal";
import { useStore } from "@/store/index";

/**
 * TODO: 에러메세지 상수처리, 버튼 비활성화 기능
 */
const MainInfo = () => {
  const { modal, openModal, setStep, setInfo, info } = useStore((state) => ({
    modal: state.modal,
    openModal: state.openModal,
    setStep: state.setStep,
    setInfo: state.setPostInfo,
    info: state.postInfo,
  }));
  const [address, setAddress] = useState("");
  const {
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const saveMainInfo = () => {
    const title = getValues("title");
    const address = getValues("address");
    const detail_address = getValues("detail_address");
    const start_date = getValues("start_date");
    const end_date = getValues("end_date");
    setInfo({ ...info, title, address, detail_address, start_date, end_date });
    setStep(3);
  };

  useEffect(() => {
    setValue("address", address);
  }, [address]);

  return (
    <>
      <div>행사 정보를 입력해주세요🎈</div>
      <label>
        제목
        <input placeholder="카페 이름" {...register("title", { required: "제목을 입력해주세요." })} />
      </label>
      {errors.title && <div>{`${errors.title.message}`}</div>}
      <br />
      <label>
        주소 <br />
        <input placeholder="도로명주소" readOnly {...register("address")} onClick={() => openModal("address")} />
        <input placeholder="상세주소 입력" {...register("detail_address")} />
        {errors.address && <div>{`${errors.address.message}`}</div>}
      </label>
      <br />
      <label>
        기간
        <input placeholder="날짜 선택" readOnly className="bg-red-100" {...register("start_date", { required: "기간을 입력해주세요." })} onClick={() => openModal("date")} />
        ~
        <input placeholder="날짜 선택" readOnly className="bg-red-100" {...register("end_date")} onClick={() => openModal("date")} />
      </label>
      {modal === "address" && <AddressModal setAddress={setAddress} />}
      {modal === "date" && <CalendarModal setValue={setValue} />}
      <button onClick={saveMainInfo}>넘어가기</button>
    </>
  );
};

export default MainInfo;
