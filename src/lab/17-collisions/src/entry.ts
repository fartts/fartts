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

on(window, 'resize', () => {
  shouldResize = true;
});

const tick = () => {
  rAF(tick);

  if (shouldResize) {
    resize(main, canvas, pixelScale);
    shouldResize = false;
  }
};

rAF(tick);
