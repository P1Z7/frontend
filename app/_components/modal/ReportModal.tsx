import { useParams } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { instance } from "@/api/api";
import { useSession } from "@/store/session/cookies";
import { ModalBaseType } from "@/types/index";
import TextModal from "./TextModal";

const ReportModal = ({ closeModal }: ModalBaseType) => {
  const session = useSession();
  const { eventId } = useParams();
  const eventIdStr: string = Array.isArray(eventId) ? eventId[0] : eventId;

  const { control, handleSubmit, setValue } = useForm<FieldValues>({ defaultValues: { description: "" }, mode: "onBlur" });

  const handleClick: SubmitHandler<FieldValues> = async (form) => {
    if (!session) {
      toast.error("로그인 후 이용 가능한 기능입니다.", { className: "text-16 font-500" });
      return;
    }
    try {
      const res = await instance.post("/event/claim", { eventId: eventIdStr, userId: session.user.userId, description: form.description });

      if (res.error) {
        throw new Error(res.error);
      }
      closeModal();
      setValue("description", "");
      toast.success("접수가 완료되었습니다👍", { className: "text-16 font-500" });
    } catch {
      toast.error("죄송합니다. 잠시 후 다시 시도해주세요😶", { className: "text-16 font-500" });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleClick)}>
      <TextModal closeModal={closeModal} title="신고 사유를 알려주세요" btnText="제출하기" textareaId="description" control={control} handleBtnClick={handleSubmit(handleClick)} />
    </form>
  );
};

export default ReportModal;
