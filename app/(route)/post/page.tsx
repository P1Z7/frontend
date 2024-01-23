"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import MainInfo from "./_components/MainInfo";

interface Post {
  title: string;
  address: string;
  detail_address: string;
}

const Post = () => {
  const [info, setInfo] = useState<Post>();
  const [step, setStep] = useState(0);
  const {
    register,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const saveMainInfo = () => {
    const title = getValues("title");
    const address = getValues("address");
    const detail_address = getValues("detail_address");
    const start_date = getValues("start_date");
    const end_date = getValues("end_date");
    setInfo((prev: any) => {
      return { ...prev, title, address, detail_address, start_date, end_date };
    });
  };

  console.log(info);

  return (
    <div className="text-[18px]">
      <div>뒤로가기버튼</div>
      <div>등록하기</div>
      <div>진행바</div>
      <main>
        {step === 0 && <div>누구를 위한 행사인가요🎉?</div>}
        {step === 1 && <MainInfo register={register} errors={errors} setValue={setValue} />}
      </main>
      <button
        onClick={() => {
          saveMainInfo();
          setStep((prev) => ++prev);
        }}
      >
        넘어가기
      </button>
    </div>
  );
};

export default Post;
