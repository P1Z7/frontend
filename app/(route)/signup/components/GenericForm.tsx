import { useRouter } from "next/navigation";
import React from "react";
import { FieldValues, FormProvider, UseFormProps, useForm } from "react-hook-form";

interface GenericFormInterface<TFormData extends FieldValues> {
  children: React.ReactNode;
  formOptions?: UseFormProps<TFormData>;
}

const GenericForm = <TFormData extends FieldValues>({ children, formOptions }: GenericFormInterface<TFormData>) => {
  const methods = useForm<TFormData>(formOptions);
  const router = useRouter();

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
