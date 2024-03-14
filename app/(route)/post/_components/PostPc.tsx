import classNames from "classnames";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import Button from "@/components/button";
import { useStore } from "@/store/index";
import FunnelTitle from "./FunnelTitle";
import DetailInput from "./_inputs/DetailInput";
import MainInput from "./_inputs/MainInput";
import StarInput from "./_inputs/StarInput";
import SubInput from "./_inputs/SubInput";

const PostPc = () => {
  const { watch } = useFormContext();
  const { isCheck } = useStore((state) => ({ isCheck: state.isWarningCheck }));
  const { address, artists, groupId, eventType, placeName, startDate, endDate } = watch();
  const isDisabled = !(artists.length > 0 && address && artists && groupId && eventType && placeName && startDate && endDate) || !isCheck;

  return (
    <div className="flex max-w-[68.8rem] flex-col gap-32 pb-120">
      <p className="text-14 font-600 text-gray-500">행사 등록하기</p>
      <div className="flex flex-col gap-56">
        <TitleLayout>
          <FunnelTitle step="행사 대상" isRequired />
          <StarInput />
        </TitleLayout>
        <TitleLayout>
          <FunnelTitle step="행사 정보" isRequired />
          <MainInput />
        </TitleLayout>
        <TitleLayout>
          <FunnelTitle step="특전 정보" />
          <SubInput />
        </TitleLayout>
        <TitleLayout isLast>
          <FunnelTitle step="상세 설명" />
          <DetailInput />
        </TitleLayout>
        <Button size="xl" isSubmit isDisabled={isDisabled}>
          작성완료
        </Button>
      </div>
    </div>
  );
};

export default PostPc;

interface Props {
  children: ReactNode;
  isLast?: boolean;
}

const TitleLayout = ({ children, isLast = false }: Props) => {
  return <section className={classNames("flex flex-col gap-24 border-b border-gray-50 pb-32", { "!border-none !pb-0": isLast })}>{children}</section>;
};
