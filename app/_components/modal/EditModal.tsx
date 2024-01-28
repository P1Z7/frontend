import ModalFrame from "./ModalFrame";

interface Props {
  closeModal: () => void;
}

const EditModal = ({ closeModal }: Props) => {
  return (
    <ModalFrame closeModal={closeModal}>
      <div>수정 요청은 사용자 3인 이상의 승인 후 반영됩니다.</div>
      <button onClick={closeModal}>확인</button>
    </ModalFrame>
  );
};

export default EditModal;
