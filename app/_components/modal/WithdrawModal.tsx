import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Button from "@/components/button";
import Modal from "@/components/modal/ModalMaterial";
import { instance } from "@/api/api";
import { getSession, outSession } from "@/store/session/cookies";

interface Props {
  closeModal: () => void;
}

const WithdrawModal = ({ closeModal }: Props) => {
  const router = useRouter();

  const handleWithdraw = async () => {
    const session = getSession();
    if (!session) {
      return;
    }
    try {
      await instance.delete(`/users/${session.user.userId}`);
      toast("지금까지 Opener와 함께해 주셔서 감사합니다!", {
        className: "text-16 font-600",
      });

      outSession();
      router.refresh();
    } catch {
      toast.error("다시 시도해 주십시오.", {
        className: "text-16 font-600",
      });
    }
  };

  return (
    <Modal.Frame closeModal={closeModal}>
      <Modal.Title>
        <h1>정말 탈퇴하시겠어요?</h1>
        <p className="mt-20 text-gray-500">탈퇴 버튼 선택 시, 계정은 삭제되며 복구되지 않습니다.</p>
      </Modal.Title>
      <div className=" grid grid-cols-2 gap-[10px]">
        <Button type="linedGray" onClick={closeModal}>
          취소
        </Button>
        <Button type="lined" onClick={handleWithdraw}>
          탈퇴하기
        </Button>
      </div>
    </Modal.Frame>
  );
};

export default WithdrawModal;
