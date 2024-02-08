"use client";

import GenericFormProvider from "@/components/GenericFormProvider";
import EditContent from "./_components/EditContent";

const EDIT_MOCKUP_DATA = {
  placeName: "홍대 멜로우",
  eventType: "카페",
  groupId: "",
  artists: [],
  groupName: "에스파",
  artistNames: ["카리나"],
  startDate: "2023-04-08",
  endDate: "2023-04-11",
  address: "서울 마포구 잔다리로 30-11",
  addressDetail: "1층 멜로우",
  eventImages: [
    "https://fandomship.com/data/file/aespa/96d7bf5b058cf52803e681345d7f7847_z8rFhK5X_93129e63980a8f3c265ee5ab64387657ef7deec3.jpg",
    "https://fandomship.com/data/file/aespa/96d7bf5b058cf52803e681345d7f7847_1VnrpEKF_f6ffd26dbdea69f0b3b60fecc99366c4c27c542c.jpg",
  ],
  description: "이거 실제 포스터보고 만든거임",
  eventUrl: "https://fandomship.com/bbs/board.php?bo_table=aespa&wr_id=26",
  organizerSns: "@HBD_KARINA_2023",
  snsType: "트위터",
  tags: ["굿즈", "포토카드", "컵홀더", "엽서", "스티커", "기타"],
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
