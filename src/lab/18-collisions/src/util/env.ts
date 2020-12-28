import { el } from '../../../../lib/core/dom';

import { on } from '../events';
import { resize } from '../resize';

interface Env {
  main: HTMLElement;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  scale: number;
}

const main = el<HTMLElement>('main');
const canvas = el<HTMLCanvasElement>('canvas');
const context = canvas.getContext('2d');
if (!context) {
  throw new Error("Couldn't get a `CanvasRenderingContext2D`");
}

main.style.width = '800px';
main.style.height = '800px';

const scale = 12;
let shouldResize = true;

export const handleResize = (): void => {
  if (!shouldResize) {
    return;
  }

  resize(main, canvas, scale);
  shouldResize = false;
};

on(window, 'resize', () => {
  shouldResize = true;
});

export const env: Env = {
  main,
  canvas,
  context,
  scale,
};
