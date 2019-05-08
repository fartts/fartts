import { el } from '../../../lib/core/dom';

import song from './song';

let x = 0;
let y = 0;
let isDown = false;

const pointer = {
  get x() {
    return x;
  },

  get y() {
    return y;
  },

  get isDown() {
    return isDown;
  },
};

export default pointer;

const canvas = el('canvas') as HTMLCanvasElement;

function onMove(event: MouseEvent | TouchEvent) {
  if (event.type === 'mousemove') {
    x = (event as MouseEvent).clientX;
    y = (event as MouseEvent).clientY;
    return;
  }

  if (event.type === 'touchmove') {
    x = (event as TouchEvent).touches[0].clientX;
    y = (event as TouchEvent).touches[0].clientY;
    return;
  }
}

canvas.addEventListener('mousedown', event => {
  if (!song.canPlayThrough) {
    return;
  }
  song.play();

  x = event.clientX;
  y = event.clientY;

  isDown = true;
  canvas.addEventListener('mousemove', onMove);
});

canvas.addEventListener('mouseup', () => {
  isDown = false;
  canvas.removeEventListener('mousemove', onMove);
});

canvas.addEventListener('touchstart', event => {
  if (!song.canPlayThrough) {
    return;
  }
  song.play();

  x = (event as TouchEvent).touches[0].clientX;
  y = (event as TouchEvent).touches[0].clientY;

  isDown = true;
  canvas.addEventListener('touchmove', onMove);
});

canvas.addEventListener('touchend', () => {
  isDown = false;
  canvas.removeEventListener('touchmove', onMove);
});
