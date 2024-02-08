"use client";

import Link from "next/link";
import LinkIcon from "@/public/icon/link.svg";
import IdIcon from "@/public/icon/user.svg";
import BottomDoubleButton from "../../_components/BottomDoubleButton";
import EditBox from "./_components/EditBox";

const EditDetailApprove = () => {
  return (
    <div className="flex flex-col gap-20 px-20 py-16 pb-96 text-16 font-500 text-gray-900">
      <section className="flex flex-col gap-4">
        장소 이름
        <EditBox>서울특별시 마포구 연남동 00길 00로</EditBox>
        <EditBox isEdited>서울특별시 마포구 동그라미동 네모길 세모로</EditBox>
      </section>
      <section>
        승인 현황
        <div className="flex gap-24">
          <div>승인</div>
          <div>거절</div>
        </div>
      </section>
      <section className="flex flex-col gap-8 rounded-sm bg-gray-50 px-12 py-8 text-14">
        행사 링크를 통해 위 편집내용이 맞는지 확인해주세요!
        <div className="flex gap-12 text-blue">
          <LinkIcon stroke="#A0A5B1" width="20" height="20" />
          <Link href="https://winter2024.com">https://winter2024.com</Link>
        </div>
        <div className="flex gap-12">
          <IdIcon stroke="#A0A5B1" width="20" height="20" />
          <div>sns종류에따른아이콘..</div>
          @winter_2024
        </div>
      </section>
      <BottomDoubleButton onClickLeft={() => console.log("거절")} onClickRight={() => console.log("승인")} />
    </div>
  );
};

export default EditDetailApprove;
