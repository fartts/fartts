import { atan2, min, toDegrees, ππ } from '../../../lib/core/math';
import { cosWave, sinWave } from '../../../lib/core/wave';

import { el, on, raf } from './lib/browser-utils';
import { resize } from './lib/resize';

import './style.css';

const main = el<HTMLElement>('main');
const canvas = el<HTMLCanvasElement>('canvas');
const context = canvas.getContext('2d', {
  alpha: false,
  desynchronized: true,
});

if (!context) {
  throw new Error("Couldn't get a `CanvasRenderingContext2D`");
}

let shouldResize = true;
on(window, 'resize', () => {
  shouldResize = true;
});

const frameTime = 1_000 / 60;
let frameId = 0;

let startTime = 0;
let time = 0;
let prevTime = 0;
let deltaTime = 0;
let overTime = 0;

const p = 15_000;
const xWave = cosWave(p, -3, 3);
const yWave = sinWave(p, -3, 3);

let px = xWave(0);
let py = yWave(0);

const update = (t: number, _dt: number) => {
  px = xWave(t);
  py = yWave(t);
};

const render = (_lag: number) => {
  const { width: w, height: h } = canvas;
  const hw = w / 2;
  const hh = h / 2;
  const r = min(w, h) / 4;

  context.fillStyle = `hsla(${toDegrees(atan2(py, px))}, 80%, 50%, 0.65)`;
  context.ellipse(hw + px, hh + py, r, r, 0, 0, ππ);
  context.fill();
};

const tick = (realTime: DOMHighResTimeStamp) => {
  frameId = raf(tick);

  startTime || (startTime = realTime); // tslint:disable-line:no-unused-expression
  time = realTime - startTime;
  deltaTime = time - prevTime;
  overTime += deltaTime;

  if (shouldResize) {
    resize(main, canvas, 30);
  }

  while (overTime >= frameTime) {
    update(time, frameTime);
    overTime -= frameTime;
  }

  render(overTime / frameTime);

  prevTime = time;
};

frameId = raf(tick);
