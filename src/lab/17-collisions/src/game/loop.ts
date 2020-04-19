import { rAF, cAF } from '../../../../lib/core/dom';

import { env, handleResize } from './env';

interface PlaybackState {
  isPlaying: () => boolean;
  start: () => void;
  stop: () => void;
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
    handleResize();

    const normalTime = time - firstTime;
    const deltaTime = normalTime - previousTime;
    overTime += deltaTime;

    while (overTime >= frameTime) {
      previousTime += frameTime;
      update(previousTime, frameTime);
      overTime -= frameTime;
    }

    render(env.context);
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
