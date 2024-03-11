import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/useModal";
import DeleteEventModal from "../modal/DeleteEventModal";

interface KebabProps {
  eventId: string;
  setDep?: (dep: string) => void;
}

const KebabContents = ({ eventId, setDep }: KebabProps) => {
  const route = useRouter();
  const { openModal, closeModal, modal } = useModal();

  return (
    <ul className="flex h-fit w-full flex-col items-start pb-32 pt-16 text-16 text-gray-900 tablet:absolute tablet:right-60 tablet:top-32 tablet:w-120 tablet:translate-x-1/2 tablet:rounded-sm tablet:bg-white-white tablet:p-0 tablet:text-14 tablet:font-500 tablet:shadow-hero tablet:shadow-gray-200">
      <li className="w-full cursor-pointer border-b border-gray-50 px-24 py-20 hover:font-700  tablet:px-20 tablet:py-16" onClick={() => route.push(`/event/${eventId}/edit`)}>
        수정하기
      </li>
      <li className="w-full cursor-pointer border-b border-gray-50 px-24 py-20 hover:font-700 tablet:border-0 tablet:px-20 tablet:py-16" onClick={() => openModal("delete_event")}>
        삭제하기
      </li>
      {modal === "delete_event" && <DeleteEventModal closeModal={closeModal} eventId={eventId} setDep={setDep} />}
    </ul>
  );
};

export default KebabContents;
