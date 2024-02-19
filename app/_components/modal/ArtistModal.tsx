import { ModalBaseType } from "@/types/index";
import ArtistContent from "../bottom-sheet/content/ArtistContent";
import Modal from "./ModalMaterial";

interface ArtistModalProps extends ModalBaseType {
  isFirst?: boolean;
}

const ArtistModal = ({ closeModal, isFirst = false }: ArtistModalProps) => {
  return (
    <Modal.Frame closeModal={closeModal} type="pc">
      <h1 className="absolute top-32 flex h-24 items-center text-start text-14 font-500 text-gray-900">아티스트 선택</h1>
      <ArtistContent isFirst={isFirst} />
      <Modal.Button handleYesClick={closeModal}>선택 완료</Modal.Button>
    </Modal.Frame>
  );
};

export default ArtistModal;
