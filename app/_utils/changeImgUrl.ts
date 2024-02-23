import { Api } from "app/_api/api";

export const uploadImg = async (image: File, instance: Api) => {
  const formData = new FormData();
  formData.append("file", image);
  const res = await instance.post("/file/upload", formData, { category: "event" });
  return res;
};

/**
 * File 형식의 이미지 리스트를 url 형식의 이미지 리스트로 바꿔주는 함수
 */
export const makeImgUrlList = async (eventImages: (string | File)[], instance: Api) => {
  let imageUrlList: string[] = [];
  for (const image of eventImages) {
    if (typeof image !== "string") {
      const res = await uploadImg(image, instance);
      if (res.includes("Request Entity Too Large")) {
        throw Error(" /Request Entity Too Large");
      }
      imageUrlList.push(res);
    } else {
      imageUrlList.push(image);
    }
  }

  return imageUrlList;
};
