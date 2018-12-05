import './style.css';

import { el, on, off, rAF } from '../../lib/core/dom';
import { shouldResize, resize } from './resize';
import {
  π,
  cos,
  sin,
  randomRange,
  random,
  toDegrees,
} from '../../lib/core/math';
import { sawWave } from '../../lib/core/wave';

const c = el('canvas') as HTMLCanvasElement;
const m = el('main') as HTMLMainElement;
const ctx = c.getContext('2d') as CanvasRenderingContext2D;

const totalIterations = 15;
const saturationWave = sawWave(totalIterations, 100, 50);

function branch(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  a: number,
  s: number,
  i: number,
) {
  const ax = x + cos(a) * s;
  const ay = y + sin(a) * s;
  const as = s * randomRange(randomRange(0.6, 0.8), 0.95);
  const str = s * 0.01;

  context.beginPath();

  context.strokeStyle = `hsla(${toDegrees(a)}, ${saturationWave(
    i,
  )}%, 20%, 0.5)`;
  context.lineWidth = 8 * str;
  context.moveTo(x, y);
  context.lineTo(ax, ay);

  context.stroke();

  if (i - 1 > 0) {
    if (random() < 0.8) {
      branch(context, ax, ay, a - randomRange(0.2, 0.4), as, i - 1);
    }

    if (random() < 0.8) {
      branch(context, ax, ay, a + randomRange(0.2, 0.4), as, i - 1);
    }
  }
}

function tree(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  s: number,
) {
  branch(context, x, y, π * 1.5, s / 5, totalIterations);
}

let pointerDown = false;
let treeX = c.width * 0.5;
let treeY = c.height * 0.8;

function tick(/* time */) {
  /* frameId =  */ rAF(tick);

  if (shouldResize()) {
    resize(c, m);

    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, c.width, c.height);
  }

  if (pointerDown) {
    tree(ctx, treeX, treeY, c.width / 4);
  }
}

function onPointerMove(event: MouseEvent | TouchEvent) {
  if (event.type === 'mousemove') {
    treeX = (event as MouseEvent).offsetX;
    treeY = (event as MouseEvent).offsetY;
    return;
  }

  if (event.type === 'touchmove') {
    treeX = (event as TouchEvent).touches[0].screenX;
    treeY = (event as TouchEvent).touches[0].screenY;
    return;
  }
}
/* let frameId =  */ rAF(tick);

// on<KeyboardEvent>('keyup', ({ code }) => {
//   if (code !== 'Space') {
//     return;
//   }

//   if (frameId === -1) {
//     frameId = rAF(tick);
//   } else {
//     cAF(frameId);
//     frameId = -1;
//   }
// });

on<MouseEvent>('mousedown', () => {
  pointerDown = true;
  on<MouseEvent>('mousemove', onPointerMove);
});

on<MouseEvent>('mouseup', () => {
  pointerDown = false;
  off<MouseEvent>('mousemove', onPointerMove);
});

on<TouchEvent>('touchdown', () => {
  pointerDown = true;
  on<TouchEvent>('touchmove', onPointerMove);
});

on<TouchEvent>('touchup', () => {
  pointerDown = false;
  off<TouchEvent>('touchmove', onPointerMove);
});
