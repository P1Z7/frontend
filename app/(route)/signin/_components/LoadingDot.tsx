const LoadingDot = () => {
  return (
    <svg width={25} viewBox="0 0 20 20">
      <circle className="animate-[bounce_1s_infinite]" color="#ffffff" cx="2.2" cy="12" r="1.6" />
      <circle className="animate-[bounce_1s_infinite_100ms]" color="#ffffff" cx="9.5" cy="12" r="1.6" />
      <circle className="animate-[bounce_1s_infinite_200ms]" color="#ffffff" cx="16.8" cy="12" r="1.6" />
    </svg>
  );
};

export default LoadingDot;
