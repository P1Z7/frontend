import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "../button";
import InputText from "../input/InputText";
import Modal from "./ModalMaterial";

interface Props {
  closeModal: () => void;
}

const ReqNewArtistModal = ({ closeModal }: Props) => {
  const { formState, control } = useForm({ defaultValues: { reqArtist: "" } });

  const notify = () =>
    toast.success("등록 요청이 제출되었습니다.", {
      position: "bottom-center",
      style: {
        padding: "16px 28px",
        fontFamily: "Pretendard",
        fontWeight: "600",
        fontSize: "16px",
      },
    });

  const handleClick = () => {
    closeModal();
    notify();
  };

  return (
    <Modal.Frame closeModal={closeModal}>
      <div onClick={(event) => event.stopPropagation()}>
        <p className="pb-12 text-16 font-500">아티스트 등록 요청</p>
        <InputText name="reqArtist" control={control} placeholder="찾으시는 아티스트를 알려주세요." />
        <div className="px-28 pt-20">
          <Button type="lined" isDisabled={!formState.isDirty} onClick={handleClick}>
            등록하기
          </Button>
        </div>
      </div>
    </Modal.Frame>
  );
};

export default ReqNewArtistModal;
