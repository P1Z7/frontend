import { Options } from "canvas-confetti";
import { useCallback, useEffect, useRef } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";
import { TCanvasConfettiInstance, TOnInitComponentFn } from "react-canvas-confetti/dist/types";

interface Props {
  location?: { x?: number; y?: number };
  shotList: Options[];
}

const FeelMyRhythm = ({ location, shotList }: Props) => {
  const refAnimationInstance = useRef<TCanvasConfettiInstance>();
  const getInstance: TOnInitComponentFn = useCallback((instance) => {
    refAnimationInstance.current = instance.confetti;
  }, []);

  const fire = () => {
    const fireFn = refAnimationInstance.current;
    if (!fireFn) {
      return;
    }

    for (const shotOption of shotList) {
      fireFn({
        origin: location ?? { x: Math.random(), y: Math.random() },
        zIndex: 9999,
        ...shotOption,
      });
    }
  };

  useEffect(() => fire(), []);

  return (
    <ReactCanvasConfetti
      onInit={getInstance}
      style={{
        pointerEvents: "none",
        width: "100vw",
        height: "100vh",
      }}
    />
  );
};
export default FeelMyRhythm;
