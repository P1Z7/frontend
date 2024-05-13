import { instance } from "app/_api/api";
import dynamic from "next/dynamic";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { FieldValues, FormProvider, UseFormProps, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useModal } from "@/hooks/useModal";
import { getSession } from "@/store/session/cookies";
import { handleResetPwSubmit } from "@/utils/handleResetPwSubmit";
import { handleSignupSubmit } from "@/utils/handleSignupSubmit";
import { handlePostSubmit, submitEditApplication, submitEditWriter } from "@/utils/submitPost";
import { EditErrMsgType, PostErrMsgType } from "@/types/errorMsgType";
import { EDIT_ERR_MSG, POST_ERR_MSG } from "@/constants/errorMsg";
import { useStore } from "../_store";

const AlertModal = dynamic(() => import("@/components/modal/AlertModal"), { ssr: false });

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
  const { writerId, setPostLoading } = useStore((state) => ({ writerId: state.writerId, setPostLoading: state.setPostLoading }));

  const savePostInput = () => {
    toast("자동 저장 중..💨", { className: "text-16 font-500" });
    const userInput = methods.getValues();
    localStorage.setItem("post", JSON.stringify(userInput));
  };

  useEffect(() => {
    if (path === "/signup" || path === "/reset-password") return;
    const intervalId = setInterval(savePostInput, 1000 * 30);
    if (path !== "/post") clearInterval(intervalId);
    return () => clearInterval(intervalId);
  }, []);

  const onSubmit = async () => {
    const userInputValue = methods.getValues();
    const defaultValue = methods.formState.defaultValues;
    const session = getSession();

    if (path === "/post") {
      try {
        if (!session) throw Error(" /Unauthorized");
        setPostLoading(true);
        const res = await handlePostSubmit(userInputValue, instance, session.user.userId);
        router.replace(`/event/${res.eventId}`);
      } catch (err: any) {
        localStorage.setItem("post", JSON.stringify(userInputValue));
        toast.error(POST_ERR_MSG[err.message.split("/")[1] as PostErrMsgType], { className: "text-16 font-500 !text-red" });
        if (err.message.split("/")[1] === "Unauthorized") {
          return router.push("/signin");
        }
      } finally {
        localStorage.clear();
        setPostLoading(false);
      }
    }
    if (path === `/event/${eventId}/edit`) {
      try {
        setPostLoading(true);
        if (!session) throw Error(" /Unauthorized");
        if (writerId === session.user.userId) {
          await submitEditWriter(methods.getValues(), instance, session.user.userId, eventId);
          openModal("editWriter");
        } else {
          await submitEditApplication(instance, defaultValue, userInputValue, session.user.userId, eventId);
          openModal("editApprove");
        }
      } catch (err: any) {
        toast.error(EDIT_ERR_MSG[err.message.split("/")[1] as EditErrMsgType], { className: "text-16 font-500 !text-red" });
        if (err.message.split("/")[1] === "Unauthorized") {
          return router.push("/signin");
        }
      } finally {
        setPostLoading(false);
      }
    }
    if (path === "/signup") {
      const res = await handleSignupSubmit(userInputValue, instance);
      if (!res.error) {
        router.refresh();
      }
    }
    if (path === "/reset-password") {
      const res = await handleResetPwSubmit(userInputValue, instance);
      if (!res.error) {
        router.push("/signin");
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="h-full bg-opacity-0">
        {children}
      </form>
      {modal === "editApprove" && (
        <AlertModal closeModal={closeModal} handleBtnClick={() => (router.replace(`/event/${eventId}/approve`), router.refresh())}>
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
