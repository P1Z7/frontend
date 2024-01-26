interface Props {
  ratio: string;
}

const ProgressBar = ({ ratio }: Props) => {
  const style = "w-" + ratio + " h-4 rounded-full bg-blue-600";
  return (
    <div className="h-4 w-full rounded-full bg-gray-200 dark:bg-gray-700">
      <div className={style} />
    </div>
  );
};

export default ProgressBar;
