import { useCallback, useRef } from "react";

interface BottomSheetMetrics {
  touchStart: number;
  position: number;
  isContentAreaTouched: boolean;
}

const SNAP = {
  top: 260,
  bottom: 650,
};

const useArtistSheet = () => {
  const metrics = useRef<BottomSheetMetrics>({
    touchStart: 0,
    position: 0,
    isContentAreaTouched: false,
  });

  const sheet = useCallback((node: HTMLElement | null) => {
    if (node !== null) {
      const handleTouchStart = (e: TouchEvent) => {
        metrics.current.touchStart = e.touches[0].clientY;
      };

      const handleTouchMove = (e: TouchEvent) => {
        const { touchStart, isContentAreaTouched, position } = metrics.current;
        const currentTouch = e.touches[0];

        if (!isContentAreaTouched) {
          e.preventDefault();
          const touchOffset = currentTouch.clientY - touchStart + position;
          node.style.setProperty("transform", `translateY(${touchOffset}px)`);
        }
      };

      const handleTouchEnd = (e: TouchEvent) => {
        const currentY = node.getBoundingClientRect().y;

        if (currentY > SNAP.bottom) {
          node.style.setProperty("transform", `translateY(220px)`);
          metrics.current.position = 220;
        } else if (currentY < SNAP.bottom && currentY > SNAP.top) {
          node.style.setProperty("transform", "translateY(0px)");
          metrics.current.position = 0;
        } else if (currentY < SNAP.top) {
          node.style.setProperty("transform", `translateY(-320px)`);
          metrics.current.position = -320;
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

  return { sheet, content };
};

export default useArtistSheet;
