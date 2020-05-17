import { el } from '../../../../lib/core/dom';

import { on } from '../events';
import { resize } from '../resize';

interface Env {
  main: HTMLElement;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
}

const main = el<HTMLElement>('main');
const canvas = el<HTMLCanvasElement>('canvas');
const context = canvas.getContext('2d');
if (!context) {
  throw new Error("Couldn't get a `CanvasRenderingContext2D`");
}

const pixelScale = 12;
let shouldResize = true;

export const handleResize = () => {
  if (!shouldResize) {
    return;
  }

  resize(main, canvas, pixelScale);
  shouldResize = false;
};

on(window, 'resize', () => {
  shouldResize = true;
});

export const env: Env = {
  main,
  canvas,
  context,
};
