import { Skeleton } from "@mui/material";

const HorizontalEventCardSkeleton = () => {
  return (
    <>
      <div className="flex gap-12 py-12 pc:hidden">
        <Skeleton variant="rounded" width={84} height={112} />
        <div className="flex flex-col justify-between gap-4 py-8">
          <Skeleton variant="rectangular" width={150} height={20} />
          <Skeleton variant="rectangular" width={100} height={20} />
          <Skeleton variant="rectangular" width={230} height={40} />
        </div>
      </div>
      <div className="hidden w-full justify-between gap-24 pc:flex">
        <div className="flex grow gap-12 py-12">
          <Skeleton variant="rounded" width={116} height={152} />
          <div className="flex flex-col justify-between gap-4 py-16">
            <div className="flex flex-col gap-8">
              <Skeleton variant="rectangular" width={150} height={20} />
              <Skeleton variant="rectangular" width={100} height={20} />
            </div>
            <Skeleton variant="rectangular" width={230} height={44} />
          </div>
        </div>
        <div className="flex grow gap-12 py-12">
          <Skeleton variant="rounded" width={116} height={152} />
          <div className="flex flex-col justify-between gap-4 py-16">
            <div className="flex flex-col gap-8">
              <Skeleton variant="rectangular" width={150} height={20} />
              <Skeleton variant="rectangular" width={100} height={20} />
            </div>
            <Skeleton variant="rectangular" width={230} height={44} />
          </div>
        </div>
      </div>
    </>
  );
};

export default HorizontalEventCardSkeleton;

const Card = () => {
  return (
    <div className="flex gap-12 py-12 pc:max-w-[50.8rem]">
      <Skeleton variant="rounded" width={84} height={112} />
      <div className="flex flex-col justify-between gap-4 py-8">
        <Skeleton variant="rectangular" width={150} height={20} />
        <Skeleton variant="rectangular" width={100} height={20} />
        <Skeleton variant="rectangular" width={230} height={40} />
      </div>
    </div>
  );
};
