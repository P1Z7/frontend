import DetailInput from "@/(route)/post/_components/_inputs/DetailInput";
import MainInput from "@/(route)/post/_components/_inputs/MainInput";
import StarInput from "@/(route)/post/_components/_inputs/StarInput";
import SubInput from "@/(route)/post/_components/_inputs/SubInput";
import { PostType } from "@/(route)/post/page";
import classNames from "classnames";
import { useFormContext } from "react-hook-form";
import Alert from "@/components/Alert";
import BottomButton from "@/components/button/BottomButton";
import AlertModal from "@/components/modal/AlertModal";
import TextModal from "@/components/modal/TextModal";
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
    control,
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
      <div className="pb-84" />
      <BottomButton isDisabled={!isValid} onClick={() => openModal("endEdit")}>
        수정사항 등록
      </BottomButton>
      {modal === "endEdit" && (
        <AlertModal closeModal={closeModal}>
          수정사항은 사용자 3인 이상의
          <br /> 승인 후에 반영됩니다.
        </AlertModal>
      )}
    </div>
  );
};

export default EditContent;

const postTypeGuard = (obj: { [a: string]: any }, key: string): key is PostValueType => {
  return !!obj[key];
};
