import { useCallback, useEffect, useState } from "react";

const useShowOnScroll = () => {
  const [position, setPosition] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [position]);

  const handleScroll = useCallback(() => {
    const moving = window.scrollY;
    setVisible(position < 110 || position > moving);
    setPosition(moving);
  }, [position]);

  return visible;
};

export default useShowOnScroll;
