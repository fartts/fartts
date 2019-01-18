import { on, off } from '../../lib/core/dom';

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

on<MouseEvent>('mousedown', event => {
  x = event.clientX;
  y = event.clientY;

  isDown = true;
  on<MouseEvent>('mousemove', onMove);
});

on<MouseEvent>('mouseup', () => {
  isDown = false;
  off<MouseEvent>('mousemove', onMove);
});

on<TouchEvent>('touchstart', event => {
  x = (event as TouchEvent).touches[0].clientX;
  y = (event as TouchEvent).touches[0].clientY;

  isDown = true;
  on<TouchEvent>('touchmove', onMove);
});

on<TouchEvent>('touchend', () => {
  isDown = false;
  off<TouchEvent>('touchmove', onMove);
});
