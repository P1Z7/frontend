import { Api } from "app/_api/api";
import { useParams, usePathname, useRouter } from "next/navigation";
import React from "react";
import { FieldValues, FormProvider, UseFormProps, useForm } from "react-hook-form";
import { useModal } from "@/hooks/useModal";
import { handlePostSubmit, submitEditApplication, submitEditWriter } from "@/utils/submitPost";
import AlertModal from "./modal/AlertModal";

interface GenericFormProps<T extends FieldValues> {
  children: React.ReactNode;
  formOptions?: UseFormProps<T>;
}

const GenericFormProvider = <T extends FieldValues>({ children, formOptions }: GenericFormProps<T>) => {
  const methods = useForm<T>(formOptions);
  const path = usePathname();
  const { editId, eventId } = useParams();
  const router = useRouter();
  const { modal, openModal, closeModal } = useModal();
  const instance = new Api(process.env.NEXT_PUBLIC_ACCESS_TOKEN);

  const onSubmit = async () => {
    console.log(methods.getValues()); // 회원가입 POST할 정보
    const userInputValue = methods.getValues();
    const defaultValue = methods.formState.defaultValues;
    if (path === "/post") {
      const res = await handlePostSubmit(userInputValue, instance);
      router.push(`/event/${res.eventId}`);
    }
    if (path === `/event/${eventId}/edit`) {
      //작성 유저
      const res = await submitEditWriter(methods.getValues(), instance, eventId);
      //신청 유저
      // await submitEditApplication(instance, defaultValue, userInputValue, eventId);
      openModal("endEdit");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
      {modal === "endEdit" && (
        <AlertModal closeModal={closeModal} handleBtnClick={() => router.push(`/event/${eventId}`)}>
          수정사항은 사용자 3인 이상의
          <br /> 승인 후에 반영됩니다.
        </AlertModal>
      )}
    </FormProvider>
  );
};

export default GenericFormProvider;
