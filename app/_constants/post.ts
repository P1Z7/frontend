import { LabelType } from "../_types";

export const TAG = {
  엽서: "5d414e82-0dd4-40bb-916b-ca7364c5178d",
  스티커: "c9072d9a-ab08-45af-ae09-d2febfaeba32",
  컵홀더: "b4ade0be-df52-4623-ba9e-cdbd099eb7b8",
  포토카드: "c2258461-9219-4635-b033-9cd9a890b36a",
  티켓: "3a571952-1c80-4224-9da4-f1d2cc2ef8e3",
  굿즈: "0405719b-cbff-44d9-9f6e-d2538bf3b0c8",
  포스터: "bc8785ff-a2d1-4882-9a7e-1448c82a05b0",
  기타: "167e6c4f-68e4-4f35-847c-f1c95984879d",
};

export const EDIT_CATEGORY = {
  placeName: "placeName",
  eventType: "eventType",
  groupId: "artist",
  artists: "artist",
  address: "address",
  addressDetail: "address",
  startDate: "period",
  endDate: "period",
  tags: "tags",
  eventImages: "eventImages",
  organizerSns: "organizer",
  snsType: "organizer",
  eventUrl: "eventUrl",
  description: "description",
  groupName: "null",
  artistNames: "null",
};

export const EDIT_CATEGORY_VALUE = {
  placeName: ["placeName"],
  eventType: ["eventType"],
  artist: ["groupId", "artists"],
  address: ["address", "addressDetail"],
  period: ["startDate", "endDate"],
  tags: ["tags"],
  eventImages: ["eventImages"],
  organizer: ["organizerSns", "snsType"],
  eventUrl: ["eventUrl"],
  description: ["description"],
};

export const LABEL_BY_CATEGORY = {
  placeName: "장소 이름",
  eventType: "행사 유형",
  artist: "아티스트",
  address: "주소",
  period: "기간",
  tags: "특전",
  eventImages: "이미지",
  organizer: "주최자",
  eventUrl: "링크",
  description: "상세 내용",
};

export const exceptionList: LabelType[] = ["아티스트", "주소", "기간", "특전", "이미지", "주최자"];
