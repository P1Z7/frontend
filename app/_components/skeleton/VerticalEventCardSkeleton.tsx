import { Skeleton } from "@mui/material";

const VerticalEventCardSkeleton = () => {
  const skeletons = [];
  for (let i = 0; i < 8; i++) {
    skeletons.push(
      <div key={i} className="flex flex-col gap-12">
        <div className="pc:hidden">
          <Skeleton variant="rounded" width={148} height={196} />
          <div className="flex flex-col gap-4 pc:gap-8">
            <Skeleton variant="rectangular" width={148} height={24} />
            <Skeleton variant="rectangular" width={148} height={18} />
            <Skeleton variant="rectangular" width={148} height={24} />
          </div>
        </div>
        <div className="hidden pc:block">
          <Skeleton variant="rounded" width={188} height={244} />
          <div className="flex flex-col gap-4 pc:gap-8">
            <Skeleton variant="rectangular" width={188} height={24} />
            <Skeleton variant="rectangular" width={188} height={20} />
            <Skeleton variant="rectangular" width={188} height={24} />
          </div>
        </div>
      </div>,
    );
  }

  return <div className="flex w-full gap-16 overflow-auto px-20 scrollbar-hide pc:w-[106.4rem] pc:gap-20 pc:overflow-hidden pc:p-0 pc:pl-44">{skeletons}</div>;
};

export default VerticalEventCardSkeleton;
