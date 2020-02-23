import './style.css';

import { el, on, off, rAF } from '../../../lib/core/dom';
import { shouldResize, resize } from './resize';
import { π, cos, sin, toDegrees, ππ, hypot, max } from '../../../lib/core/math';
import { randomRange, random } from '../../../lib/core/rand';
import { sawWave, sinWave } from '../../../lib/core/wave';

const c = el('canvas') as HTMLCanvasElement;
const m = el('main') as HTMLElement;
const ctx = c.getContext('2d') as CanvasRenderingContext2D;

const totalIterations = 15;
const saturationWave = sawWave(totalIterations + 1, 100, 50);
const luminosityWave = sinWave(totalIterations + 1, 20, 50);

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
  )}%, ${luminosityWave(i)}%, 0.65)`;
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
const treeR = 100;

/* let frameId =  */ rAF(tick);
function tick(/* time */) {
  /* frameId =  */ rAF(tick);

  if (shouldResize()) {
    resize(c, m);

    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, c.width, c.height);
  }

  if (pointerDown && random() < 0.8) {
    const d = randomRange(0, ππ);
    const r = randomRange(0, treeR);
    const x = treeX + cos(d) * r;
    const y = treeY + sin(d) * r;

    if (random() < hypot(x - treeX, y - treeY) / treeR) {
      tree(ctx, x, y, c.width / 4);
    }
  }
}

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

function onPointerMove(event: MouseEvent | TouchEvent) {
  if (event.type === 'mousemove') {
    treeX = (event as MouseEvent).offsetX;
    treeY = (event as MouseEvent).offsetY;
    return;
  }

  if (event.type === 'touchmove') {
    const s = max(m.clientWidth / c.width, m.clientHeight / c.height);

    treeX = (event as TouchEvent).touches[0].clientX / s;
    treeY = (event as TouchEvent).touches[0].clientY / s;
    return;
  }
}

on<MouseEvent>('mousedown', event => {
  treeX = event.offsetX;
  treeY = event.offsetY;

  pointerDown = true;
  on<MouseEvent>('mousemove', onPointerMove);
});

on<MouseEvent>('mouseup', () => {
  pointerDown = false;
  off<MouseEvent>('mousemove', onPointerMove);
});

on<TouchEvent>('touchstart', event => {
  const s = max(m.clientWidth / c.width, m.clientHeight / c.height);

  treeX = (event as TouchEvent).touches[0].clientX / s;
  treeY = (event as TouchEvent).touches[0].clientY / s;

  pointerDown = true;
  on<TouchEvent>('touchmove', onPointerMove);
});

on<TouchEvent>('touchend', () => {
  pointerDown = false;
  off<TouchEvent>('touchmove', onPointerMove);
});
