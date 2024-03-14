import { LabelType } from "../_types";

export const TAG_EMOJI = {
  엽서: "📨",
  스티커: "✌",
  "컵/컵홀더": "🥤",
  포토카드: "😎",
  키링: "🔑",
  포스터: "🗺️",
  티켓: "🎟️",
  유리컵: "🥛",
  포토매틱: "📸",
  ID카드: "💳",
  달력: "📅",
  홀더: "📁",
  그립톡: "📱",
  마스킹테이프: "✂️",
  기타: "🧸",
  메뉴특전: "🍰",
  선착특전: "🏁",
  럭키드로우: "🍀",
  해시태그: "✍",
};

export const TAG = {
  "컵/컵홀더": "b4ade0be-df52-4623-ba9e-cdbd099eb7b8",
  포토매틱: "0405719b-cbff-44d9-9f6e-d2538bf3b0c8",
  그립톡: "197c3f7a-a8c0-4c1c-a9dc-6c0df790d4df",
  마스킹테이프: "35028d85-fce9-4a1a-acee-c53c73c72257",
  키링: "3a571952-1c80-4224-9da4-f1d2cc2ef8e3",
  엽서: "5d414e82-0dd4-40bb-916b-ca7364c5178d",
  유리컵: "62f0fbe6-777a-494b-bf11-0f26cf2095e9",
  티켓: "727879fd-b013-4e9e-aac1-c0e94f0448df",
  달력: "7f317a0d-3d0e-481a-894e-bd5b26bf2b06",
  포스터: "bc8785ff-a2d1-4882-9a7e-1448c82a05b0",
  포토카드: "c2258461-9219-4635-b033-9cd9a890b36a",
  스티커: "c9072d9a-ab08-45af-ae09-d2febfaeba32",
  ID카드: "cdc3ff3b-9376-413b-b999-b4415016bbd6",
  홀더: "f6fdf080-f8ef-43ca-ae04-beb45bb34f49",
  기타: "167e6c4f-68e4-4f35-847c-f1c95984879d",
  메뉴특전: "1493b92d-9c58-47f0-90e1-6537c4111eed",
  선착특전: "f6b610f6-ef3b-4f16-98d8-45e1cd3741e3",
  럭키드로우: "944dd6d3-2771-40c7-a816-79d1d7b8f597",
  해시태그: "9417f83b-af9b-41b2-9723-b9db643b5f08",
};

export const GIFT_LIST = Object.keys(TAG);

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
