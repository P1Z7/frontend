import { Api } from "app/_api/api";
import { usePathname } from "next/navigation";
import React from "react";
import { FieldValues, FormProvider, UseFormProps, useForm } from "react-hook-form";
import { handlePostSubmit } from "@/utils/submitPost";

interface GenericFormProps<T extends FieldValues> {
  children: React.ReactNode;
  formOptions?: UseFormProps<T>;
}

const GenericFormProvider = <T extends FieldValues>({ children, formOptions }: GenericFormProps<T>) => {
  const methods = useForm<T>(formOptions);
  const path = usePathname();
  const instance = new Api(process.env.NEXT_PUBLIC_ACCESS_TOKEN);

  const onSubmit = async () => {
    console.log(methods.getValues()); // 회원가입 POST할 정보
    if (path === "/post") {
      handlePostSubmit(methods.getValues(), instance);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default GenericFormProvider;
