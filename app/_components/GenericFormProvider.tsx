import { instance } from "app/_api/api";
import { useParams, usePathname, useRouter } from "next/navigation";
import React from "react";
import { FieldValues, FormProvider, UseFormProps, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useModal } from "@/hooks/useModal";
import { useSession } from "@/store/session/cookies";
import { handleSignupSubmit } from "@/utils/handleSignupSubmit";
import { handlePostSubmit, submitEditApplication, submitEditWriter } from "@/utils/submitPost";
import { EditErrMsgType, PostErrMsgType } from "@/types/errorMsgType";
import { EDIT_ERR_MSG, POST_ERR_MSG } from "@/constants/errorMsg";
import { useStore } from "../_store";
import AlertModal from "./modal/AlertModal";

interface GenericFormProps<T extends FieldValues> {
  children: React.ReactNode;
  formOptions?: UseFormProps<T>;
}

const GenericFormProvider = <T extends FieldValues>({ children, formOptions }: GenericFormProps<T>) => {
  const { eventId } = useParams();
  const { modal, openModal, closeModal } = useModal();
  const router = useRouter();
  const methods = useForm<T>(formOptions);
  const path = usePathname();
  const { writerId } = useStore((state) => ({ writerId: state.writerId }));

  const onSubmit = async () => {
    const userInputValue = methods.getValues();
    const defaultValue = methods.formState.defaultValues;
    const session = useSession();

    if (path === "/post") {
      try {
        if (!session) throw Error("Unauthorized");
        const res = await handlePostSubmit(userInputValue, instance, session.user.userId);
        router.push(`/event/${res.eventId}`);
      } catch (err: any) {
        toast.error(POST_ERR_MSG[err.message as PostErrMsgType], { className: "text-16 font-500 !text-red" });
        if (err.message === "Unauthorized") {
          return router.push("/signin");
        }
      }
    }
    if (path === `/event/${eventId}/edit`) {
      try {
        if (!session) throw Error("Unauthorized");
        if (writerId === session.user.userId) {
          await submitEditWriter(methods.getValues(), instance, session.user.userId, eventId);
          openModal("editWriter");
        } else {
          await submitEditApplication(instance, defaultValue, userInputValue, session.user.userId, eventId);
          openModal("editApprove");
        }
      } catch (err: any) {
        toast.error(EDIT_ERR_MSG[err.message as EditErrMsgType], { className: "text-16 font-500 !text-red" });
        if (err.message === "Unauthorized") {
          return router.push("/signin");
        }
      }
    }
    if (path === "/signup") {
      const res = await handleSignupSubmit(userInputValue, instance);
      if (!res.error) {
        router.push("/");
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="h-full">
        {children}
      </form>
      {modal === "editApprove" && (
        <AlertModal closeModal={closeModal} handleBtnClick={() => router.replace(`/event/${eventId}/approve`)}>
          수정사항은 사용자 3인 이상의
          <br /> 승인 후에 반영됩니다.
        </AlertModal>
      )}
      {modal === "editWriter" && (
        <AlertModal closeModal={closeModal} handleBtnClick={() => router.replace(`/event/${eventId}`)}>
          수정이 완료되었습니다.
        </AlertModal>
      )}
    </FormProvider>
  );
};

export default GenericFormProvider;
