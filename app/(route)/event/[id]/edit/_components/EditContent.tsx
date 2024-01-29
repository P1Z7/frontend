import DetailInput from "@/(route)/post/_components/_inputs/DetailInput";
import MainInput from "@/(route)/post/_components/_inputs/MainInput";
import StarInput from "@/(route)/post/_components/_inputs/StarInput";
import SubInput from "@/(route)/post/_components/_inputs/SubInput";
import { PostType } from "@/(route)/post/page";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import EditModal from "@/components/modal/EditModal";
import { useModal } from "@/hooks/useModal";

const EditContent = () => {
  const { modal, openModal, closeModal } = useModal();
  const { setValue, getValues, control, watch } = useFormContext<PostType>();
  const [imgList, setImgList] = useState<(File | string)[]>([]);
  const [isCheck, setIsCheck] = useState(false);
  const { images } = watch();

  return (
    <div className="text-16">
      <MainInput setValue={setValue} />
      <StarInput getValues={getValues} setValue={setValue} />
      <SubInput getValues={getValues} setValue={setValue} />
      <DetailInput
        images={images}
        control={control}
        isCheck={isCheck}
        setIsCheck={setIsCheck}
        imgList={imgList}
        setImgList={setImgList}
        getValues={getValues}
        setValue={setValue}
      />
      <button onClick={() => openModal("endEdit")}>수정 요청</button>
      {modal === "endEdit" && <EditModal closeModal={closeModal} />}
    </div>
  );
};

export default EditContent;
