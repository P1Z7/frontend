"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useStore } from "@/store/index";
import MainInfo from "./_components/MainInfo";
import SubInfo from "./_components/SubInfo";

export interface Post {
  //나중에 파일 옮길거임
  title?: string;
  address?: string;
  detail_address?: string;
  start_date?: string;
  end_date?: string;
  sns_id?: string;
  sns_type?: string;
  event_url?: string;
  gift?: string[];
}

const Post = () => {
  const { step, setStep, info, setInfo } = useStore((state) => ({ step: state.step, setStep: state.setStep, info: state.postInfo, setInfo: state.setPostInfo }));
  //const [info, setInfo] = useState<Post>();
  // const [step, setStep] = useState(0);
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
    setInfo({ ...info, title, address, detail_address, start_date, end_date });
  };

  console.log(info);

  return (
    <div className="text-[18px]">
      <div>뒤로가기버튼</div>
      <div>등록하기</div>
      <div>진행바</div>
      <main>
        {step === 1 && <div>누구를 위한 행사인가요🎉?</div>}
        {step === 2 && <MainInfo />}
        {step === 3 && <SubInfo />}
      </main>
      <button onClick={() => setStep(2)}>2페이지로 가기</button>
    </div>
  );
};

export default Post;
