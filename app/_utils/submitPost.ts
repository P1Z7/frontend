import { Api } from "app/_api/api";
import { GiftType } from "@/types/index";
import { TAG } from "@/constants/data";
import { makeImgUrlList } from "./changeImgUrl";

const matchTagIdList = (tags: GiftType[]) => {
  let tagList: string[] = [];
  tags.map((goods: GiftType) => {
    tagList.push(TAG[goods]);
  });
  return tagList;
};

export const handlePostSubmit = async (userInput: any, instance: Api) => {
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
    userId: "post-api",
  });
};
