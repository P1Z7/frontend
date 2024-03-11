import { useRouter } from "next/navigation";
import Button from "@/components/button";
import Modal from "@/components/modal/ModalMaterial";
import { instance } from "@/api/api";
import { getSession } from "@/store/session/cookies";
import { openToast } from "@/utils/toast";
import { TOAST_MESSAGE } from "@/constants/toast";

interface Props {
  closeModal: () => void;
  id: string;
  setDep?: (dep: string) => void;
  type: "event" | "review";
}

const DeleteEventModal = ({ closeModal, id, setDep, type }: Props) => {
  const handleClick = async () => {
    const session = getSession();
    if (!session) {
      return;
    }
    try {
      if (type === "event") {
        await instance.delete(`/event/${id}?userId=${session.user.userId}`);
      }
      if (type === "review") {
        await instance.delete(`/reviews/${id}/users/${session.user.userId}`);
      }

      openToast(TOAST_MESSAGE.delete.success);
      setDep?.(id);
      closeModal();
    } catch {
      openToast.error(TOAST_MESSAGE.delete.error);
    }
  };

  return (
    <Modal.Frame closeModal={closeModal}>
      <Modal.Title>
        <h1>정말 삭제하시겠어요?</h1>
        <p className="mt-20 text-gray-500">삭제 버튼 선택 시, 모든 정보는 삭제되며 복구되지 않습니다.</p>
      </Modal.Title>
      <div className=" grid grid-cols-2 gap-[10px]">
        <Button type="linedGray" onClick={closeModal}>
          취소
        </Button>
        <Button type="lined" onClick={handleClick}>
          삭제하기
        </Button>
      </div>
    </Modal.Frame>
  );
};

export default DeleteEventModal;
