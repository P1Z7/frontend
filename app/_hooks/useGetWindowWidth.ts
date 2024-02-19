"use client";

import { useEffect, useState } from "react";

function useGetWindowWidth() {
  const [isPc, setIsPc] = useState(false);
  const [innerWidth, setInnerWidth] = useState<number>(0);

  useEffect(() => {
    const resizeListener = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeListener);
  }, []);

  useEffect(() => {
    setIsPc(innerWidth > 1200);
  }, [innerWidth]);

  return { innerWidth, isPc };
}

export default useGetWindowWidth;
