import { usePathname } from "next/navigation";
import React from "react";
import { FieldValues, FormProvider, UseFormProps, useForm } from "react-hook-form";
import { Api } from "@/api/api";
import { Req_Post_Type } from "@/types/reqType";

interface GenericFormProps<T extends FieldValues> {
  children: React.ReactNode;
  formOptions?: UseFormProps<T>;
}

const GenericForm = <T extends FieldValues>({ children, formOptions }: GenericFormProps<T>) => {
  const methods = useForm<T>(formOptions);
  const path = usePathname();
  const instance = new Api(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4MzM3OWZjZi03YTMzLTQ1ZDctOTQ0OS1lYmQ2YjU0MTAzNmYiLCJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE3MDcxMjE1NTUsImV4cCI6MTcwNzEyNTE1NX0.GBV2OLxhxThgo_63oBAgtqEInciY_DrcEiNX99cSRYI",
  );

  const onSubmit = () => {
    console.log(methods.getValues()); // 회원가입 POST할 정보
    if (path === "/post") {
      const userInput = methods.getValues();
      // userInput.eventImages.map((images) => {
      //   await instance.post<Req_Post_Type[""]>("/file/upload", )
      // });
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default GenericForm;
