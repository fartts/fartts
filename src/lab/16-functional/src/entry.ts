import { el, rAF } from '../../../lib/core/dom';

import { attend } from './events';
import { resize } from './resize';

import './style.css';

const main = el<HTMLElement>('main');
const canvas = el<HTMLCanvasElement>('canvas');
const context = canvas.getContext('2d');

if (!context) {
  throw new Error("Couldn't get a `CanvasRenderingContext2D`");
}

let shouldResize = true;

attend(window, 'resize', () => {
  shouldResize = true;
});

const scale = 8;
let firstTime: number;

const tick = (time: DOMHighResTimeStamp) => {
  rAF(tick);

  firstTime || (firstTime = time); // tslint:disable-line:no-unused-expression

  if (shouldResize) {
    resize(main, canvas, scale);
    shouldResize = false;
    firstTime = time;
  }

  const normalTime = time - firstTime;
  const { width: w, height: h } = canvas;

  if (normalTime === 0) {
    // first frame, do setup stuff here
    context.clearRect(0, 0, w, h);
  }

  // every subsequent frame
};
