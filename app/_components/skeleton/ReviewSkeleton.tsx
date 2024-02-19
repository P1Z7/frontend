import { Skeleton } from "@mui/material";

const ReviewSkeleton = () => {
  return (
    <div className="flex flex-col gap-16 px-20 py-16">
      <div className="flex gap-8">
        <Skeleton variant="circular" width={32} height={32} />
        <Skeleton variant="rectangular" width={80} height={28} />
      </div>
      <div className="max-w-320">
        <Skeleton variant="rounded" height={40} />
      </div>
      <Skeleton variant="rectangular" height={100} />
    </div>
  );
};

export default ReviewSkeleton;
