import { usePathname } from "next/navigation";
import React from "react";
import { FieldValues, FormProvider, UseFormProps, useForm } from "react-hook-form";
import { Api } from "@/api/api";
import { GiftType } from "@/types/index";
import { TAG } from "@/constants/data";

interface GenericFormProps<T extends FieldValues> {
  children: React.ReactNode;
  formOptions?: UseFormProps<T>;
}

const GenericForm = <T extends FieldValues>({ children, formOptions }: GenericFormProps<T>) => {
  const methods = useForm<T>(formOptions);
  const path = usePathname();
  const instance = new Api("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE3MDcxMjgwNDF9.AR8YcpB9rBxRpk8DcWM-JvSbU9oPkLjPRXL7g5GwG8w");

  const uploadImg = async (image: File) => {
    const formData = new FormData();
    formData.append("file", image);
    const res = await instance.post("/file/upload", formData, { category: "event" });
    return res;
  };

  const matchTagIdList = (tags: GiftType[]) => {
    let tagList: string[] = [];
    tags.map((goods: GiftType) => {
      tagList.push(TAG[goods]);
    });
    return tagList;
  };

  const makeImgUrlList = async (eventImages: (string | File)[]) => {
    let imageUrlList: string[] = [];
    for (const image of eventImages) {
      if (typeof image !== "string") {
        const res = await uploadImg(image);
        imageUrlList.push(res);
      } else {
        imageUrlList.push(image);
      }
    }

    return imageUrlList;
  };

  const handlePostSubmit = async () => {
    const userInput = methods.getValues();
    const { placeName, eventType, groupId, artists, startDate, endDate, address, addressDetail, eventImages, description, eventUrl, organizerSns, snsType, tags } = userInput;
    const imgUrlList = await makeImgUrlList(eventImages);
    const tagList = matchTagIdList(tags);
    const response = await instance.post("/event", {
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

  const onSubmit = async () => {
    console.log(methods.getValues()); // 회원가입 POST할 정보
    if (path === "/post") {
      handlePostSubmit();
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default GenericForm;
