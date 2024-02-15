const FadingDot = ({ fill }: { fill?: string }) => {
  return (
    <svg className="h-40 w-40" xmlns="http://www.w3.org/2000/svg" fill={fill} viewBox="0 0 24 30">
      <circle r="3" transform="translate(2 15)" className="animate-[pulse_0.8s_infinite]" />
      <circle r="3" transform="translate(12 15)" className="animate-[pulse_0.8s_infinite_200ms]" />
      <circle r="3" transform="translate(22 15)" className="animate-[pulse_0.8s_infinite_400ms]" />
    </svg>
  );
};

export default FadingDot;
