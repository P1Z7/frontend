import { Skeleton } from "@mui/material";

const HeroSkeleton = () => {
  return (
    <>
      <div className="block tablet:hidden">
        <Skeleton variant="rounded" width={320} height={160} />
      </div>
      <div className="hidden tablet:block pc:hidden">
        <Skeleton variant="rounded" width={688} height={160} />
      </div>
      <div className="hidden pc:block">
        <Skeleton variant="rounded" width={1040} height={232} />
      </div>
    </>
  );
};

export default HeroSkeleton;
