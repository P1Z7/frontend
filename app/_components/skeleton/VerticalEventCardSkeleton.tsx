import { Skeleton } from "@mui/material";
import useGetWindowWidth from "@/hooks/useGetWindowWidth";

const VerticalEventCardSkeleton = () => {
  const { isPc } = useGetWindowWidth();

  const skeletons = [];
  for (let i = 0; i < 8; i++) {
    skeletons.push(
      <div key={i} className="flex flex-col gap-12">
        <Skeleton variant="rounded" width={isPc ? 188 : 148} height={isPc ? 244 : 196} />
        <div className="flex flex-col gap-4 pc:gap-8">
          <Skeleton variant="rectangular" width={isPc ? 188 : 148} height={24} />
          <Skeleton variant="rectangular" width={isPc ? 188 : 148} height={isPc ? 20 : 18} />
          <Skeleton variant="rectangular" width={isPc ? 188 : 148} height={24} />
        </div>
      </div>,
    );
  }

  return <div className="flex w-full gap-16 overflow-auto px-20 scrollbar-hide pc:w-[106.4rem] pc:gap-20 pc:overflow-hidden pc:p-0 pc:pl-44">{skeletons}</div>;
};

export default VerticalEventCardSkeleton;
