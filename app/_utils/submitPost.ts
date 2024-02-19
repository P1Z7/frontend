import { Api } from "app/_api/api";
import { CategoryType, GiftType, PostValueType } from "@/types/index";
import { Req_Post_Type } from "@/types/postBodyType";
import { EDIT_CATEGORY, EDIT_CATEGORY_VALUE, TAG } from "@/constants/post";
import { makeImgUrlList } from "./changeImgUrl";
import { checkArrUpdate } from "./checkArrUpdate";

const matchTagIdList = (tags: GiftType[]) => {
  let tagList: string[] = [];
  tags.map((goods: GiftType) => {
    tagList.push(TAG[goods]);
  });
  return tagList;
};

const makeUpdateCategory = (defaultValue: any, userInputValue: any, eventId: string, userId: string) => {
  const updateCategory = new Set();
  const approveBody = new Map();
  for (const key of Object.keys(defaultValue || {})) {
    if (!defaultValue) {
      return {
        eventId,
        updateCategory: [],
        userId,
        isAgreed: true,
      };
    }
    const cur = userInputValue[key];
    const prev = defaultValue[key];
    switch (key) {
      case "artists":
        if (checkArrUpdate(prev, cur)) {
          updateCategory.add("artist");
          EDIT_CATEGORY_VALUE["artist"].map((value) => approveBody.set(value, userInputValue[value]));
        }
        break;
      case "tags":
      case "eventImages":
        if (checkArrUpdate(prev, cur)) {
          updateCategory.add(key);
          approveBody.set(key, cur);
        }
        break;
      default:
        const category = EDIT_CATEGORY[key as PostValueType];
        if (prev !== cur && category !== "null") {
          updateCategory.add(category as CategoryType);
          EDIT_CATEGORY_VALUE[category as CategoryType].map((value) => approveBody.set(value, userInputValue[value]));
        }
    }
  }

  let body: Req_Post_Type["edit"] = {
    eventId,
    updateCategory: Array.from(updateCategory) as CategoryType[],
    userId,
    isAgreed: true,
  };
  for (const [key, value] of approveBody.entries()) {
    body[key as PostValueType] = value;
  }
  return body;
};

export const handlePostSubmit = async (userInput: any, instance: Api, userId: string) => {
  const { placeName, eventType, groupId, artists, startDate, endDate, address, addressDetail, eventImages, description, eventUrl, organizerSns, snsType, tags } = userInput;
  const imgUrlList = await makeImgUrlList(eventImages, instance);
  const tagList = matchTagIdList(tags);
  return await instance.post("/event", {
    placeName,
    eventType,
    groupId,
    artists,
    startDate,
    endDate,
    address,
    addressDetail,
    description,
    eventUrl,
    organizerSns,
    snsType,
    eventImages: imgUrlList,
    tags: tagList,
    isAgreed: true,
    userId,
  });
};

export const submitEditWriter = async (userInput: any, instance: Api, userId: string, id?: string | string[]) => {
  const { placeName, eventType, groupId, artists, startDate, endDate, address, addressDetail, eventImages, description, eventUrl, organizerSns, snsType, tags } = userInput;
  const imgUrlList = await makeImgUrlList(eventImages, instance);
  const tagList = matchTagIdList(tags);
  return await instance.put(`/event/${id}`, {
    placeName,
    eventType,
    groupId,
    artists,
    startDate,
    endDate,
    address,
    addressDetail,
    description,
    eventUrl,
    organizerSns,
    snsType,
    eventImages: imgUrlList,
    tags: tagList,
    isAgreed: true,
    userId,
  });
};

export const submitEditApplication = async (instance: Api, defaultValue: any, userInput: any, userId: string, id?: string | string[]) => {
  const body = makeUpdateCategory(defaultValue, userInput, id as string, userId);
  if ("eventImages" in body) {
    body.eventImages = await makeImgUrlList(body.eventImages || [], instance);
  }
  if ("tags" in body) {
    body.tags = await matchTagIdList(body.tags as GiftType[]);
  }
  return await instance.post("/event/update/application", body);
};
