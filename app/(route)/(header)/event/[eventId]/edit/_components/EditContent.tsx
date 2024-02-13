import DetailInput from "@/(route)/post/_components/_inputs/DetailInput";
import MainInput from "@/(route)/post/_components/_inputs/MainInput";
import StarInput from "@/(route)/post/_components/_inputs/StarInput";
import SubInput from "@/(route)/post/_components/_inputs/SubInput";
import { PostType } from "@/(route)/post/page";
import { useParams, useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";
import BottomButton from "@/components/button/BottomButton";
import AlertModal from "@/components/modal/AlertModal";
import { useModal } from "@/hooks/useModal";
import { useStore } from "@/store/index";
import { checkArrUpdate } from "@/utils/checkArrUpdate";

type PostValueType =
  | "placeName"
  | "eventType"
  | "groupId"
  | "artists"
  | "groupName"
  | "artistNames"
  | "startDate"
  | "endDate"
  | "address"
  | "addressDetail"
  | "userId"
  | "eventImages"
  | "description"
  | "eventUrl"
  | "organizerSns"
  | "snsType"
  | "tags";

const EditContent = () => {
  const { modal, openModal, closeModal } = useModal();
  const {
    watch,
    formState: { defaultValues },
  } = useFormContext<PostType>();
  const { isCheck } = useStore((state) => ({ isCheck: state.isWarningCheck }));
  const { id } = useParams();
  const router = useRouter();
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
        if (typeof prev === "undefined" || typeof cur === "undefined") return false;
        switch (key) {
          case "artists":
          case "artistNames":
          case "tags":
          case "eventImages":
            if (typeof prev === "string" || typeof cur === "string") return false;
            isUpdated = checkArrUpdate(prev, cur);
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
    <div className="flex flex-col gap-20 pb-120">
      <StarInput />
      <MainInput />
      <SubInput />
      <DetailInput />
      <BottomButton isDisabled={!isValid} onClick={() => openModal("endEdit")}>
        수정사항 등록
      </BottomButton>
      {modal === "endEdit" && (
        <AlertModal closeModal={closeModal} handleBtnClick={() => router.push(`/event/${id}`)}>
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
