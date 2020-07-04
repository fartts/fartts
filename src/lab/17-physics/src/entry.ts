import { el, min, on, ππ } from './lib/browser-utils';
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

if (shouldResize) {
  resize(main, canvas, 30);
}

const { width: w, height: h } = canvas;
const r = min(w, h) / 4;

context.fillStyle = '#4cbb17';
context.ellipse(w / 2, h / 2, r, r, 0, 0, ππ);
context.fill();
