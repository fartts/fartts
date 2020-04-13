import './style.css';

import { el, rAF } from '../../../lib/core/dom';
import { ππ, max } from '../../../lib/core/math';

import { on } from './events';
import { resize } from './resize';

const main = el<HTMLElement>('main');
const canvas = el<HTMLCanvasElement>('canvas');
const context = canvas.getContext('2d');

if (!context) {
  throw new Error("Couldn't get a `CanvasRenderingContext2D`");
}

let shouldResize = true;

on(window, 'resize', () => {
  shouldResize = true;
});

const getCanvasScale = () => {
  const { clientWidth: mw, clientHeight: mh } = main;
  const { width: cw, height: ch } = canvas;

  return max(mw / cw, mh / ch);
};

let canvasScale = getCanvasScale();

const scale = 4;
const frameTime = 1_000 / 60;

let firstTime: number;
let previousTime: number;
let overTime: number;

// append
// select
// update
// remove

type Vector = {
  x: number;
  y: number;
};

type Particle = {
  cpos: Vector;
  ppos: Vector;
};

const particles: Particle[] = [];

const update = (dt: number) => {};

const render = (ctx: CanvasRenderingContext2D) => {
  particles.forEach(({ cpos }) => {
    ctx.beginPath();
    ctx.ellipse(cpos.x, cpos.y, 5, 5, 0, 0, ππ);
  });
};

on(canvas, 'mousemove', ({ clientX, clientY }) => {
  if (!particles[0]) {
    return;
  }

  particles[0].cpos.x = clientX / canvasScale;
  particles[0].cpos.y = clientY / canvasScale;
});

const tick = (time: DOMHighResTimeStamp) => {
  rAF(tick);

  firstTime || (firstTime = time); // tslint:disable-line:no-unused-expression

  if (shouldResize) {
    resize(main, canvas, scale);
    shouldResize = false;

    canvasScale = getCanvasScale();

    firstTime = time;
    previousTime = 0;
    overTime = 0;
  }

  const normalTime = time - firstTime;
  const deltaTime = normalTime - previousTime;
  const { width: w, height: h } = canvas;

  overTime += deltaTime;

  if (normalTime === 0) {
    // first frame, do setup stuff here
    particles.length = 0;
    particles.push({
      cpos: { x: w / 2, y: h / 2 },
      ppos: { x: w / 2, y: h / 2 },
    });
  }

  // every subsequent frame
  while (overTime >= frameTime) {
    update(frameTime);
    overTime -= frameTime;
  }

  context.clearRect(0, 0, w, h);
  context.strokeStyle = 'rgba(0, 0, 0, 0.35)';
  context.lineWidth = 1;
  render(context);
  context.stroke();

  previousTime = normalTime;
};

rAF(tick);
