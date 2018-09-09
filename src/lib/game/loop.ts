import { rAF, cAF } from '@fartts/lib/dom';
import { min } from '@fartts/lib/math';

type UpdateFunction = (t: number, dt: number) => void;
type RenderFunction = (lag: number) => void;

export const stepTime = 1000 / 60;

let frameId = -1;

let firstTime = 0;
let previousTime = 0;

let overTime = 0;

let currentTime = 0;
let deltaTime = 0;

export default function loop(
  update: UpdateFunction,
  render: RenderFunction,
): { start: () => void; stop: () => void } {
  function tick(time: DOMHighResTimeStamp) {
    frameId = rAF(tick);

    currentTime = time - firstTime;
    deltaTime = currentTime - previousTime;

    previousTime = currentTime;
    overTime += deltaTime;

    overTime = min(overTime, 1000);

    while (overTime >= stepTime) {
      update(currentTime, stepTime);
      overTime -= stepTime;
    }

    render(overTime / stepTime);
  }

  return {
    start() {
      if (frameId !== -1) {
        return;
      }

      frameId = rAF((time: DOMHighResTimeStamp) => {
        frameId = rAF(tick);

        render(1);

        firstTime = time;
        previousTime = 0;
        overTime = 0;
      });
    },

    stop() {
      if (frameId === -1) {
        return;
      }

      cAF(frameId);
      frameId = -1;
    },
  };
}
