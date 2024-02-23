import { useParams } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { instance } from "@/api/api";
import { getSession } from "@/store/session/cookies";
import { openToast } from "@/utils/toast";
import { ModalBaseType } from "@/types/index";
import { TOAST_MESSAGE } from "@/constants/toast";
import TextModal from "./TextModal";

interface Props extends ModalBaseType {
  type: "event" | "review";
  reviewId?: string;
}

const ReportModal = ({ closeModal, type, reviewId }: Props) => {
  const session = getSession();
  const { eventId } = useParams();
  const eventIdStr: string = Array.isArray(eventId) ? eventId[0] : eventId;

  const { control, handleSubmit, setValue } = useForm<FieldValues>({ defaultValues: { description: "" }, mode: "onBlur" });

  const handleClick: SubmitHandler<FieldValues> = async (form) => {
    if (!session) {
      openToast.error(TOAST_MESSAGE.auth.report);
      return;
    }
    try {
      let res;

      if (type === "event") {
        res = await instance.post("/event/claim", { eventId: eventIdStr, userId: session.user.userId, description: form.description });
      } else if (type === "review") {
        res = await instance.post(`/reviews/${reviewId}/claims`, { userId: session.user.userId, description: form.description });
      }

      if (res.error) {
        throw new Error(res.error);
      }
      closeModal();
      setValue("description", "");
      openToast.success(TOAST_MESSAGE.report.success);
    } catch {
      openToast.error(TOAST_MESSAGE.report.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleClick)}>
      <TextModal closeModal={closeModal} title="신고 사유를 알려주세요" btnText="제출하기" textareaId="description" control={control} handleBtnClick={handleSubmit(handleClick)} />
    </form>
  );
};

export default ReportModal;
