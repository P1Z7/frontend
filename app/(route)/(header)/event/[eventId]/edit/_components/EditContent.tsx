import DetailInput from "@/(route)/post/_components/_inputs/DetailInput";
import MainInput from "@/(route)/post/_components/_inputs/MainInput";
import StarInput from "@/(route)/post/_components/_inputs/StarInput";
import SubInput from "@/(route)/post/_components/_inputs/SubInput";
import { PostType } from "@/(route)/post/page";
import { useFormContext } from "react-hook-form";
import BottomButton from "@/components/button/BottomButton";
import { useStore } from "@/store/index";
import { checkArrUpdate } from "@/utils/checkArrUpdate";
import { PostValueType } from "@/types/index";

const EditContent = () => {
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
        if (typeof prev === "undefined" || typeof cur === "undefined") {
          return false;
        }
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
      <BottomButton isDisabled={!isValid}>수정사항 등록</BottomButton>
    </div>
  );
};

export default EditContent;

const postTypeGuard = (obj: { [a: string]: any }, key: string): key is PostValueType => {
  return !!obj[key];
};
