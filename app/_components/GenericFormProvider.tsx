import React from "react";
import { FieldValues, FormProvider, UseFormProps, useForm } from "react-hook-form";

interface GenericFormProps<T extends FieldValues> {
  children: React.ReactNode;
  formOptions?: UseFormProps<T>;
}

const GenericFormProvider = <T extends FieldValues>({ children, formOptions }: GenericFormProps<T>) => {
  const methods = useForm<T>(formOptions);

  const onSubmit = () => {
    console.log(methods.getValues()); // 회원가입 POST할 정보
    //여기서 행사도 POST ....... 나중에 path추가해서 로직 분리하면 될 듯 ?!
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default GenericFormProvider;
