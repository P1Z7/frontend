import { useEffect, useRef } from "react";

interface Props {
  handleScroll: () => void;
  deps: unknown[] | undefined;
  skip?: boolean;
  options?: {
    root: null | Element;
    rootMargin?: string;
    threshold: number;
  };
}

const useInfiniteScroll = ({
  handleScroll,
  deps,
  skip = false,
  options = {
    root: null,
    threshold: 0.8,
  },
}: Props) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (skip) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          handleScroll();
        }
      });
    }, options);

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, deps);

  return containerRef;
};

export default useInfiniteScroll;
