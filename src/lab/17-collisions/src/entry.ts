import './style.css';

import { el, rAF } from '../../../lib/core/dom';

import { on } from './events';
import { resize } from './resize';

const main = el<HTMLElement>('main');
const canvas = el<HTMLCanvasElement>('canvas');
const context = canvas.getContext('2d');

if (!context) {
  throw new Error("Couldn't get a `CanvasRenderingContext2D`");
}

const pixelScale = 12;
let shouldResize = true;

const frameTime = 1_000 / 60;
let firstTime = 0;
let previousTime = 0;
let overTime = 0;

on(window, 'resize', () => {
  shouldResize = true;
});

const tick = (time: DOMHighResTimeStamp) => {
  rAF(tick);

  firstTime || (firstTime = time); // tslint:disable-line:no-unused-expression

  if (shouldResize) {
    resize(main, canvas, pixelScale);
    shouldResize = false;

    firstTime = time;
    previousTime = 0;
    overTime = 0;
  }

  const normalTime = time - firstTime;
  const deltaTime = normalTime - previousTime;
  overTime += deltaTime;

  if (normalTime === 0) {
    // create();
  }

  while (overTime >= frameTime) {
    previousTime += frameTime;
    // update(previousTime, frameTime);
    overTime -= frameTime;
  }

  // render(context);
  previousTime = normalTime;
};

rAF(tick);
