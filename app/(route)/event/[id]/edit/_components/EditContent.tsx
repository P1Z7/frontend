import DetailInput from "@/(route)/post/_components/_inputs/DetailInput";
import MainInput from "@/(route)/post/_components/_inputs/MainInput";
import StarInput from "@/(route)/post/_components/_inputs/StarInput";
import SubInput from "@/(route)/post/_components/_inputs/SubInput";
import { PostType } from "@/(route)/post/page";
import { useFormContext } from "react-hook-form";
import EditModal from "@/components/modal/EditModal";
import { useModal } from "@/hooks/useModal";

const EditContent = () => {
  const { modal, openModal, closeModal } = useModal();
  const { setValue, getValues } = useFormContext<PostType>();

  return (
    <>
      <MainInput setValue={setValue} />
      <StarInput getValues={getValues} setValue={setValue} />
      <SubInput getValues={getValues} setValue={setValue} />
      {/* <DetailInput /> */}
      <button onClick={() => openModal("endEdit")}>수정 요청</button>
      {modal === "endEdit" && <EditModal closeModal={closeModal} />}
    </>
  );
};

export default EditContent;
