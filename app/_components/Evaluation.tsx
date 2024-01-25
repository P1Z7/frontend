import classNames from "classnames";

interface Props {
  rate: boolean;
}

const Evaluation = ({ rate }: Props) => {
  return <div className={`h-32 w-full ${rate ? "bg-blue-400" : "bg-gray-600"}`}>{rate ? "최고의 행사, 추천합니다!" : "아쉬웠어요. :("}</div>;
};

export default Evaluation;
