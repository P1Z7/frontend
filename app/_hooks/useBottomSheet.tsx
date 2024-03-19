import { useCallback, useEffect, useRef, useState } from "react";

interface BottomSheetMetrics {
  touchStart: {
    sheetY: number;
    touchY: number;
  };
  snap: number;
  isContentAreaTouched: boolean;
}

const useBottomSheet = () => {
  const [bottomSheet, setBottomSheet] = useState("");

  const openBottomSheet = (type: string) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    setBottomSheet(type);
  };

  const closeBottomSheet = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    setBottomSheet("");
  };

  const metrics = useRef<BottomSheetMetrics>({
    touchStart: {
      sheetY: 0,
      touchY: 0,
    },
    snap: 0,
    isContentAreaTouched: false,
  });
  const timer = useRef<NodeJS.Timeout>();

  const sheet = useCallback((node: HTMLElement | null) => {
    if (node !== null) {
      const handleTouchStart = (e: TouchEvent) => {
        const { touchStart } = metrics.current;

        touchStart.sheetY = node.getBoundingClientRect().y;
        touchStart.touchY = e.touches[0].clientY;
        metrics.current.snap = touchStart.sheetY + node.getBoundingClientRect().height / 2;
      };

      const handleTouchMove = (e: TouchEvent) => {
        const { touchStart, isContentAreaTouched } = metrics.current;
        const currentTouch = e.touches[0];

        if (!isContentAreaTouched) {
          e.preventDefault();
          const touchOffset = currentTouch.clientY - touchStart.touchY;
          node.style.setProperty("transform", `translateY(${touchOffset > 0 ? touchOffset : 0}px)`);
        }
      };

      const handleTouchEnd = (e: TouchEvent) => {
        const { touchStart, snap } = metrics.current;
        const currentY = node.getBoundingClientRect().y;

        if (currentY > snap) {
          node.style.setProperty("transform", `translateY(${window.innerHeight - touchStart.sheetY}px)`);
          timer.current = setInterval(closeBottomSheet, 100);
        }
        if (currentY < snap) {
          node.style.setProperty("transform", "translateY(0px)");
        }

        metrics.current.isContentAreaTouched = false;
      };

      node.addEventListener("touchstart", handleTouchStart);
      node.addEventListener("touchmove", handleTouchMove);
      node.addEventListener("touchend", handleTouchEnd);
    }
  }, []);

  const content = useCallback((node: HTMLElement | null) => {
    if (node !== null) {
      const handleTouchStart = () => {
        metrics.current.isContentAreaTouched = true;
      };

      node.addEventListener("touchstart", handleTouchStart);
    }
  }, []);

  const refs = { sheet, content };

  useEffect(() => {
    if (!bottomSheet) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [bottomSheet]);

  return { bottomSheet, openBottomSheet, closeBottomSheet, refs };
};

export default useBottomSheet;
