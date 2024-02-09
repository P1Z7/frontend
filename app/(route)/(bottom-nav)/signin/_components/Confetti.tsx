import { Options } from "canvas-confetti";
import { useCallback, useEffect, useRef } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";
import { TCanvasConfettiInstance, TOnInitComponentFn } from "react-canvas-confetti/dist/types";

const FeelMyRhythm = () => {
  const refAnimationInstance = useRef<TCanvasConfettiInstance>();
  const getInstance: TOnInitComponentFn = useCallback((instance) => {
    refAnimationInstance.current = instance.confetti;
  }, []);

  const makeShot = (particleRatio: number, opts: Options) => {
    const fireFn = refAnimationInstance.current;
    if (fireFn) {
      fireFn({
        ...opts,
        origin: { y: 0.35 },
        particleCount: Math.floor(200 * particleRatio),
      });
    }
  };

  const fire = () => {
    makeShot(0.3, {
      spread: 80,
      startVelocity: 25,
      colors: ["#EB278C", "#FF50AA80", "#FF50AA1F"],
    });
    // makeShot(0.2, {
    //   spread: 60,
    // });
    // makeShot(0.35, {
    //   spread: 100,
    //   decay: 0.91,
    //   scalar: 0.8,
    // });
    // makeShot(0.1, {
    //   spread: 120,
    //   startVelocity: 25,
    //   decay: 0.92,
    //   scalar: 1.2,
    // });
    // makeShot(0.1, {
    //   spread: 120,
    //   startVelocity: 45,
    // });
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
