"use client";

import { useEffect, useState } from "react";
import "react-day-picker/dist/style.css";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import AddressModal from "@/components/Modal/AddressModal/AddressModal";
import CalendarModal from "@/components/Modal/CalendarModal/CalendarModal";
import { useStore } from "@/store/index";

interface Props {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  setValue: any;
}

const MainInfo = ({ register, errors, setValue }: Props) => {
  const [address, setAddress] = useState("");
  const { modal, openModal } = useStore((state) => ({ modal: state.modal, openModal: state.openModal }));

  useEffect(() => {
    setValue("address", address);
  }, [address]);

  return (
    <>
      <div>행사 정보를 입력해주세요🎈</div>
      <label>
        제목
        <input placeholder="카페 이름" {...register("title", { required: "내용이업서욤" })} />
      </label>
      {errors.title && <div>{`${errors.title.message}`}</div>}
      <br />
      <label>
        주소 <br />
        <input placeholder="도로명주소" readOnly {...register("address", { required: "내용이업서욤" })} onClick={() => openModal("address")} />
        <input placeholder="상세주소 입력" {...register("detail_address")} />
      </label>
      <br />
      <label>
        기간
        <input placeholder="날짜 선택" readOnly className="bg-red-100" {...register("start_date")} onClick={() => openModal("date")} />
        ~
        <input placeholder="날짜 선택" readOnly className="bg-red-100" {...register("end_date")} onClick={() => openModal("date")} />
      </label>
      {modal === "address" && <AddressModal setAddress={setAddress} />}
      {modal === "date" && <CalendarModal setValue={setValue} />}
    </>
  );
};

export default MainInfo;
