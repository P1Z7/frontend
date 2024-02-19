interface Props {
  onClick?: () => void;
}

const InitButton = ({ onClick }: Props) => {
  return (
    <button type="button" onClick={onClick} className="absolute right-0 text-12 font-600 text-blue">
      초기화
    </button>
  );
};

export default InitButton;
