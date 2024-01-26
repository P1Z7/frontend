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
  const style = STYLE[ratio] + " h-4 rounded-full bg-blue-600";

  return (
    <div className="h-4 w-full rounded-full bg-gray-200 dark:bg-gray-700">
      <div className={style} />
    </div>
  );
};

export default ProgressBar;
