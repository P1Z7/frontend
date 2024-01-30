const Chip = ({ chipName }: { chipName: string }) => {
  // bg 색도 받아와야함..!?
  return <div className="gap-10 flex items-center rounded-[4px] bg-[#C3C3C3] px-4 py-0">{chipName}</div>;
};

export default Chip;
