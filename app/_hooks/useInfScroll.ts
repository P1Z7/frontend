import { useEffect, useMemo, useRef, useState } from "react";

const useInfScroll = () => {
  // 보여지고 있는지를 나타내는 state
  const [isVisible, setIsVisible] = useState(false);
  const infRef = useRef<HTMLDivElement>(null);

  // new IntersectionObserver()로 생성한 인스턴스가 observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      // entries는 인스턴스의 배열
      // 얼마만큼의 비율을 가졌을 때 실행시킬지
      // 관찰 대상을 지정하고, 관찰될 때 어떤 작동을 할지
      const entry = entries[0];
      // isIntersecting은 교차 되고 있는지를 알려주는 boolean 값
      setIsVisible(entry.isIntersecting);
    });

    if (infRef.current) {
      // 관찰할 대상 등록
      observer.observe(infRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [isVisible, infRef.current]);

  return {
    isVisible,
    setIsVisible,
    infRef,
  };
};

export default useInfScroll;
