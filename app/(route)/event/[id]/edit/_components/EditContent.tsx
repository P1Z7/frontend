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

type PostValueType =
  | "title"
  | "group"
  | "member"
  | "eventType"
  | "address"
  | "detailAddress"
  | "startDate"
  | "endDate"
  | "snsId"
  | "snsType"
  | "eventUrl"
  | "gift"
  | "images"
  | "detailText";

const EditContent = () => {
  const { modal, openModal, closeModal } = useModal();
  const {
    watch,
    formState: { defaultValues },
  } = useFormContext<PostType>();
  const { isCheck } = useStore((state) => ({ isCheck: state.isWarningCheck }));

  const watchedValue = watch();

  const checkUpdated = () => {
    let isUpdated = false;
    if (!defaultValues) {
      return;
    }
    for (const key of Object.keys(defaultValues)) {
      if (postTypeGuard(defaultValues, key)) {
        const prev = defaultValues[key];
        const cur = watchedValue[key];
        switch (key) {
          case "member":
          case "gift":
          case "images":
            if (typeof prev === "string") return false;
            isUpdated = cur.length !== prev?.length || !prev?.every((c, i) => c === cur[i]);
            break;
          default:
            isUpdated = prev !== cur;
        }
        if (isUpdated) {
          return true;
        }
      }
    }
    return false;
  };

  const isValid = checkUpdated() && isCheck;

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

const postTypeGuard = (obj: { [a: string]: any }, key: string): key is PostValueType => {
  return !!obj[key];
};
