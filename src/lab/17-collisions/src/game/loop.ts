import { el, rAF, cAF } from '../../../../lib/core/dom';

import { on } from '../events';
import { resize } from '../resize';

interface PlaybackState {
  isPlaying: () => boolean;
  start: () => void;
  stop: () => void;
}

const main = el<HTMLElement>('main');
const canvas = el<HTMLCanvasElement>('canvas');
const context = canvas.getContext('2d');

if (!context) {
  throw new Error("Couldn't get a `CanvasRenderingContext2D`");
}

const pixelScale = 12;
let shouldResize = true;

on(window, 'resize', () => {
  shouldResize = true;
});

if (shouldResize) {
  resize(main, canvas, pixelScale);
  shouldResize = false;
}

export const loop: (
  create: () => void,
  update: (t: number, dt: number) => void,
  render: (ctx: CanvasRenderingContext2D) => void,
) => PlaybackState = (create, update, render) => {
  const frameTime = 1_000 / 60;

  let firstTime = 0;
  let previousTime = 0;
  let overTime = 0;

  let frameId = 0;

  const tick = (time: DOMHighResTimeStamp) => {
    frameId = rAF(tick);

    if (shouldResize) {
      resize(main, canvas, pixelScale);
      shouldResize = false;
    }

    const normalTime = time - firstTime;
    const deltaTime = normalTime - previousTime;
    overTime += deltaTime;

    while (overTime >= frameTime) {
      previousTime += frameTime;
      update(previousTime, frameTime);
      overTime -= frameTime;
    }

    render(context);
    previousTime = normalTime;
  };

  const start: () => void = () => {
    firstTime = performance.now();
    frameId = rAF(tick);
    create();
  };

  const stop: () => void = () => {
    firstTime = 0;
    previousTime = 0;
    overTime = 0;

    cAF(frameId);
    frameId = 0;
  };

  return {
    isPlaying: () => frameId !== 0,
    start,
    stop,
  };
};
