import React from "react";
import { FieldValues, FormProvider, SubmitHandler, UseFormProps, useForm } from "react-hook-form";

interface GenericFormInterface<TFormData extends FieldValues> {
  children: React.ReactNode;
  onSubmit: SubmitHandler<TFormData>;
  formOptions?: UseFormProps<TFormData>;
}

const GenericForm = <TFormData extends FieldValues>({ children, onSubmit, formOptions }: GenericFormInterface<TFormData>) => {
  const methods = useForm<TFormData>(formOptions);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default GenericForm;
