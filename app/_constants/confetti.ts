import confetti, { Options } from "canvas-confetti";
import { RefObject } from "react";

export const SHOT_SIGNIN: Options[] = [
  {
    particleCount: 60,
    spread: 100,
    scalar: 1.3,
    colors: ["#EB278C", "#ff008480", "#e11e831f"],
  },
  {
    particleCount: 40,
    spread: 60,
  },
  {
    particleCount: 60,
    spread: 100,
    decay: 0.9,
    scalar: 0.8,
  },
];

const heart =
  typeof window !== "undefined"
    ? confetti.shapeFromPath({
        path: "M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z",
      })
    : "circle";

export const confettiHeart = (ref: RefObject<HTMLElement>, selected: boolean, pathname: string = "") => {
  const rect = ref.current?.getBoundingClientRect();
  const { innerWidth, innerHeight } = window;

  if (rect && selected === true) {
    confetti({
      particleCount: 1,
      scalar: pathname.includes("event") && innerWidth < 1200 ? 2.5 : 3,
      spread: 50,
      startVelocity: 10,
      shapes: [heart],
      colors: ["#EB278C", "#ff008480", "#e11e831f"],
      origin: { x: (rect.left + rect.right) / 2 / innerWidth, y: (rect.top + rect.bottom) / 2 / innerHeight },
    });
  }
};
