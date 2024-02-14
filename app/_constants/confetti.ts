import { Options } from "canvas-confetti";

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

export const SHOT_KAKAO: Options[] = Array(10).fill({ particleCount: 30, startVelocity: 30, spread: 150, gravity: 0.5, colors: ["#FEE500", "#191919"] });
