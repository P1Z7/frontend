const STYLE = {
  "1/4": "w-1/4",
  "1/2": "w-1/2",
  "3/4": "w-3/4",
  full: "w-full",
};

interface Props {
  ratio: "1/4" | "1/2" | "3/4" | "full";
}

const ProgressBar = ({ ratio }: Props) => {
  const style = STYLE[ratio] + " h-4 rounded-full bg-main-pink-500";

  return (
    <div className="h-4 w-full rounded-full bg-main-pink-50">
      <div className={style} />
    </div>
  );
};

export default ProgressBar;
