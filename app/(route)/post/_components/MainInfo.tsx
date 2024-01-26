"use client";

import classNames from "classnames";
import { useEffect, useState } from "react";
import "react-day-picker/dist/style.css";
import { useForm } from "react-hook-form";
import AddressModal from "@/components/modal/AddressModal";
import CalendarModal from "@/components/modal/CalendarModal";
import { useModal } from "@/hooks/useModal";
import { useStore } from "@/store/index";

interface Props {
  onNextStep: () => void;
}

const MainInfo = ({ onNextStep }: Props) => {
  const { setInfo, info } = useStore((state) => ({
    setInfo: state.setPostInfo,
    info: state.postInfo,
  }));
  const { modal, openModal, closeModal } = useModal();
  const [address, setAddress] = useState("");
  const {
    register,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const saveMainInfo = () => {
    setInfo({
      ...info,
      title: getValues("title"),
      address: getValues("address"),
      detail_address: getValues("detail_address"),
      start_date: getValues("start_date"),
      end_date: getValues("end_date"),
    });
    onNextStep();
  };

  const date = watch("start_date");
  const post = watch("address");
  const title = watch("title");
  const isEmpty = !date || !post || !title;

  useEffect(() => {
    setValue("address", address);
  }, [address]);

  useEffect(() => {
    setValue("title", info?.title);
    setValue("address", info?.address);
    setValue("detail_address", info?.detail_address);
    setValue("start_date", info?.start_date);
    setValue("end_date", info?.end_date);
  }, []);

  return (
    <>
      <div className="h-4 w-320 rounded-full bg-gray-200 dark:bg-gray-700">
        <div className="h-4 w-1/2 rounded-full bg-blue-600"></div>
      </div>
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
        <input placeholder="날짜 선택" readOnly className="bg-red-100" {...register("start_date")} onClick={() => openModal("date")} />
        ~
        <input placeholder="날짜 선택" readOnly className="bg-red-100" {...register("end_date")} onClick={() => openModal("date")} />
      </label>
      {modal === "address" && <AddressModal setAddress={setAddress} closeModal={closeModal} />}
      {modal === "date" && <CalendarModal setValue={setValue} closeModal={closeModal} />}
      <br />
      <button onClick={saveMainInfo} className={classNames("bg-slate-400", { "bg-red-200": !isEmpty })}>
        다음으로
      </button>
    </>
  );
};

export default MainInfo;
