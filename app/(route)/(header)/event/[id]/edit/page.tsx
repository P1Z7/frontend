"use client";

import GenericFormProvider from "@/components/GenericFormProvider";
import EditContent from "./_components/EditContent";

const EDIT_MOCKUP_DATA = {
  group: "에스파",
  member: ["카리나", "윈터"],
  eventType: "카페",
  title: "홍대 ㅁㅁ카페",
  address: "서울 마포구 와우산로 94",
  detailAddress: "홍익대학교",
  startDate: "2024-01-09",
  endDate: "2024-01-12",
  snsId: "@karrrrr",
  snsType: "트위터",
  eventUrl: "https://m.cafe.daum.net/zoomin62/GNO8/755003?svc=topRank",
  gift: ["컵홀더", "포토카드", "스티커", "굿즈"],
  images: [
    "https://fandomship.com/data/file/aespa/96d7bf5b058cf52803e681345d7f7847_z8rFhK5X_93129e63980a8f3c265ee5ab64387657ef7deec3.jpg",
    "https://fandomship.com/data/file/aespa/thumb-d405020284be78411e389d91af05cdb6_IA7RHQcw_be15cbacfc04d16192b27e45bbe6305c6d8df475_835x1181.jpg",
    "https://fandomship.com/data/file/aespa/thumb-d405020284be78411e389d91af05cdb6_c1VUxAOY_2fb4abd335ccf36c1972868aadb03ed29e557262_835x1181.jpg",
  ],
  detailText: "카리나 생일 축하합니다",
} as const;

export type EditPostType = typeof EDIT_MOCKUP_DATA;

const Edit = () => {
  //여기서 get하고 이미지들 file 형식으로 변환해서 default 값 설정..?

  return (
    <div className="flex flex-col gap-24 p-20 text-16">
      <GenericFormProvider formOptions={{ mode: "onBlur", defaultValues: EDIT_MOCKUP_DATA, shouldFocusError: true }}>
        <EditContent />
      </GenericFormProvider>
    </div>
  );
};

export default Edit;
