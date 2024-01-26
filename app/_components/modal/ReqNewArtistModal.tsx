import { useForm } from "react-hook-form";
import InputText from "../input/InputText";
import ModalFrame from "./ModalFrame";

interface Props {
  closeModal: () => void;
}

const ReqNewArtistModal = ({ closeModal }: Props) => {
  const { formState, control } = useForm({ defaultValues: { reqArtist: "" } });

  return (
    <ModalFrame closeModal={closeModal}>
      <form onClick={(event) => event.stopPropagation()}>
        <p className="text-14 font-700">아티스트 등록 요청</p>
        <InputText name="reqArtist" control={control} placeholder="허위사실,악의적리뷰,욕설비방">
          아티스트 명
        </InputText>
        <button
          disabled={!formState.isDirty}
          onClick={() => {
            closeModal();
          }}
          className="h-40 w-full "
        >
          등록하기
        </button>
      </form>
    </ModalFrame>
  );
};

export default ReqNewArtistModal;
