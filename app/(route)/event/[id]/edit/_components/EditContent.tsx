import DetailInput from "@/(route)/post/_components/_inputs/DetailInput";
import MainInput from "@/(route)/post/_components/_inputs/MainInput";
import StarInput from "@/(route)/post/_components/_inputs/StarInput";
import SubInput from "@/(route)/post/_components/_inputs/SubInput";
import { PostType } from "@/(route)/post/page";
import classNames from "classnames";
import { useFormContext } from "react-hook-form";
import EditModal from "@/components/modal/EditModal";
import { useModal } from "@/hooks/useModal";
import { useStore } from "@/store/index";

const EditContent = () => {
  const { modal, openModal, closeModal } = useModal();
  const {
    watch,
    formState: { isDirty, defaultValues },
  } = useFormContext<PostType>();
  const { address, startDate, endDate, eventType, snsType, gift } = watch();
  const { isCheck } = useStore((state) => ({ isCheck: state.isWarningCheck }));

  const checkUpdated = () => {
    if (defaultValues?.address !== address) return true;
    if (defaultValues.startDate !== startDate) return true;
    if (defaultValues.endDate !== endDate) return true;
    if (defaultValues.eventType !== eventType) return true;
    if (defaultValues.snsType !== snsType) return true;
    if (defaultValues?.gift?.length !== gift.length) return true;
    if (gift.filter((item) => !defaultValues?.gift?.includes(item)).length !== 0) return true;
    return false;
  };

  const isValid = (isDirty || checkUpdated()) && isCheck;

  return (
    <div className="text-16">
      <MainInput />
      <StarInput />
      <SubInput />
      <DetailInput />
      <button disabled={!isValid} className={classNames("w-full bg-gray-200 p-16", { "bg-yellow-200": isValid })} onClick={() => openModal("endEdit")}>
        수정 요청
      </button>
      {modal === "endEdit" && <EditModal closeModal={closeModal} />}
    </div>
  );
};

export default EditContent;
