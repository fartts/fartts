import './style.css';

import { el, on, rAF, cAF } from '../../lib/core/dom';
import { shouldResize, resize } from './resize';
import { π, cos, sin, randomRange, random } from '../../lib/core/math';

const c = el('canvas') as HTMLCanvasElement;
const m = el('main') as HTMLMainElement;
const ctx = c.getContext('2d') as CanvasRenderingContext2D;

const totalIterations = 15;

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

  context.lineWidth = 8 * str;
  context.moveTo(x, y);
  context.lineTo(ax, ay);

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
  ctx.beginPath();
  branch(context, x, y, π * 1.5, s / 5, totalIterations);
  ctx.stroke();
}

let frameId: number;

function tick(/* time */) {
  frameId = rAF(tick);

  if (shouldResize()) {
    resize(c, m);

    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, c.width, c.height);
  }

  ctx.strokeStyle = `hsla(${randomRange(0, 360)}, 80%, 20%, 0.5)`;
  tree(
    ctx,
    randomRange(0, c.width),
    randomRange(c.height / 2, c.height / 2 + c.height),
    c.width / 2,
  );
}

on('click', () => {
  if (frameId === -1) {
    frameId = rAF(tick);
  } else {
    cAF(frameId);
    frameId = -1;
  }
});

frameId = rAF(tick);
