import { requestAnimationFrame, cancelAnimationFrame } from '@fartts/lib/dom';
import { min } from '@fartts/lib/math';

type UpdateFunction = (t: number, dt: number) => void;
type RenderFunction = (lag: number) => void;

export default function loop(update: UpdateFunction, render: RenderFunction) {
  let frameId = -1;

  let firstTime = 0;
  let previousTime = 0;

  let currentTime = 0;
  let deltaTime = 0;

  const step = 1000 / 60;
  let excess = 0;

  function tick(time: DOMHighResTimeStamp) {
    frameId = requestAnimationFrame(tick);

    currentTime = time - firstTime;
    deltaTime = currentTime - previousTime;

    previousTime = currentTime;
    excess += deltaTime;

    excess = min(excess, 1000);
    while (excess >= step) {
      update(currentTime, step);
      excess -= step;
    }

    render(excess / step);
    stop();
  }

  function stop() {
    cancelAnimationFrame(frameId);
    frameId = -1;
  }

  frameId = requestAnimationFrame((time: DOMHighResTimeStamp) => {
    firstTime = time;
    previousTime = 0;
    excess = 0;

    frameId = requestAnimationFrame(tick);
  });
}
