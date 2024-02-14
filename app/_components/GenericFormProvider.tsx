import { Api } from "app/_api/api";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { FieldValues, FormProvider, UseFormProps, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { handleSignupSubmit } from "@/utils/handleSignupSubmit";
import { handlePostSubmit } from "@/utils/submitPost";

interface GenericFormProps<T extends FieldValues> {
  children: React.ReactNode;
  formOptions?: UseFormProps<T>;
}

const GenericFormProvider = <T extends FieldValues>({ children, formOptions }: GenericFormProps<T>) => {
  const router = useRouter();
  const methods = useForm<T>(formOptions);
  const path = usePathname();
  const instance = new Api(process.env.NEXT_PUBLIC_ACCESS_TOKEN);

  const onSubmit = async () => {
    if (path === "/post") {
      const res = await handlePostSubmit(methods.getValues(), instance);
      router.push(`/event/${res.eventId}`);
    }
    if (path === "/signup") {
      const res = await handleSignupSubmit(methods.getValues(), instance);
      if (!res.error) {
        router.push("/");
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default GenericFormProvider;
