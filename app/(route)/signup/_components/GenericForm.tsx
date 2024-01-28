import React from "react";
import { FieldValues, FormProvider, UseFormProps, useForm } from "react-hook-form";

interface GenericFormProps<T extends FieldValues> {
  children: React.ReactNode;
  formOptions?: UseFormProps<T>;
}

const GenericForm = <T extends FieldValues>({ children, formOptions }: GenericFormProps<T>) => {
  const methods = useForm<T>(formOptions);

  const onSubmit = () => {
    console.log(methods.getValues()); // 회원가입 POST할 정보
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default GenericForm;
