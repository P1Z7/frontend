import confetti, { Options } from "canvas-confetti";

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

const heart = confetti.shapeFromPath({
  path: "M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z",
});

export const SHOT_WITHDRAW: Options[] = Array<Options>(10).fill({
  particleCount: 15,
  scalar: 3,
  spread: 50,
  startVelocity: 30,
  shapes: [heart],
  colors: ["#EB278C", "#ff008480", "#e11e831f"],
  disableForReducedMotion: true,
});
