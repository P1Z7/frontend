import { FormEvent } from "react";
import { useForm } from "react-hook-form";
import { instance } from "@/api/api";
import { getSession } from "@/store/session/cookies";
import { openToast } from "@/utils/toast";

const EventList = () => {
  const { register, getValues, setValue } = useForm();
  const session = getSession();

  const submitDelete = async (event: FormEvent) => {
    event.preventDefault();
    const id = getValues("eventId");
    try {
      await instance.delete(`/event/${id}`, { userId: session?.user.userId });
      openToast.success("삭제 완료!");
    } catch (error) {
      openToast.error("존재하지 않는 이벤트입니다.");
    } finally {
      setValue("eventId", "");
    }
  };

  return (
    <form className="flex w-full flex-col gap-8" onSubmit={submitDelete}>
      <input {...register("eventId")} className="rounded-sm p-12 text-gray-900" placeholder="이벤트 id 입력" />
      <button type="submit" className="rounded-sm bg-red px-12 py-8">
        삭제
      </button>
    </form>
  );
};

export default EventList;
